import { API_URL } from "../config";

export interface IServiceListItem {
  _id: string;
  slug: string;
  title: string;
  category: string;
  cardTitle: string;
  description: string;
  cardImage: string;
}

export interface IService extends IServiceListItem {
  order: number;
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
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const fetchServices = () =>
  request<IServiceListItem[]>("/api/services");

export const fetchServiceBySlug = (slug: string) =>
  request<IService>(`/api/services/${slug}`);