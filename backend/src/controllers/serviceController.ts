import type { Request, Response } from "express";
import { Service } from "../models/Service.js";

// list: only what the cards need
export async function getServices(_req: Request, res: Response) {
  const services = await Service.find()
    .select("slug title description image")
    .sort({ order: 1 })
    .lean();
  res.json(services);
}

// detail: everything for one service
export async function getServiceBySlug(req: Request, res: Response) {
  const service = await Service.findOne({ slug: req.params.slug }).lean();
  if (!service) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.json(service);
}