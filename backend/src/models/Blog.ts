import { Schema, model, type InferSchemaType } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true }, // uploaded image URL or full web address
    url: { type: String, required: true, trim: true }, // full web address or site path like "/blog/my-post"
    featured: { type: Boolean, default: true }, // shown on the homepage when true
    order: { type: Number, default: 0 }, // lower numbers come first
  },
  { timestamps: true }
);

export type BlogDoc = InferSchemaType<typeof blogSchema>;

export const Blog = model("Blog", blogSchema);