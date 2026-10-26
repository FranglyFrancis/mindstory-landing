import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Service } from "../models/Service.js";

const CORE = ["slug", "title","image", "order", "hero"] as const;
const OPTIONAL = [
  "mainImage", "heading", "intro", "article", "lists", "iconCards", "titleCards",
  "titleItem", "imageItem", "paraItem", "features", "sections", "brands", "faqs",
] as const;

// Only these keys are taken from the request. Mongoose then drops unknown nested keys and checks the required ones.
function pick(b: any) {
  const data: Record<string, unknown> = {};
  for (const k of CORE) data[k] = b?.[k];
  
  // a section that is missing (or blank) is removed from the service
  for (const k of OPTIONAL) data[k] = b?.[k] === "" || b?.[k] == null ? undefined : b[k];
  data.hiddenSections = Array.isArray(b?.hiddenSections)
    ? b.hiddenSections.filter((k: unknown) => typeof k === "string" && (OPTIONAL as readonly string[]).includes(k))
    : [];
  return data;
}

function fail(e: any, res: Response) {
  if (e?.code === 11000) {
    return res.status(409).json({ error: "Another service already uses this slug. Choose a different slug." });
  }
  if (e?.name === "ValidationError") {
    const paths = Object.values(e.errors).map((x: any) => x.path ?? x.message);
    return res.status(400).json({ error: `Please check: ${paths.join(", ")}` });
  }
  console.error(e);
  res.status(500).json({ error: "Something went wrong" });
}

/* ---------- public (website) ---------- */

// GET /api/services -> the cards for the home page Expertise section
export async function listPublic(_req: Request, res: Response) {
  res.json(
    await Service.find()
      .sort({ order: 1, createdAt: 1 })
      .select("slug title description image order category -_id")
  );
}

// GET /api/services/:slug -> the whole service for its page
export async function getPublic(req: Request, res: Response) {
  const service = await Service.findOne({ slug: String(req.params.slug).toLowerCase() });
  if (!service) return res.status(404).json({ error: "Service not found" });
  res.json(service);
}

/* ---------- admin (behind requireAuth) ---------- */

export async function listAdmin(_req: Request, res: Response) {
  res.json(await Service.find().sort({ order: 1, createdAt: 1 }));
}

export async function createService(req: Request, res: Response) {
  try {
    res.status(201).json(await Service.create(pick(req.body)));
  } catch (e) {
    fail(e, res);
  }
}

export async function updateService(req: Request, res: Response) {
  try {
        if (!isValidObjectId(req.params.id)) return res.status(404).json({ error: "Service not found" });
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ error: "Service not found" });

        // load, change, save: this runs the full validation (including the required fields inside each section)
        for (const [key, value] of Object.entries(pick(req.body))) service.set(key, value);
        await service.save();
        res.json(service);
      } catch (e) {
        fail(e, res);
  }
}

export async function deleteService(req: Request, res: Response) {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(404).json({ error: "Service not found" });
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json({ ok: true });
  } catch (e) {
    fail(e, res);
  }
}
