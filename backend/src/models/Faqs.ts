import { Schema, model } from "mongoose";

export interface IFaq {
  page: string; // "home", "contact", or a service slug
  question: string;
  answer: string;
  order: number; // lower numbers come first
}

const faqSchema = new Schema<IFaq>(
  {
    page: { type: String, required: true, trim: true, index: true },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Faq = model<IFaq>("Faq", faqSchema);