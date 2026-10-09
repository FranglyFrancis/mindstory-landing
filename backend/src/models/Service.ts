import { Schema, model } from "mongoose";

export interface ISectionItem {
  title: string;
  description: string;
}

export interface ISection {
  title: string;
  image: string;
  content: ISectionItem[];
}

export interface ITitleItem {
    title: string;
    description: string;
    image: string;
}

export interface IImageItem {
  image: string;
  description: string;
}

export interface IListItem {
  icon: string;
  title: string;
  description: string;
}

export interface IService {
  slug: string;
  title: string;
  description: string;
  image: string;
  order: number;
  hero: { title: string; description: string; image: string };

  heading?: { title: string; description?: string };
  intro?: { title: string; left: string; right: string };
  article?: { heading?: string; paragraphs: string[] };
  summary?: string;
  mainImage?: string;
  lists?: IListItem[];
  titleCards?: ISectionItem[];
  iconCards?: IListItem[];
  titleItem?: ITitleItem[];
  imageItem?: IImageItem;
  features?: {
    title?: string;
    description: string;
    image: string;
    imagePosition: "left" | "right";
  }[];
  sections?: ISection[];
  brands?: { image: string; brand: string }[];
  faqs?: { question: string; answer: string }[];
}

const serviceSchema = new Schema<IService>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: String,
  image: String,
  order: { type: Number, default: 0 },
  hero: { title: String, description: String, image: String },

  heading: { title: String, description: String },
  intro: { title: String, left: String, right: String },
  article: { heading: String, paragraphs: [String] },
  summary: String,
  mainImage: String,
  lists: [{ icon: String, title: String, description: String }],
  titleCards: [{ title: String, description: String }],
  iconCards: [{ icon: String, title: String, description: String }],
  titleItem: [ { title:String, image: String, description: String } ],
  imageItem: { image:String, description:String },
  features: [
    {
      title: String,
      description: String,
      image: String,
      imagePosition: { type: String, enum: ["left", "right"] },
    },
  ],
  sections: [
    {
      title: String,
      image: String,
      content: [{ title: String, description: String }],
    },
  ],
  brands: [{ image: String, brand: String }],
  faqs: [{ question: String, answer: String }],
});

export const Service = model<IService>("Service", serviceSchema);