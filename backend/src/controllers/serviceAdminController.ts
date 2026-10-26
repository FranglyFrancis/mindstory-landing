import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Service } from "../models/Service.js";   // adjust to wherever your Service model lives

/* Admin side of the services: list, read one, create, update, delete.
   The public site keeps using your existing GET /api/services and GET /api/services/:slug. */

const SECTION_KEYS = [
  "mainImage", "heading", "intro", "article", "lists", "iconCards", "titleCards", "titleItem",
  "imageItem", "paraItem", "features", "sections", "brands", "faqs",
];

// Express can type a route param as string | string[], so always read it through this.
const idOf = (req: Request): string => String(req.params.id);

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const keysOf = (v: unknown): string[] =>
  Array.isArray(v) ? [...new Set(v.filter((k): k is string => typeof k === "string" && SECTION_KEYS.includes(k)))] : [];

type Settable = { set: (path: string | Record<string, unknown>, value?: unknown) => unknown };

/** Copies the whitelisted fields onto the document. A section that is missing from the request is removed. */
function fill(doc: Settable, body: Record<string, unknown>) {
  const present = SECTION_KEYS.filter((k) => body[k] !== undefined && body[k] !== null);
  doc.set({
    title: text(body.title, 150),
    slug: text(body.slug, 80).toLowerCase(),
    description: text(body.description, 1000),
    category: text(body.category, 100),
    image: text(body.image, 500),
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    hero: body.hero,
    sectionOrder: keysOf(body.sectionOrder).filter((k) => present.includes(k)),
    hiddenSections: keysOf(body.hiddenSections).filter((k) => present.includes(k)),
  });
  for (const k of SECTION_KEYS) doc.set(k, present.includes(k) ? body[k] : undefined);
}

function hasContent(v: unknown): boolean {
  if (Array.isArray(v)) return v.length > 0;
  if (v && typeof v === "object") return Object.values(v).some(hasContent);
  return typeof v === "string" ? v.trim() !== "" : false;
}

function fail(res: Response, e: unknown) {
  if (e instanceof mongoose.Error.ValidationError) {
    const errors = (e as unknown as { errors: Record<string, { message?: string }> }).errors;
    const first = Object.values(errors)[0];
    return res.status(400).json({ error: first?.message?.replace(/`/g, "") ?? "Some fields are missing or invalid." });
  }
  if ((e as { code?: number })?.code === 11000) {
    return res.status(409).json({ error: "Another service already uses that page address." });
  }
  console.error(e);
  return res.status(500).json({ error: "Something went wrong. Please try again." });
}

/** GET /api/admin/service-pages  -> one summary row per service */
export async function listServices(_req: Request, res: Response) {
  try {
    const list = (await Service.find().sort({ order: 1, createdAt: 1 }).lean()) as unknown as Record<string, unknown>[];
    res.json(
      list.map((s) => ({
        _id: s._id, slug: s.slug, title: s.title, category: s.category, description: s.description, image: s.image, order: s.order,
        updatedAt: s.updatedAt,
        sectionCount: 1 + SECTION_KEYS.filter((k) => hasContent(s[k])).length,   // hero + sections with content
      }))
    );
  } catch (e) {
    fail(res, e);
  }
}

/** GET /api/admin/service-pages/:id  -> the whole document */
export async function getService(req: Request, res: Response) {
  try {
    const id = idOf(req);
    if (!mongoose.isValidObjectId(id)) return res.status(404).json({ error: "Service not found." });
    const s = await Service.findById(id).lean();
    if (!s) return res.status(404).json({ error: "Service not found." });
    res.json(s);
  } catch (e) {
    fail(res, e);
  }
}

/** POST /api/admin/service-pages */
export async function createService(req: Request, res: Response) {
  try {
    const doc = new Service();
    fill(doc as unknown as Settable, (req.body ?? {}) as Record<string, unknown>);
    await doc.save();
    res.status(201).json(doc);
  } catch (e) {
    fail(res, e);
  }
}

/** PUT /api/admin/service-pages/:id */
export async function updateService(req: Request, res: Response) {
  try {
    const id = idOf(req);
    if (!mongoose.isValidObjectId(id)) return res.status(404).json({ error: "Service not found." });
    const doc = await Service.findById(id);
    if (!doc) return res.status(404).json({ error: "Service not found." });
    fill(doc as unknown as Settable, (req.body ?? {}) as Record<string, unknown>);
    await doc.save();
    res.json(doc);
  } catch (e) {
    fail(res, e);
  }
}

/** DELETE /api/admin/service-pages/:id */
export async function deleteService(req: Request, res: Response) {
  try {
    const id = idOf(req);
    if (!mongoose.isValidObjectId(id)) return res.status(404).json({ error: "Service not found." });
    const doc = await Service.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ error: "Service not found." });
    res.json({ ok: true });
  } catch (e) {
    fail(res, e);
  }
}
