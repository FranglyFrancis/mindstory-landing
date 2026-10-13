import { API_URL } from "../config";

export interface IFaqItem {
  question: string;
  answer: string;
}

export async function fetchFaqs(page: string): Promise<IFaqItem[]> {
  const res = await fetch(`${API_URL}/api/faqs?page=${encodeURIComponent(page)}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}