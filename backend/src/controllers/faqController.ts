import type { Request, Response } from "express";
import { Faq } from "../models/Faqs.js";

export async function getFaqs(req: Request, res: Response) {
  try {
    const page = String(req.query.page ?? "home");
    const faqs = await Faq.find({ page })
      .select("question answer")
      .sort({ order: 1 })
      .lean();
    res.json(faqs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
}