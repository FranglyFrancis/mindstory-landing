import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Blog } from "../models/Blog.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const MAX_PUBLIC_LIMIT = 50;
const REQUIRED_FIELDS = ["title", "description", "image", "url"] as const;

type BlogData = {
  title: string;
  description: string;
  image: string;
  url: string;
  featured: boolean;
  order: number;
};

type ParseResult = { data: BlogData } | { error: string };

const toText = (value: unknown): string => String(value ?? "").trim();

// A link or image must be a full web address or a site path like "/blog/my-post".
// Anything else (javascript:, data:, ...) is refused, because the link ends up in an <a href>.
const isLink = (value: string): boolean =>
  /^https?:\/\/\S+$/i.test(value) || /^\/(?!\/)\S*$/.test(value);

const sendError = (res: Response, status: number, message: string): void => {
  res.status(status).json({ error: message });
};

const sendNotFound = (res: Response): void => sendError(res, 404, "Blog not found");

function parseBlogBody(body: unknown): ParseResult {
  const input = (body ?? {}) as Record<string, unknown>;

  const data: BlogData = {
    title: toText(input.title),
    description: toText(input.description),
    image: toText(input.image),
    url: toText(input.url),
    featured: input.featured !== false, // featured unless explicitly switched off
    order: Math.trunc(Number(input.order)) || 0,
  };

  const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
  if (missing.length > 0) {
    return { error: `Missing required fields: ${missing.join(", ")}` };
  }
  if (!isLink(data.url)) {
    return { error: "Link must be a full web address (https://...) or a site path starting with /" };
  }
  if (!isLink(data.image)) {
    return { error: "Image must be an uploaded image or a full web address" };
  }
  return { data };
}

/* ---------- public (website): GET /api/blogs?featured=true&limit=3 ---------- */
export const listPublic = asyncHandler(async (req: Request, res: Response) => {
  const filter = req.query.featured === "true" ? { featured: true } : {};

  const requestedLimit = parseInt(String(req.query.limit), 10) || 0;
  const limit = Math.min(Math.max(requestedLimit, 0), MAX_PUBLIC_LIMIT);

  const query = Blog.find(filter)
    .sort({ order: 1, createdAt: -1 })
    .select("title description image url");

  res.json(await (limit ? query.limit(limit) : query));
});

/* ---------- admin (behind requireAuth) ---------- */
export const listAdmin = asyncHandler(async (_req: Request, res: Response) => {
  res.json(await Blog.find().sort({ order: 1, createdAt: -1 }));
});

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const result = parseBlogBody(req.body);
  if ("error" in result) return sendError(res, 400, result.error);

  res.status(201).json(await Blog.create(result.data));
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return sendNotFound(res);

  const result = parseBlogBody(req.body);
  if ("error" in result) return sendError(res, 400, result.error);

  const blog = await Blog.findByIdAndUpdate(id, result.data, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!blog) return sendNotFound(res);
  res.json(blog);
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return sendNotFound(res);

  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) return sendNotFound(res);
  res.json({ ok: true });
});