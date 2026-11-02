export type Faq = {
  _id: string;
  page: string;
  question: string;
  answer: string;
  order: number;
};

// The form keeps `order` as text so the field can be empty while typing.
export type Draft = {
  page: string;
  question: string;
  answer: string;
  order: string;
};

export type Note = { ok: boolean; text: string } | null;

export type PageOption = { value: string; label: string; group: string };

export const LIST_HASH = "faqs";

// Fixed pages of the website. Edit these to match your routes.
export const SITE_PAGES: PageOption[] = [
  { value: "home", label: "Home", group: "Site pages" },
  { value: "about", label: "About", group: "Site pages" },
  { value: "services", label: "Services", group: "Site pages" },
  { value: "contact", label: "Contact", group: "Site pages" },
];

export const GROUPS = ["Site pages", "Services", "Other"];

export const draftFromFaq = (faq: Faq): Draft => ({
  page: faq.page,
  question: faq.question,
  answer: faq.answer,
  order: String(faq.order ?? 0),
});