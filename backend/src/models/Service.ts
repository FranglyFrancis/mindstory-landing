import { Schema, model } from "mongoose";

export const SERVICE_CATEGORIES = ["web-development", "online-marketing", "brand-identity"] as const;
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Reusable field definitions
const requiredText = { type: String, required: true, trim: true };
const optionalText = { type: String, trim: true, default: "" };

// A nested object without its own _id
const subSchema = (definition: Record<string, unknown>) => new Schema(definition, { _id: false });

const iconItem = subSchema({ icon: requiredText, title: requiredText, description: requiredText });
const titleDescription = subSchema({ title: requiredText, description: requiredText });

const serviceSchema = new Schema(
  {
    // ---- List item (also what the home page Expertise cards use) ----
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [SLUG_PATTERN, "slug can only use lowercase letters, numbers and hyphens"],
    },
    title: { type: String, trim: true, required: true },
    image: { type: String, trim: true, required: true },
    order: { type: Number, required: true },

    // ---- Category listing ----
    category: { type: String, enum: SERVICE_CATEGORIES, required: true },

    // ---- Service card details ----
    cardTitle: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    cardImage: { type: String, trim: true, required: true },

    // ---- Required hero ----
    hero: {
      type: subSchema({ title: requiredText, description: requiredText, image: requiredText }),
      required: true,
    },

    // ---- Optional sections ----
    mainImage: { type: String, trim: true },
    heading: { type: subSchema({ title: requiredText, description: optionalText }), default: undefined },
    intro: {
      type: subSchema({ title: requiredText, left: requiredText, right: requiredText }),
      default: undefined,
    },
    article: {
      type: subSchema({
        title: optionalText,
        descriptions: {
          type: [String],
          validate: [(value: string[]) => value.length > 0, "article needs at least one paragraph"],
        },
      }),
      default: undefined,
    },
    lists: { type: [iconItem], default: undefined },
    iconCards: { type: [iconItem], default: undefined },
    titleCards: { type: [titleDescription], default: undefined },
    titleItem: {
      type: [subSchema({ title: requiredText, description: requiredText, image: requiredText })],
      default: undefined,
    },
    imageItem: { type: subSchema({ image: requiredText, description: requiredText }), default: undefined },
    paraItem: { type: [subSchema({ description: requiredText })], default: undefined },
    features: {
      type: [
        subSchema({
          title: optionalText,
          description: requiredText,
          image: requiredText,
          imagePosition: { type: String, enum: ["left", "right"], required: true },
        }),
      ],
      default: undefined,
    },
    sections: {
      type: [
        subSchema({
          title: requiredText,
          image: requiredText,
          content: { type: [titleDescription], default: [] },
        }),
      ],
      default: undefined,
    },
    brands: { type: [subSchema({ image: requiredText, brand: requiredText })], default: undefined },
    faqs: { type: [subSchema({ question: requiredText, answer: requiredText })], default: undefined },

    // ---- Admin layout ----
    // Sections the admin switched off for the website without deleting their content
    hiddenSections: { type: [String], default: [] },
    // The order the admin arranged the sections in
    sectionOrder: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Service = model("Service", serviceSchema);