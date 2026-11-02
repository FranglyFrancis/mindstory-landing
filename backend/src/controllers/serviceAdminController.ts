import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Service } from "../models/Service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/* Admin side of the services: list, read one, create, update, delete.
   The public site keeps using your existing GET /api/services and GET /api/services/:slug. */

const SECTION_KEYS = [
  "mainImage", "heading", "intro", "article", "lists", "iconCards", "titleCards", "titleItem",
  "imageItem", "paraItem", "features", "sections", "brands", "faqs",
];

const MAX_LENGTH = {
  title: 150,
  slug: 80,
  image: 500,
  category: 100,
  cardTitle: 150,
  description: 1000,
  cardImage: 500,
} as const;

type Settable = { set: (path: string | Record<string, unknown>, value?: unknown) => unknown };

const sendNotFound = (res: Response): void => {
  res.status(404).json({ error: "Service not found." });
};

// Express can type a route param as string | string[], so always read it through this.
const idOf = (req: Request): string => String(req.params.id);

const toText = (value: unknown, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const toSectionKeys = (value: unknown): string[] =>
  Array.isArray(value)
    ? [...new Set(value.filter((key): key is string => typeof key === "string" && SECTION_KEYS.includes(key)))]
    : [];

function hasContent(value: unknown): boolean {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.values(value).some(hasContent);
  return typeof value === "string" ? value.trim() !== "" : false;
}

/** Copies the whitelisted fields onto the document. A section that is missing from the request is removed. */
function applyServiceFields(doc: Settable, body: Record<string, unknown>): void {
  const presentSections = SECTION_KEYS.filter((key) => body[key] !== undefined && body[key] !== null);
  const order = Number(body.order);

  doc.set({
    title: toText(body.title, MAX_LENGTH.title).toUpperCase(),
    slug: toText(body.slug, MAX_LENGTH.slug).toLowerCase(),
    image: toText(body.image, MAX_LENGTH.image),
    category: toText(body.category, MAX_LENGTH.category),
    cardTitle: toText(body.cardTitle, MAX_LENGTH.cardTitle),
    description: toText(body.description, MAX_LENGTH.description),
    cardImage: toText(body.cardImage, MAX_LENGTH.cardImage),
    order: Number.isFinite(order) ? order : 0,
    hero: body.hero,
    sectionOrder: toSectionKeys(body.sectionOrder).filter((key) => presentSections.includes(key)),
    hiddenSections: toSectionKeys(body.hiddenSections).filter((key) => presentSections.includes(key)),
  });

  for (const key of SECTION_KEYS) {
    doc.set(key, presentSections.includes(key) ? body[key] : undefined);
  }
}

function toSummary(service: Record<string, unknown>) {
  return {
    _id: service._id,
    slug: service.slug,
    title: service.title,
    image: service.image,
    category: service.category,
    cardTitle: service.cardTitle,
    description: service.description,
    cardImage: service.cardImage,
    order: service.order,
    updatedAt: service.updatedAt,
    // hero + every section that has content
    sectionCount: 1 + SECTION_KEYS.filter((key) => hasContent(service[key])).length,
  };
}

/** GET /api/admin/service-pages -> one summary row per service */
export const listServices = asyncHandler(async (_req: Request, res: Response) => {
  const services = (await Service.find()
    .sort({ order: 1, createdAt: 1 })
    .lean()) as unknown as Record<string, unknown>[];

  res.json(services.map(toSummary));
});

/** GET /api/admin/service-pages/:id -> the whole document */
export const getService = asyncHandler(async (req: Request, res: Response) => {
  const id = idOf(req);
  if (!isValidObjectId(id)) return sendNotFound(res);

  const service = await Service.findById(id).lean();
  if (!service) return sendNotFound(res);
  res.json(service);
});

/** POST /api/admin/service-pages */
export const createService = asyncHandler(async (req: Request, res: Response) => {
  const service = new Service();
  applyServiceFields(service as unknown as Settable, (req.body ?? {}) as Record<string, unknown>);
  await service.save();
  res.status(201).json(service);
});

/** PUT /api/admin/service-pages/:id */
export const updateService = asyncHandler(async (req: Request, res: Response) => {
  const id = idOf(req);
  if (!isValidObjectId(id)) return sendNotFound(res);

  const service = await Service.findById(id);
  if (!service) return sendNotFound(res);

  applyServiceFields(service as unknown as Settable, (req.body ?? {}) as Record<string, unknown>);
  await service.save();
  res.json(service);
});

/** DELETE /api/admin/service-pages/:id */
export const deleteService = asyncHandler(async (req: Request, res: Response) => {
  const id = idOf(req);
  if (!isValidObjectId(id)) return sendNotFound(res);

  const service = await Service.findByIdAndDelete(id);
  if (!service) return sendNotFound(res);
  res.json({ ok: true });
});