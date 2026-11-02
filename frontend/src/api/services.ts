import { request } from "./request";

// What GET /api/services returns for each card. The server leaves out _id here.
export interface IServiceListItem {
  slug: string;
  title: string;
  image: string;
  category: string;
  cardTitle: string;
  cardImage: string;
  description: string;
  order: number;
}

// What GET /api/services/:slug returns: the whole service.
export interface IService extends IServiceListItem {
  _id: string;
  hero: { title: string; description: string; image: string };
  heading?: { title: string; description?: string };
  intro?: { title: string; left: string; right: string };
  article?: { title?: string; descriptions: string[] };
  mainImage?: string;
  lists?: { icon: string; title: string; description: string }[];
  titleCards?: { title: string; description: string }[];
  iconCards?: { icon: string; title: string; description: string }[];
  titleItem?: { title: string; description: string; image: string }[];
  imageItem?: { image: string; description: string };
  paraItem?: { description: string }[];
  features?: {
    title?: string;
    description: string;
    image: string;
    imagePosition: "left" | "right";
  }[];
  sections?: {
    title: string;
    image: string;
    content: { title: string; description: string }[];
  }[];
  brands?: { image: string; brand: string }[];
  faqs?: { question: string; answer: string }[];
  sectionOrder?: string[]; // the order the admin arranged the sections in
  hiddenSections?: string[]; // sections switched off for the website
}

export const fetchServices = (signal?: AbortSignal) => request<IServiceListItem[]>("/api/services", signal);

export const fetchServiceBySlug = (slug: string, signal?: AbortSignal) =>
  request<IService>(`/api/services/${encodeURIComponent(slug)}`, signal);