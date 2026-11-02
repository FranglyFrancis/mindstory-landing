import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Faq } from "../models/Faqs.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const REQUIRED_FIELDS = ["page", "question", "answer"] as const;

type FaqData = {
  page: string;
  question: string;
  answer: string;
  order: number;
};

type ParseResult = { data: FaqData } | { error: string };

const toText = (value: unknown): string => String(value ?? "").trim();

const sendError = (res: Response, status: number, message: string): void => {
  res.status(status).json({ error: message });
};

const sendNotFound = (res: Response): void => sendError(res, 404, "FAQ not found");

// Only whitelisted fields get through.
function parseFaqBody(body: unknown): ParseResult {
  const input = (body ?? {}) as Record<string, unknown>;

  const data: FaqData = {
    page: toText(input.page),
    question: toText(input.question),
    answer: toText(input.answer),
    order: Math.trunc(Number(input.order)) || 0,
  };

  const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
  if (missing.length > 0) {
    return { error: `Missing required fields: ${missing.join(", ")}` };
  }
  return { data };
}

/* ---------- public (website): GET /api/faqs?page=home ---------- */
export const listPublic = asyncHandler(async (req: Request, res: Response) => {
  // A string check also blocks query-operator tricks like ?page[$ne]=x
  const { page } = req.query;
  const filter = typeof page === "string" && page ? { page } : {};

  const faqs = await Faq.find(filter)
    .sort({ order: 1, createdAt: 1 })
    .select("page question answer order -_id");

  res.json(faqs);
});

/* ---------- admin (behind requireAuth) ---------- */
export const listAdmin = asyncHandler(async (_req: Request, res: Response) => {
  res.json(await Faq.find().sort({ page: 1, order: 1, createdAt: 1 }));
});

export const createFaq = asyncHandler(async (req: Request, res: Response) => {
  const result = parseFaqBody(req.body);
  if ("error" in result) return sendError(res, 400, result.error);

  res.status(201).json(await Faq.create(result.data));
});

export const updateFaq = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return sendNotFound(res);

  const result = parseFaqBody(req.body);
  if ("error" in result) return sendError(res, 400, result.error);

  const faq = await Faq.findByIdAndUpdate(id, result.data, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!faq) return sendNotFound(res);
  res.json(faq);
});

export const deleteFaq = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return sendNotFound(res);

  const faq = await Faq.findByIdAndDelete(id);
  if (!faq) return sendNotFound(res);
  res.json({ ok: true });
});