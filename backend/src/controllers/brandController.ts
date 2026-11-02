import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Brand } from "../models/Brand.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/* A brand is a name and a logo. The image itself is uploaded through your existing
   POST /api/admin/upload endpoint; this controller stores the URL it returns. */

const MAX_NAME_LENGTH = 100;
const MAX_LOGO_LENGTH = 500;

// Reject URL schemes that could run code if the value is ever rendered as a link.
const UNSAFE_URL = /^\s*(javascript|data|vbscript):/i;

type BrandData = { name: string; logo: string };
type ParseResult = { data: BrandData } | { error: string };

const toText = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

const sendError = (res: Response, status: number, message: string): void => {
  res.status(status).json({ error: message });
};

const sendNotFound = (res: Response): void => sendError(res, 404, "Brand not found.");

// Express can type a route param as string | string[], so always read it through this.
const idOf = (req: Request): string => String(req.params.id);

function parseBrandBody(body: unknown): ParseResult {
  const input = (body ?? {}) as Record<string, unknown>;
  const name = toText(input.name);
  const logo = toText(input.logo);

  if (!name) return { error: "Enter the brand name." };
  if (name.length > MAX_NAME_LENGTH) {
    return { error: `The brand name is too long (${MAX_NAME_LENGTH} characters max).` };
  }
  if (!logo) return { error: "Upload a logo image." };
  if (logo.length > MAX_LOGO_LENGTH || UNSAFE_URL.test(logo)) {
    return { error: "That logo link is not valid." };
  }
  return { data: { name, logo } };
}

/** GET /api/brands (public: the website uses this too). Oldest first, so the admin shows the same order as the site. */
export const getBrands = asyncHandler(async (_req: Request, res: Response) => {
  res.json(await Brand.find().sort({ createdAt: 1 }));
});

/** POST /api/admin/brands   body: { name, logo } */
export const createBrand = asyncHandler(async (req: Request, res: Response) => {
  const result = parseBrandBody(req.body);
  if ("error" in result) return sendError(res, 400, result.error);

  res.status(201).json(await Brand.create(result.data));
});

/** PUT /api/admin/brands/:id   body: { name, logo } */
export const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  const id = idOf(req);
  if (!isValidObjectId(id)) return sendNotFound(res);

  const result = parseBrandBody(req.body);
  if ("error" in result) return sendError(res, 400, result.error);

  const brand = await Brand.findByIdAndUpdate(id, result.data, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!brand) return sendNotFound(res);
  res.json(brand);
});

/** DELETE /api/admin/brands/:id */
export const deleteBrand = asyncHandler(async (req: Request, res: Response) => {
  const id = idOf(req);
  if (!isValidObjectId(id)) return sendNotFound(res);

  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) return sendNotFound(res);
  res.json({ ok: true });
});