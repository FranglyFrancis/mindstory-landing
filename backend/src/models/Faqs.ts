import { Schema, model } from "mongoose";

export interface IFaq {
  page: string; // "home", "contact", ...
  question: string;
  answer: string;
  order: number;
}

const faqSchema = new Schema<IFaq>({
  page: { type: String, required: true, index: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
});

export const Faq = model<IFaq>("Faq", faqSchema);