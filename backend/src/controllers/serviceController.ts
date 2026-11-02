import type { Request, Response } from "express";
import { Service } from "../models/Service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const LIST_FIELDS = "slug title description image order category cardTitle cardImage -_id";

/** GET /api/services -> cards for the Expertise section, Services page and navbar */
export const listPublic = asyncHandler(async (_req: Request, res: Response) => {
  const services = await Service.find()
    .sort({ order: 1, createdAt: 1 })
    .select(LIST_FIELDS);

  res.json(services);
});

/** GET /api/services/:slug -> the whole service for its page */
export const getPublic = asyncHandler(async (req: Request, res: Response) => {
  const slug = String(req.params.slug).toLowerCase();

  const service = await Service.findOne({ slug });
  if (!service) {
    res.status(404).json({ error: "Service not found" });
    return;
  }

  res.json(service);
});