import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Brand } from "../models/Brand.js";

/* A brand is a name and a logo. The image itself is uploaded through your existing
   POST /api/admin/upload endpoint; this controller stores the URL it returns. */

class BadRequest extends Error {}

// Reject URL schemes that could run code if the value is ever rendered as a link.
const UNSAFE_URL = /^\s*(javascript|data|vbscript):/i;

function readBrand(body: unknown): { name: string; logo: string } {
  const b = (body ?? {}) as { name?: unknown; logo?: unknown };
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const logo = typeof b.logo === "string" ? b.logo.trim() : "";

  if (!name) throw new BadRequest("Enter the brand name.");
  if (name.length > 100) throw new BadRequest("The brand name is too long (100 characters max).");
  if (!logo) throw new BadRequest("Upload a logo image.");
  if (logo.length > 500 || UNSAFE_URL.test(logo)) throw new BadRequest("That logo link is not valid.");
  return { name, logo };
}

// Express can type a route param as string | string[], so always read it through this.
const idOf = (req: Request): string => String(req.params.id);

function fail(res: Response, e: unknown) {
  if (e instanceof BadRequest) return res.status(400).json({ error: e.message });
  console.error(e);
  return res.status(500).json({ error: "Something went wrong. Please try again." });
}

/** GET /api/brands  (public: the website uses this too). Oldest first, so the admin shows the same order as the site. */
export async function getBrands(_req: Request, res: Response) {
  try {
    res.json(await Brand.find().sort({ createdAt: 1 }));
  } catch (e) {
    fail(res, e);
  }
}

/** POST /api/brands   body: { name, logo } */
export async function createBrand(req: Request, res: Response) {
  try {
    const brand = await Brand.create(readBrand(req.body));
    res.status(201).json(brand);
  } catch (e) {
    fail(res, e);
  }
}

/** PUT /api/brands/:id   body: { name, logo } */
export async function updateBrand(req: Request, res: Response) {
  try {
    const id = idOf(req);
    if (!mongoose.isValidObjectId(id)) return res.status(404).json({ error: "Brand not found." });

    const brand = await Brand.findByIdAndUpdate(id, readBrand(req.body), { returnDocument: "after" });
    if (!brand) return res.status(404).json({ error: "Brand not found." });
    res.json(brand);
  } catch (e) {
    fail(res, e);
  }
}

/** DELETE /api/brands/:id */
export async function deleteBrand(req: Request, res: Response) {
  try {
    const id = idOf(req);
    if (!mongoose.isValidObjectId(id)) return res.status(404).json({ error: "Brand not found." });

    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) return res.status(404).json({ error: "Brand not found." });
    res.json({ ok: true });
  } catch (e) {
    fail(res, e);
  }
}