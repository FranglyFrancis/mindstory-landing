import { Schema, model } from "mongoose";

/*
  Matches your IService interface.
  Required: slug, title, description, image (card), order, hero (title, description, image).
  Everything else is an optional section. A section is either absent, or present with its required fields filled.
*/

const req = { type: String, required: true, trim: true };
const opt = { type: String, trim: true, default: "" };
const sub = (def: Record<string, unknown>) => new Schema(def, { _id: false });

const iconItem = sub({ icon: req, title: req, description: req });
const titleDesc = sub({ title: req, description: req });

const serviceSchema = new Schema(
  {
    // ---- IServiceListItem (also what the home page Expertise cards use) ----
    slug: {
      type: String, required: true, unique: true, trim: true, lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug can only use lowercase letters, numbers and hyphens"],
    },
    title: req,
    description: {
      type: String,
      required: false
    },
    image: req,

    // ---- IService: required ----
    order: { type: Number, required: true },
    hero: { type: sub({ title: req, description: req, image: req }), required: true },

    // category listing
    category: { 
      type: String,
      enum: ["web-development", "online-marketing", "brand-identity"],
      required: true,
    },

    // ---- IService: optional sections ----
    mainImage: { type: String, trim: true },
    heading: { type: sub({ title: req, description: opt }), default: undefined },
    intro: { type: sub({ title: req, left: req, right: req }), default: undefined },
    article: {
      type: sub({
        title: opt,
        descriptions: {
          type: [String],
          validate: [(v: string[]) => v.length > 0, "article needs at least one paragraph"],
        },
      }),
      default: undefined,
    },
    lists: { type: [iconItem], default: undefined },
    iconCards: { type: [iconItem], default: undefined },
    titleCards: { type: [titleDesc], default: undefined },
    titleItem: { type: [sub({ title: req, description: req, image: req })], default: undefined },
    imageItem: { type: sub({ image: req, description: req }), default: undefined },
    paraItem: { type: [sub({ description: req })], default: undefined },
    features: {
      type: [
        sub({
          title: opt,
          description: req,
          image: req,
          imagePosition: { type: String, enum: ["left", "right"], required: true },
        }),
      ],
      default: undefined,
    },
    sections: {
      type: [sub({ title: req, image: req, content: { type: [titleDesc], default: [] } })],
      default: undefined,
    },
    brands: { type: [sub({ image: req, brand: req })], default: undefined },
    faqs: { type: [sub({ question: req, answer: req })], default: undefined },

    // sections the admin switched off for the website without deleting their content
    hiddenSections: { type: [String], default: [] },
      // the order the admin arranged the sections in
    sectionOrder: { type: [String], default: [] },
  },

  { timestamps: true }
);

export const Service = model("Service", serviceSchema);
