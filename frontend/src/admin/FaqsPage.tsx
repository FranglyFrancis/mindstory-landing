import { useCallback, useEffect, useMemo, useState } from "react";
import { api, errorMessage } from "./api";
import { usePageCrumb } from "./adminPage";
import type { PageProps } from "./adminPage";
import FaqForm from "./FaqForm";
import FaqList from "./FaqList";
import { buildPageOptions, nextNumberFor } from "./faqHelpers";
import { LIST_HASH, draftFromFaq } from "./FaqTypes";
import type { Draft, Faq, Note, PageOption } from "./FaqTypes";
import "./FaqsPage.css";
import "./FaqsNumbering.css"; // keep this after FaqsPage.css

type Mode = "list" | "new" | "edit";

type ServiceSummary = { slug: string; title: string };

// Extra breadcrumb: Dashboard / FAQs / Add FAQ
const CRUMB_LABELS: Record<Mode, string | null> = {
  list: null,
  new: "Add FAQ",
  edit: "Edit FAQ",
};

// #faqs -> list, #faqs/new -> add form, #faqs/edit/<id> -> edit form
function getMode(path: string[]): Mode {
  if (path[0] === "new") return "new";
  if (path[0] === "edit" && path[1]) return "edit";
  return "list";
}

const toRequestBody = (draft: Draft) => ({
  page: draft.page.trim(),
  question: draft.question.trim(),
  answer: draft.answer.trim(),
  order: Number(draft.order) || 0,
});

export default function FaqsPage({ path }: PageProps) {
  const [faqs, setFaqs] = useState<Faq[] | null>(null);
  const [note, setNote] = useState<Note>(null);
  const [filter, setFilter] = useState("all");
  const [addFor, setAddFor] = useState(""); // the page whose "+ Add question" was clicked
  const [serviceOptions, setServiceOptions] = useState<PageOption[]>([]);

  const mode = getMode(path);
  const editId = mode === "edit" ? path[1] : undefined;

  usePageCrumb(CRUMB_LABELS[mode]);

  const load = useCallback(async () => {
    try {
      setFaqs(await api<Faq[]>("/faqs"));
    } catch (e) {
      setNote({ ok: false, text: errorMessage(e) });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // The services created in the admin become page choices (the slug is the page name).
  useEffect(() => {
    let cancelled = false;

    api<ServiceSummary[]>("/service-pages")
      .then((services) => {
        if (cancelled) return;
        setServiceOptions(
          services.map((service) => ({ value: service.slug, label: service.title, group: "Services" }))
        );
      })
      .catch(() => {
        /* the dropdown still shows the site pages */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Opening a form clears any old message; going back to the list clears the "add to this page" choice.
  useEffect(() => {
    if (mode !== "list") setNote(null);
    else setAddFor("");
  }, [mode]);

  const pageOptions = useMemo(() => buildPageOptions(faqs ?? [], serviceOptions), [faqs, serviceOptions]);

  async function save(id: string | undefined, draft: Draft) {
    const body = JSON.stringify(toRequestBody(draft));

    if (id) await api(`/faqs/${id}`, { method: "PUT", body });
    else await api("/faqs", { method: "POST", body });

    await load();
    setNote({ ok: true, text: id ? "FAQ updated." : "FAQ added." });
    window.location.hash = LIST_HASH;
  }

  async function remove(faq: Faq) {
    if (!window.confirm(`Delete this FAQ?\n\n${faq.question}`)) return;

    try {
      await api(`/faqs/${faq._id}`, { method: "DELETE" });
      setNote({ ok: true, text: "FAQ deleted." });
      await load();
    } catch (e) {
      setNote({ ok: false, text: errorMessage(e) });
    }
  }

  function addQuestionTo(page: string) {
    setAddFor(page);
    window.location.hash = `${LIST_HASH}/new`;
  }

  if (!faqs) {
    return note ? (
      <div className="ad-page">
        <p className="ad-note error" role="alert">
          {note.text}
        </p>
        <button
          type="button"
          className="ad-btn"
          onClick={() => {
            setNote(null);
            load();
          }}
        >
          Try again
        </button>
      </div>
    ) : (
      <p className="ad-sub" role="status">
        Loading…
      </p>
    );
  }

  if (mode === "new") {
    const startPage = addFor || (filter !== "all" ? filter : "");
    const initial: Draft = {
      page: startPage,
      question: "",
      answer: "",
      order: startPage ? String(nextNumberFor(faqs, startPage)) : "",
    };

    return (
      <div className="ad-page fq-page">
        <h2>Add FAQ</h2>
        <FaqForm key="new" initial={initial} options={pageOptions} faqs={faqs} onSave={(draft) => save(undefined, draft)} />
      </div>
    );
  }

  if (mode === "edit") {
    const faq = faqs.find((item) => item._id === editId);

    if (!faq) {
      return (
        <div className="ad-page fq-page">
          <h2>FAQ not found</h2>
          <p className="ad-sub">It may have been deleted.</p>
          <a className="ad-btn" href={`#${LIST_HASH}`}>
            Back to FAQs
          </a>
        </div>
      );
    }

    return (
      <div className="ad-page fq-page">
        <h2>Edit FAQ</h2>
        <FaqForm
          key={faq._id}
          initial={draftFromFaq(faq)}
          options={pageOptions}
          faqs={faqs}
          editingId={faq._id}
          onSave={(draft) => save(faq._id, draft)}
        />
      </div>
    );
  }

  return (
    <div className="ad-page">
      <FaqList
        faqs={faqs}
        options={pageOptions}
        filter={filter}
        onFilterChange={setFilter}
        note={note}
        onDelete={remove}
        onAddTo={addQuestionTo}
      />
    </div>
  );
}