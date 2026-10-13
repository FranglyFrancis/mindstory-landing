import type { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Service } from "../models/Service.js";

const sha = (s: string) => crypto.createHash("sha256").update(s).digest();

const clean = (s: string) => s.trim().replace(/^["']|["']$/g, "");

export function login(req: Request, res: Response) {
  const password = String(req.body?.password ?? "").trim();
  const expected = clean(process.env.ADMIN_PASSWORD ?? "");
  const ok = expected.length > 0 && crypto.timingSafeEqual(sha(password), sha(expected));
  if (!ok) return res.status(401).json({ error: "Wrong password" });
  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, { expiresIn: "8h" });
  res.json({ token });
}

export async function listAll(_req: Request, res: Response) {
  res.json(await Service.find().sort({ order: 1 }).lean());
}

export async function create(req: Request, res: Response) {
  try {
    const doc = await Service.create(req.body);
    res.status(201).json(doc);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const doc = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      overwrite: true, // replace the whole document so removed fields really disappear
    });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function remove(req: Request, res: Response) {
  const doc = await Service.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
}