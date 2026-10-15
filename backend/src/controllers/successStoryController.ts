import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { SuccessStory } from "../models/SuccessStory.js";

const REQUIRED = [
  "projectName", "projectDescription", "projectHistory", "projectImage", "projectLogo",
  "impact", "challenges", "strategyOverview", "resultsOverview",
] as const;

const str = (v: unknown) => String(v ?? "").trim();
const arr = (v: unknown): any[] => (Array.isArray(v) ? v : []);

// only whitelisted fields get through (no slug/_id/etc. from the client)
function clean(body: any) {
  const out: Record<string, any> = {};
  for (const k of REQUIRED) out[k] = str(body?.[k]);
  out.strategies = arr(body?.strategies)
    .map((s) => ({ icon: str(s?.icon), title: str(s?.title), description: str(s?.description) }))
    .filter((s) => s.title);
  out.keyOutcomes = arr(body?.keyOutcomes).map((o) => ({ title: str(o?.title), description: str(o?.description) })).filter((o) => o.title);
  out.galleryEnabled = Boolean(body?.galleryEnabled);
  out.gallery = arr(body?.gallery).map(str).filter(Boolean);
  return out;
}

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "story";

async function uniqueSlug(name: string) {
  const base = slugify(name);
  let slug = base;
  let i = 2;
  while (await SuccessStory.exists({ slug })) slug = `${base}-${i++}`;
  return slug;
}

/* ---------- public (website) ---------- */

// everything the carousel needs, nothing more
export async function listPublic(_req: Request, res: Response) {
  const stories = await SuccessStory.find()
    .sort({ createdAt: -1 })
    .select("slug projectName projectDescription projectImage -_id");
  res.json(stories);
}

export async function getPublic(req: Request, res: Response) {
  const story = await SuccessStory.findOne({ slug: req.params.slug });
  if (!story) return res.status(404).json({ error: "Story not found" });
  res.json(story);
}

/* ---------- admin (behind requireAuth) ---------- */

export async function listAdmin(_req: Request, res: Response) {
  res.json(await SuccessStory.find().sort({ createdAt: -1 }));
}

export async function createStory(req: Request, res: Response) {
  try {
    const data = clean(req.body);
    const missing = REQUIRED.filter((k) => !data[k]);
    if (missing.length) return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });

    const story = await SuccessStory.create({ ...data, slug: await uniqueSlug(data.projectName) });
    res.status(201).json(story);
  } catch (e: any) {
    if (e.code === 11000) return res.status(409).json({ error: "A story with this name already exists, try again" });
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function updateStory(req: Request, res: Response) {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(404).json({ error: "Story not found" });

    const data = clean(req.body);
    const missing = REQUIRED.filter((k) => !data[k]);
    if (missing.length) return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });

    // slug is left alone on purpose, so links already shared keep working
    const story = await SuccessStory.findByIdAndUpdate(req.params.id, data, { runValidators: true, returnDocument: "after" });
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.json(story);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteStory(req: Request, res: Response) {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(404).json({ error: "Story not found" });
    const story = await SuccessStory.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}
