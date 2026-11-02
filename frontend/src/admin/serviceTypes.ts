export type Obj = Record<string, unknown>;
export type Note = { ok: boolean; text: string } | null;

/** One row of the listing (the full document is loaded when you open Edit). */
export type Row = {
  _id: string;
  slug: string;
  title: string;
  image: string;
  order: number;
  category?: string;
  cardTitle?: string;
  description: string;
  cardImage: string;
  sectionCount: number;
  updatedAt?: string;
};

export type Doc = {
  _id: string;
  slug: string;
  title: string;
  image: string;
  order: number;
  category?: string;
  cardTitle?: string;
  cardImage: string;
  description: string;
  hero: Obj;
  sectionOrder?: string[];
  hiddenSections?: string[];
  [section: string]: unknown;
};

// The form keeps `order` as text so the field can be empty while typing.
export type Details = {
  title: string;
  slug: string;
  image: string;
  order: string;
  cardTitle: string;
  description: string;
  category: string;
  cardImage: string;
};

export const BASE = "/service-pages";
export const LIST_HASH = "services";

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugify = (value: string): string =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const formatDate = (iso?: string): string =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";

export const emptyDetails = (nextOrder: number): Details => ({
  title: "",
  slug: "",
  image: "",
  order: String(nextOrder),
  cardTitle: "",
  description: "",
  category: "",
  cardImage: "",
});

export const detailsFromDoc = (doc: Doc): Details => ({
  title: doc.title ?? "",
  slug: doc.slug ?? "",
  image: doc.image ?? "",
  order: String(doc.order ?? 0),
  cardTitle: doc.cardTitle ?? "",
  description: doc.description ?? "",
  category: doc.category ?? "",
  cardImage: doc.cardImage ?? "",
});