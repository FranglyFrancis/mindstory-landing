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

// detail: everything for one service - hidden section
  const PROTECTED = new Set(["slug", "title", "description", "image", "order"]);

  export async function getServiceBySlug(req: Request, res: Response) {
    try {
      const service = await Service.findOne({ slug: req.params.slug }).lean();
      if (!service) {
        res.status(404).json({ error: "Service not found" });
        return;
      }
      const { hiddenSections = [], ...rest } = service as any;
      for (const key of hiddenSections) {
        if (!PROTECTED.has(key)) delete rest[key];
      }
      res.json(rest);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch service" });
    }
  }

