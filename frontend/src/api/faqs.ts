import { request } from "./request";

export interface IFaqItem {
  question: string;
  answer: string;
}

export const fetchFaqs = (page: string, signal?: AbortSignal) =>
  request<IFaqItem[]>(`/api/faqs?page=${encodeURIComponent(page)}`, signal);