import { SITE_PAGES } from "./faqTypes";
import type { Faq, PageOption } from "./faqTypes";

export const uniquePages = (faqs: Faq[]): string[] =>
  Array.from(new Set(faqs.map((faq) => faq.page))).sort();

/** Site pages + services, plus any older page name already used by an FAQ so it stays visible and editable. */
export function buildPageOptions(faqs: Faq[], serviceOptions: PageOption[]): PageOption[] {
  const known = [...SITE_PAGES, ...serviceOptions];
  const legacy: PageOption[] = uniquePages(faqs)
    .filter((page) => !known.some((option) => option.value === page))
    .map((page) => ({ value: page, label: page, group: "Other" }));

  return [...known, ...legacy];
}

export const labelForPage = (options: PageOption[], page: string): string =>
  options.find((option) => option.value === page)?.label ?? page;

/** The other questions already on a page (leaves out the one being edited). */
export const faqsOnPage = (faqs: Faq[], page: string, excludeId?: string): Faq[] =>
  faqs.filter((faq) => faq.page.trim() === page.trim() && faq._id !== excludeId);

/** Next question number for a page: one more than both the count and the highest number in use. */
export function nextNumberFor(faqs: Faq[], page: string, excludeId?: string): number {
  const onPage = faqsOnPage(faqs, page, excludeId);
  return Math.max(onPage.length, ...onPage.map((faq) => faq.order ?? 0)) + 1;
}

/** One group per page. Inside a group the questions are ordered by their order value (ties keep list order). */
export function groupByPage(faqs: Faq[], pages: string[], activePage: string) {
  return pages
    .filter((page) => activePage === "all" || page === activePage)
    .map((page) => ({
      page,
      items: faqs
        .map((faq, index) => ({ faq, index }))
        .filter((entry) => entry.faq.page === page)
        .sort((a, b) => (a.faq.order ?? 0) - (b.faq.order ?? 0) || a.index - b.index)
        .map((entry) => entry.faq),
    }));
}

export const countLabel = (count: number): string => `${count} ${count === 1 ? "question" : "questions"}`;