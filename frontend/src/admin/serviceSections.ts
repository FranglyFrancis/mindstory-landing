// The sections an admin can add to a service page. One entry per optional section in your model,
// listed in the same order as BLOCKS in ServicePageView.tsx (that is also the default page order).

export type FieldType = "text" | "textarea" | "image" | "select" | "strings" | "array" | "object";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  optional?: boolean; // not required by the model
  options?: string[]; // select
  itemLabel?: string; // array / strings: "Feature", "Question"...
  fields?: FieldDef[]; // array / object
  allowEmpty?: boolean; // array may have zero items
};

export type FieldBody = Omit<FieldDef, "name">;
export type SectionDef = FieldBody & { key: string; description: string };

type Obj = Record<string, unknown>;

const SUMMARY_MAX_LENGTH = 40;

/* ---------- field builders ---------- */

const makeField =
  (type: FieldType) =>
  (name: string, label: string, extra: Partial<FieldDef> = {}): FieldDef => ({ name, label, type, ...extra });

const text = makeField("text");
const area = makeField("textarea");
const image = makeField("image"); // an uploaded image (also used for icons)

// Shared by the "Icon list" and "Icon cards" sections.
const ICON_ITEM_FIELDS: FieldDef[] = [image("icon", "Icon"), text("title", "Title"), area("description", "Description")];

/* ---------- sections ---------- */

/** Always present, always first. */
export const HERO: SectionDef = {
  key: "hero",
  label: "Hero banner",
  description: "Always shown at the top of the page.",
  type: "object",
  fields: [text("title", "Title"), area("description", "Description"), image("image", "Image")],
};

export const SECTIONS: SectionDef[] = [
  { key: "mainImage", label: "Main image", description: "One large image.", type: "image" },
  {
    key: "heading",
    label: "Heading",
    description: "A title with optional supporting text.",
    type: "object",
    fields: [text("title", "Title"), area("description", "Description", { optional: true })],
  },
  {
    key: "intro",
    label: "Intro (two columns)",
    description: "A title with a left and right text column.",
    type: "object",
    fields: [text("title", "Title"), area("left", "Left column"), area("right", "Right column")],
  },
  {
    key: "article",
    label: "Article text",
    description: "Long-form text split into paragraphs.",
    type: "object",
    fields: [
      text("title", "Title", { optional: true }),
      { name: "descriptions", label: "Paragraphs", type: "strings", itemLabel: "Paragraph" },
    ],
  },
  {
    key: "lists",
    label: "Icon list",
    description: "Rows with an icon, title and text.",
    type: "array",
    itemLabel: "List item",
    fields: ICON_ITEM_FIELDS,
  },
  {
    key: "iconCards",
    label: "Icon cards",
    description: "Cards with an icon, title and text.",
    type: "array",
    itemLabel: "Card",
    fields: ICON_ITEM_FIELDS,
  },
  {
    key: "titleCards",
    label: "Title cards",
    description: "Cards with a title and text.",
    type: "array",
    itemLabel: "Card",
    fields: [text("title", "Title"), area("description", "Description")],
  },
  {
    key: "titleItem",
    label: "Title items with image",
    description: "Title, text and image per item.",
    type: "array",
    itemLabel: "Item",
    fields: [text("title", "Title"), area("description", "Description"), image("image", "Image")],
  },
  {
    key: "imageItem",
    label: "Image with text",
    description: "One image with a description.",
    type: "object",
    fields: [image("image", "Image"), area("description", "Description")],
  },
  {
    key: "paraItem",
    label: "Paragraph items",
    description: "A list of short paragraphs.",
    type: "array",
    itemLabel: "Paragraph",
    fields: [area("description", "Description")],
  },
  {
    key: "features",
    label: "Features",
    description: "Text beside an image, left or right.",
    type: "array",
    itemLabel: "Feature",
    fields: [
      text("title", "Title", { optional: true }),
      area("description", "Description"),
      image("image", "Image"),
      { name: "imagePosition", label: "Image position", type: "select", options: ["left", "right"] },
    ],
  },
  {
    key: "sections",
    label: "Content sections",
    description: "A title and image with several content blocks.",
    type: "array",
    itemLabel: "Section",
    fields: [
      text("title", "Title"),
      image("image", "Image"),
      {
        name: "content",
        label: "Content blocks",
        type: "array",
        itemLabel: "Block",
        allowEmpty: true,
        fields: [text("title", "Title"), area("description", "Description")],
      },
    ],
  },
  {
    key: "brands",
    label: "Brands",
    description: "Logos with brand names.",
    type: "array",
    itemLabel: "Brand",
    fields: [image("image", "Logo"), text("brand", "Brand name")],
  },
  {
    key: "faqs",
    label: "FAQs",
    description: "Questions and answers.",
    type: "array",
    itemLabel: "Question",
    fields: [text("question", "Question"), area("answer", "Answer")],
  },
];

export const SECTION_BY_KEY: Record<string, SectionDef> = Object.fromEntries(
  SECTIONS.map((section) => [section.key, section])
);

/** Services with a hand-built page in ServiceDetail.tsx. Their content is edited here, but the layout is fixed in code. */
export const CUSTOM_LAYOUT_SLUGS = [
  "social-media-marketing",
  "seo-optimisation",
  "logo-design",
  "email-marketing",
  "brand-identity",
  "web-development",
];

/* ---------- value helpers ---------- */

export const asObj = (value: unknown): Obj =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as Obj) : {};

export const asString = (value: unknown): string => (typeof value === "string" ? value : "");

const asList = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

/** A new, empty value for a field (used when adding a section or a list item). */
export function emptyValue(def: FieldBody): unknown {
  switch (def.type) {
    case "array":
    case "strings":
      return [];
    case "select":
      return def.options?.[0] ?? "";
    case "object": {
      const result: Obj = {};
      for (const field of def.fields ?? []) result[field.name] = emptyValue(field);
      return result;
    }
    default:
      return "";
  }
}

/** Does this value hold anything worth showing? (a select on its own does not count) */
export function hasContent(value: unknown): boolean {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.values(value as Obj).some(hasContent);
  return typeof value === "string" ? value.trim() !== "" : Boolean(value);
}

// True when nothing in the value has been filled in. Selects always have a value, so they never count.
function isBlank(def: FieldBody, value: unknown): boolean {
  if (def.type === "select") return true;
  if (def.type === "object") {
    const object = asObj(value);
    return (def.fields ?? []).every((field) => isBlank(field, object[field.name]));
  }
  if (Array.isArray(value)) return value.length === 0;
  return !value;
}

/** Trims text, drops empty paragraphs and fully empty list items, omits empty optional fields. */
export function cleanValue(def: FieldBody, value: unknown): unknown {
  switch (def.type) {
    case "text":
    case "textarea":
    case "image":
      return typeof value === "string" ? value.trim() : "";

    case "select": {
      const options = def.options ?? [];
      return typeof value === "string" && options.includes(value) ? value : options[0] ?? "";
    }

    case "strings":
      return asList(value)
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean);

    case "array": {
      const itemDef: FieldBody = { label: def.label, type: "object", fields: def.fields };
      return asList(value)
        .map((item) => cleanValue(itemDef, item))
        .filter((item) => !isBlank(itemDef, item));
    }

    case "object": {
      const source = asObj(value);
      const result: Obj = {};
      for (const field of def.fields ?? []) {
        const cleaned = cleanValue(field, source[field.name]);
        if (field.optional && cleaned === "") continue;
        result[field.name] = cleaned;
      }
      return result;
    }
  }
}

/** Run on cleaned values. Returns the first problem as a sentence, or null when everything is filled in. */
export function validateValue(def: FieldBody, value: unknown, trail: string): string | null {
  switch (def.type) {
    case "text":
    case "textarea":
    case "image":
      return !def.optional && !value ? `${trail} is required.` : null;

    case "select":
      return null;

    case "strings":
      return !def.optional && asList(value).length === 0 ? `${trail}: add at least one.` : null;

    case "array": {
      const items = asList(value);
      const noun = def.itemLabel ?? "Item";

      if (!def.allowEmpty && items.length === 0) {
        return `${trail}: add at least one ${noun.toLowerCase()}.`;
      }
      for (let index = 0; index < items.length; index++) {
        const item = asObj(items[index]);
        for (const field of def.fields ?? []) {
          const problem = validateValue(field, item[field.name], `${trail} › ${noun} ${index + 1} › ${field.label}`);
          if (problem) return problem;
        }
      }
      return null;
    }

    case "object": {
      const object = asObj(value);
      for (const field of def.fields ?? []) {
        const problem = validateValue(field, object[field.name], `${trail} › ${field.label}`);
        if (problem) return problem;
      }
      return null;
    }
  }
}

const pluralize = (count: number, noun: string): string => `${count} ${noun.toLowerCase()}${count === 1 ? "" : "s"}`;

/** Short text for a collapsed section card, e.g. "4 cards". */
export function summarize(def: FieldBody, value: unknown): string {
  if (def.type === "array") return pluralize(asList(value).length, def.itemLabel ?? "item");
  if (def.type === "image") return value ? "1 image" : "No image yet";

  if (def.type === "object") {
    const object = asObj(value);

    const firstText = (def.fields ?? []).find((field) => field.type === "text" && asString(object[field.name]).trim());
    if (firstText) {
      const title = asString(object[firstText.name]).trim();
      return title.length > SUMMARY_MAX_LENGTH ? `${title.slice(0, SUMMARY_MAX_LENGTH)}…` : title;
    }

    const paragraphs = asList(object.descriptions).length;
    return paragraphs ? pluralize(paragraphs, "paragraph") : "Empty";
  }

  return "";
}