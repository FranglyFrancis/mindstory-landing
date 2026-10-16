import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }, // short summary shown on the card
    image: { type: String, required: true, trim: true },       // Cloudinary address
    url: { type: String, required: true, trim: true },         // where the card links to
    featured: { type: Boolean, default: true },                // show in the home page "Featured Blogs" section
    order: { type: Number, default: 0 },                       // lower numbers show first
  },
  { timestamps: true }
);

export const Blog = model("Blog", blogSchema);
