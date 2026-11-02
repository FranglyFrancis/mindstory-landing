import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { SuccessStory } from "../models/SuccessStory.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const REQUIRED_FIELDS = [
  "projectName",
  "projectDescription",
  "projectHistory",
  "projectImage",
  "projectLogo",
  "strategyOverview",
  "resultsOverview",
  "conclusion",
] as const;

const CARD_FIELDS = "slug projectName projectDescription projectImage -_id";
const FALLBACK_SLUG = "story";

type RequiredField = (typeof REQUIRED_FIELDS)[number];

type Strategy = { icon: string; title: string; description: string };
type KeyOutcome = { title: string; description: string };

type StoryData = Record<RequiredField, string> & {
  strategies: Strategy[];
  keyOutcomes: KeyOutcome[];
  galleryEnabled: boolean;
  gallery: string[];
};

type ParseResult = { data: StoryData } | { error: string };

const toText = (value: unknown): string => String(value ?? "").trim();
const toList = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);
const toRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : {};

const sendError = (res: Response, status: number, message: string): void => {
  res.status(status).json({ error: message });
};

const sendNotFound = (res: Response): void => sendError(res, 404, "Story not found");

// Only whitelisted fields get through (no slug, _id or anything else from the client).
function parseStoryBody(body: unknown): ParseResult {
  const input = toRecord(body);

  const requiredValues = Object.fromEntries(
    REQUIRED_FIELDS.map((field) => [field, toText(input[field])])
  ) as Record<RequiredField, string>;

  const missing = REQUIRED_FIELDS.filter((field) => !requiredValues[field]);
  if (missing.length > 0) {
    return { error: `Missing required fields: ${missing.join(", ")}` };
  }

  const strategies = toList(input.strategies)
    .map((item) => {
      const s = toRecord(item);
      return { icon: toText(s.icon), title: toText(s.title), description: toText(s.description) };
    })
    .filter((strategy) => strategy.title);

  const keyOutcomes = toList(input.keyOutcomes)
    .map((item) => {
      const o = toRecord(item);
      return { title: toText(o.title), description: toText(o.description) };
    })
    .filter((outcome) => outcome.title);

  const gallery = toList(input.gallery).map(toText).filter(Boolean);

  return {
    data: {
      ...requiredValues,
      strategies,
      keyOutcomes,
      galleryEnabled: Boolean(input.galleryEnabled),
      gallery,
    },
  };
}

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || FALLBACK_SLUG;

async function uniqueSlug(name: string): Promise<string> {
  const base = slugify(name);
  let slug = base;
  let suffix = 2;

  while (await SuccessStory.exists({ slug })) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}

/* ---------- public (website) ---------- */

// Everything the carousel needs, nothing more.
export const listPublic = asyncHandler(async (_req: Request, res: Response) => {
  const stories = await SuccessStory.find().sort({ createdAt: -1 }).select(CARD_FIELDS);
  res.json(stories);
});

export const getPublic = asyncHandler(async (req: Request, res: Response) => {
  const story = await SuccessStory.findOne({ slug: String(req.params.slug) });
  if (!story) return sendNotFound(res);

  res.json(story);
});

/* ---------- admin (behind requireAuth) ---------- */

export const listAdmin = asyncHandler(async (_req: Request, res: Response) => {
  res.json(await SuccessStory.find().sort({ createdAt: -1 }));
});

export const createStory = asyncHandler(async (req: Request, res: Response) => {
  const result = parseStoryBody(req.body);
  if ("error" in result) return sendError(res, 400, result.error);

  const slug = await uniqueSlug(result.data.projectName);
  const story = await SuccessStory.create({ ...result.data, slug });
  res.status(201).json(story);
});

export const updateStory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return sendNotFound(res);

  const result = parseStoryBody(req.body);
  if ("error" in result) return sendError(res, 400, result.error);

  // The slug is left alone on purpose, so links already shared keep working.
  const story = await SuccessStory.findByIdAndUpdate(id, result.data, {
    runValidators: true,
    returnDocument: "after",
  });

  if (!story) return sendNotFound(res);
  res.json(story);
});

export const deleteStory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return sendNotFound(res);

  const story = await SuccessStory.findByIdAndDelete(id);
  if (!story) return sendNotFound(res);
  res.json({ ok: true });
});