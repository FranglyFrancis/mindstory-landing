// The sections an admin can add to a service page. One entry per optional section in your model,
// listed in the same order as BLOCKS in ServicePageView.tsx (that is also the default page order).

export type FieldType = "text" | "textarea" | "image" | "select" | "strings" | "array" | "object";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  optional?: boolean;      // not required by the model
  options?: string[];      // select
  itemLabel?: string;      // array / strings: "Feature", "Question"...
  fields?: FieldDef[];     // array / object
  allowEmpty?: boolean;    // array may have zero items
}
export type FieldBody = Omit<FieldDef, "name">;
export interface SectionDef extends FieldBody { key: string; description: string }

type Obj = Record<string, unknown>;

const make = (type: FieldType) => (name: string, label: string, extra: Partial<FieldDef> = {}): FieldDef => ({ name, label, type, ...extra });
const text = make("text");
const area = make("textarea");
const image = make("image");   // an uploaded image (also used for icons)

/** Always present, always first. */
export const HERO: SectionDef = {
  key: "hero", label: "Hero banner", description: "Always shown at the top of the page.", type: "object",
  fields: [text("title", "Title"), area("description", "Description"), image("image", "Image")],
};

export const SECTIONS: SectionDef[] = [
  { key: "mainImage", label: "Main image", description: "One large image.", type: "image" },
  {
    key: "heading", label: "Heading", description: "A title with optional supporting text.", type: "object",
    fields: [text("title", "Title"), area("description", "Description", { optional: true })],
  },
  {
    key: "intro", label: "Intro (two columns)", description: "A title with a left and right text column.", type: "object",
    fields: [text("title", "Title"), area("left", "Left column"), area("right", "Right column")],
  },
  {
    key: "article", label: "Article text", description: "Long-form text split into paragraphs.", type: "object",
    fields: [
      text("title", "Title", { optional: true }),
      { name: "descriptions", label: "Paragraphs", type: "strings", itemLabel: "Paragraph" },
    ],
  },
  {
    key: "lists", label: "Icon list", description: "Rows with an icon, title and text.", type: "array", itemLabel: "List item",
    fields: [image("icon", "Icon"), text("title", "Title"), area("description", "Description")],
  },
  {
    key: "iconCards", label: "Icon cards", description: "Cards with an icon, title and text.", type: "array", itemLabel: "Card",
    fields: [image("icon", "Icon"), text("title", "Title"), area("description", "Description")],
  },
  {
    key: "titleCards", label: "Title cards", description: "Cards with a title and text.", type: "array", itemLabel: "Card",
    fields: [text("title", "Title"), area("description", "Description")],
  },
  {
    key: "titleItem", label: "Title items with image", description: "Title, text and image per item.", type: "array", itemLabel: "Item",
    fields: [text("title", "Title"), area("description", "Description"), image("image", "Image")],
  },
  {
    key: "imageItem", label: "Image with text", description: "One image with a description.", type: "object",
    fields: [image("image", "Image"), area("description", "Description")],
  },
  {
    key: "paraItem", label: "Paragraph items", description: "A list of short paragraphs.", type: "array", itemLabel: "Paragraph",
    fields: [area("description", "Description")],
  },
  {
    key: "features", label: "Features", description: "Text beside an image, left or right.", type: "array", itemLabel: "Feature",
    fields: [
      text("title", "Title", { optional: true }),
      area("description", "Description"),
      image("image", "Image"),
      { name: "imagePosition", label: "Image position", type: "select", options: ["left", "right"] },
    ],
  },
  {
    key: "sections", label: "Content sections", description: "A title and image with several content blocks.", type: "array", itemLabel: "Section",
    fields: [
      text("title", "Title"),
      image("image", "Image"),
      {
        name: "content", label: "Content blocks", type: "array", itemLabel: "Block", allowEmpty: true,
        fields: [text("title", "Title"), area("description", "Description")],
      },
    ],
  },
  {
    key: "brands", label: "Brands", description: "Logos with brand names.", type: "array", itemLabel: "Brand",
    fields: [image("image", "Logo"), text("brand", "Brand name")],
  },
  {
    key: "faqs", label: "FAQs", description: "Questions and answers.", type: "array", itemLabel: "Question",
    fields: [text("question", "Question"), area("answer", "Answer")],
  },
];

export const SECTION_BY_KEY: Record<string, SectionDef> = Object.fromEntries(SECTIONS.map((s) => [s.key, s]));

/** Services with a hand-built page in ServiceDetail.tsx. Their content is edited here, but the layout is fixed in code. */
export const CUSTOM_LAYOUT_SLUGS = [
  "social-media-marketing", "seo-optimisation", "logo-design", "email-marketing", "brand-identity", "web-development",
];

/* ---------- helpers ---------- */

export const asObj = (v: unknown): Obj => (v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : {});
export const asString = (v: unknown): string => (typeof v === "string" ? v : "");

export function emptyValue(def: FieldBody): unknown {
  switch (def.type) {
    case "array":
    case "strings": return [];
    case "select": return def.options?.[0] ?? "";
    case "object": {
      const o: Obj = {};
      (def.fields ?? []).forEach((f) => { o[f.name] = emptyValue(f); });
      return o;
    }
    default: return "";
  }
}

/** Does this value hold anything worth showing? (a select on its own does not count) */
export function hasContent(v: unknown): boolean {
  if (Array.isArray(v)) return v.length > 0;
  if (v && typeof v === "object") return Object.values(v as Obj).some(hasContent);
  return typeof v === "string" ? v.trim() !== "" : !!v;
}

function blank(def: FieldBody, v: unknown): boolean {
  if (def.type === "select") return true;
  if (def.type === "object") {
    const o = asObj(v);
    return (def.fields ?? []).every((f) => blank(f, o[f.name]));
  }
  if (Array.isArray(v)) return v.length === 0;
  return !v;
}

/** Trims text, drops empty paragraphs and fully empty list items, omits empty optional fields. */
export function cleanValue(def: FieldBody, v: unknown): unknown {
  switch (def.type) {
    case "text":
    case "textarea":
    case "image":
      return typeof v === "string" ? v.trim() : "";
    case "select": {
      const options = def.options ?? [];
      return typeof v === "string" && options.includes(v) ? v : options[0] ?? "";
    }
    case "strings":
      return (Array.isArray(v) ? v : []).map((x) => (typeof x === "string" ? x.trim() : "")).filter(Boolean);
    case "array": {
      const item: FieldBody = { label: def.label, type: "object", fields: def.fields };
      return (Array.isArray(v) ? v : []).map((i) => cleanValue(item, i)).filter((i) => !blank(item, i));
    }
    case "object": {
      const src = asObj(v);
      const out: Obj = {};
      for (const f of def.fields ?? []) {
        const c = cleanValue(f, src[f.name]);
        if (f.optional && c === "") continue;
        out[f.name] = c;
      }
      return out;
    }
  }
}

/** Run on cleaned values. Returns the first problem as a sentence, or null when everything is filled in. */
export function validateValue(def: FieldBody, v: unknown, trail: string): string | null {
  switch (def.type) {
    case "text":
    case "textarea":
    case "image":
      return !def.optional && !v ? `${trail} is required.` : null;
    case "select":
      return null;
    case "strings":
      return !def.optional && (v as unknown[]).length === 0 ? `${trail}: add at least one.` : null;
    case "array": {
      const items = v as unknown[];
      if (!def.allowEmpty && items.length === 0) return `${trail}: add at least one ${(def.itemLabel ?? "item").toLowerCase()}.`;
      for (let i = 0; i < items.length; i++) {
        const o = asObj(items[i]);
        for (const f of def.fields ?? []) {
          const m = validateValue(f, o[f.name], `${trail} › ${def.itemLabel ?? "Item"} ${i + 1} › ${f.label}`);
          if (m) return m;
        }
      }
      return null;
    }
    case "object": {
      const o = asObj(v);
      for (const f of def.fields ?? []) {
        const m = validateValue(f, o[f.name], `${trail} › ${f.label}`);
        if (m) return m;
      }
      return null;
    }
  }
}

/** Short text for a collapsed section card, e.g. "4 cards". */
export function summarize(def: FieldBody, v: unknown): string {
  const plural = (n: number, noun: string) => `${n} ${noun.toLowerCase()}${n === 1 ? "" : "s"}`;
  if (def.type === "array") return plural(Array.isArray(v) ? v.length : 0, def.itemLabel ?? "item");
  if (def.type === "image") return v ? "1 image" : "No image yet";
  if (def.type === "object") {
    const o = asObj(v);
    const first = (def.fields ?? []).find((f) => f.type === "text" && asString(o[f.name]).trim());
    if (first) { const s = asString(o[first.name]).trim(); return s.length > 40 ? s.slice(0, 40) + "…" : s; }
    const paras = Array.isArray(o.descriptions) ? o.descriptions.length : 0;
    return paras ? plural(paras, "paragraph") : "Empty";
  }
  return "";
}
