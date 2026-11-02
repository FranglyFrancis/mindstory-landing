import { useMemo } from "react";
import FAQ from "./FAQ";                          // adjust the path to your FAQ component
import { useAllFaqs } from "../../../hooks/useAllFaqs";
import { useServices } from "../../../hooks/useServices";

// same page names as SITE_PAGES in the admin
const SITE_PAGES = [
  { value: "home", label: "Home" },
  { value: "about", label: "About" },
  { value: "services", label: "Services" },
  { value: "contact", label: "Contact" },
];

export default function FaqsPage() {
  const { faqs, status } = useAllFaqs();
  const { services } = useServices();

  const sections = useMemo(() => {
    const pages = [
      ...SITE_PAGES,
      ...services.map((s) => ({ value: s.slug, label: s.cardTitle || s.title })),
    ];
    const known = new Set(pages.map((p) => p.value));
    const extra = [...new Set(faqs.map((f) => f.page))]
      .filter((p) => !known.has(p))
      .map((p) => ({ value: p, label: p }));

    return [...pages, ...extra]
      .map((p) => ({ ...p, items: faqs.filter((f) => f.page === p.value) }))
      .filter((p) => p.items.length > 0);
  }, [faqs, services]);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "error") return <p>Unable to load FAQs right now.</p>;
  if (sections.length === 0) return <p>No FAQs yet.</p>;

  return (
    <>
      <h1>Frequently Asked Questions</h1>
      {sections.map((s) => (
        <div key={s.value} id={s.value}>
          <FAQ faqs={s.items} title={s.label} />
        </div>
      ))}
    </>
  );
}