const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export interface IFaqItem {
  question: string;
  answer: string;
}

export async function fetchFaqs(page: string): Promise<IFaqItem[]> {
  const res = await fetch(`${API_URL}/api/faqs?page=${encodeURIComponent(page)}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}