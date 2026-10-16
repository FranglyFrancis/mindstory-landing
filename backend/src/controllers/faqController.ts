import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Faq } from "../models/Faqs.js";

const str = (v: unknown) => String(v ?? "").trim();

// only whitelisted fields get through
function clean(body: any) {
  return {
    page: str(body?.page),
    question: str(body?.question),
    answer: str(body?.answer),
    order: Math.trunc(Number(body?.order)) || 0,
  };
}

const missing = (d: ReturnType<typeof clean>) =>
  (["page", "question", "answer"] as const).filter((k) => !d[k]);

/* ---------- public (website): GET /api/faqs?page=home ---------- */
export async function listPublic(req: Request, res: Response) {
  // a string check also blocks query-operator tricks like ?page[$ne]=x
  const filter = typeof req.query.page === "string" && req.query.page ? { page: req.query.page } : {};
  const faqs = await Faq.find(filter).sort({ order: 1, createdAt: 1 }).select("question answer -_id");
  res.json(faqs);
}

/* ---------- admin (behind requireAuth) ---------- */
export async function listAdmin(_req: Request, res: Response) {
  res.json(await Faq.find().sort({ page: 1, order: 1, createdAt: 1 }));
}

export async function createFaq(req: Request, res: Response) {
  try {
    const data = clean(req.body);
    const gaps = missing(data);
    if (gaps.length) return res.status(400).json({ error: `Missing required fields: ${gaps.join(", ")}` });
    res.status(201).json(await Faq.create(data));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function updateFaq(req: Request, res: Response) {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(404).json({ error: "FAQ not found" });
    const data = clean(req.body);
    const gaps = missing(data);
    if (gaps.length) return res.status(400).json({ error: `Missing required fields: ${gaps.join(", ")}` });

    const faq = await Faq.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!faq) return res.status(404).json({ error: "FAQ not found" });
    res.json(faq);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteFaq(req: Request, res: Response) {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(404).json({ error: "FAQ not found" });
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ error: "FAQ not found" });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}
