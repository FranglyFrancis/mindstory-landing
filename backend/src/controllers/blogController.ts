import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Blog } from "../models/Blog.js";

const str = (v: unknown) => String(v ?? "").trim();

// A link or image must be a full web address or a site path like "/blog/my-post".
// Anything else (javascript:, data:, ...) is refused, because the link ends up in an <a href>.
const isLink = (v: string) => /^https?:\/\/\S+$/i.test(v) || /^\/(?!\/)\S*$/.test(v);

type Data = { title: string; description: string; image: string; url: string; featured: boolean; order: number };

function parse(body: any): { data: Data } | { error: string } {
  const data: Data = {
    title: str(body?.title),
    description: str(body?.description),
    image: str(body?.image),
    url: str(body?.url),
    featured: body?.featured !== false, // featured unless explicitly switched off
    order: Math.trunc(Number(body?.order)) || 0,
  };

  const gaps = (["title", "description", "image", "url"] as const).filter((k) => !data[k]);
  if (gaps.length) return { error: `Missing required fields: ${gaps.join(", ")}` };
  if (!isLink(data.url)) return { error: "Link must be a full web address (https://...) or a site path starting with /" };
  if (!isLink(data.image)) return { error: "Image must be an uploaded image or a full web address" };
  return { data };
}

/* ---------- public (website): GET /api/blogs?featured=true&limit=3 ---------- */
export async function listPublic(req: Request, res: Response) {
  const filter: Record<string, unknown> = {};
  if (req.query.featured === "true") filter.featured = true;

  const limit = Math.min(Math.max(parseInt(String(req.query.limit), 10) || 0, 0), 50);

  let query = Blog.find(filter).sort({ order: 1, createdAt: -1 }).select("title description image url");
  if (limit) query = query.limit(limit);
  res.json(await query);
}

/* ---------- admin (behind requireAuth) ---------- */
export async function listAdmin(_req: Request, res: Response) {
  res.json(await Blog.find().sort({ order: 1, createdAt: -1 }));
}

export async function createBlog(req: Request, res: Response) {
  try {
    const result = parse(req.body);
    if ("error" in result) return res.status(400).json({ error: result.error });
    res.status(201).json(await Blog.create(result.data));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function updateBlog(req: Request, res: Response) {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(404).json({ error: "Blog not found" });
    const result = parse(req.body);
    if ("error" in result) return res.status(400).json({ error: result.error });

    const blog = await Blog.findByIdAndUpdate(req.params.id, result.data, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteBlog(req: Request, res: Response) {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(404).json({ error: "Blog not found" });
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}
