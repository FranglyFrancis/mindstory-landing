import { useState } from "react";
import type { FormEvent } from "react";
import { errorMessage } from "./api";
import { faqsOnPage, labelForPage, nextNumberFor } from "./faqHelpers";
import { GROUPS, LIST_HASH } from "./FaqTypes";
import type { Draft, Faq, PageOption } from "./FaqTypes";

const REQUIRED_MESSAGE = "Page, question and answer are all required.";
const NO_PAGE_HINT = "Choose a page and the next question number for it is filled in for you.";

type OrderHintInput = {
  page: string;
  label: string;
  others: number;
  order: string;
  isNew: boolean;
};

function orderHint({ page, label, others, order, isNew }: OrderHintInput): string {
  if (!page) return NO_PAGE_HINT;

  const has = isNew ? "already has" : "has";
  const other = isNew ? "" : "other ";
  const noun = others === 1 ? "question" : "questions";
  const numberText = order ? (isNew ? `This will be number ${order}.` : `This is number ${order}.`) : "";

  return `“${label}” ${has} ${others} ${other}${noun}. ${numberText} Change the number to move it up or down.`;
}

type FaqFormProps = {
  initial: Draft;
  options: PageOption[];
  faqs: Faq[];
  editingId?: string; // undefined when adding a new FAQ
  onSave: (draft: Draft) => Promise<void>;
};

export default function FaqForm({ initial, options, faqs, editingId, onSave }: FaqFormProps) {
  const isNew = editingId === undefined;
  const originalPage = isNew ? "" : initial.page.trim(); // the page this FAQ was on when opened

  const [draft, setDraft] = useState<Draft>(initial);
  const [orderTouched, setOrderTouched] = useState(false); // true once the admin types their own number
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof Draft>(field: K, value: Draft[K]) =>
    setDraft((current) => ({ ...current, [field]: value }));

  // Choosing a page fills in the next question number for that page, until the number is edited by hand.
  function handlePageChange(value: string) {
    const page = value.trim();

    setDraft((current) => {
      let order = current.order;

      if (!orderTouched && page) {
        const changedPage = isNew || page !== originalPage;
        // Back on its own page: keep its number.
        order = changedPage ? String(nextNumberFor(faqs, page, editingId)) : initial.order;
      }
      return { ...current, page: value, order };
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!draft.page.trim() || !draft.question.trim() || !draft.answer.trim()) {
      setError(REQUIRED_MESSAGE);
      return;
    }

    setBusy(true);
    try {
      await onSave(draft);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  const page = draft.page.trim();
  const others = page ? faqsOnPage(faqs, page, editingId).length : 0;
  const hint = orderHint({ page, label: labelForPage(options, page), others, order: draft.order, isNew });

  return (
    <form className="fq-form" onSubmit={handleSubmit}>
      <div className="ad-field">
        <label htmlFor="fq-page">
          Page<span aria-hidden="true">*</span>
        </label>
        <select
          id="fq-page"
          className="ad-input"
          value={draft.page}
          onChange={(e) => handlePageChange(e.target.value)}
        >
          <option value="">Select a page</option>
          {GROUPS.map((group) => {
            const groupOptions = options.filter((option) => option.group === group);
            if (groupOptions.length === 0) return null;

            return (
              <optgroup key={group} label={group}>
                {groupOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>
        <small className="fq-hint">
          Where this FAQ shows on the website. Choose a site page or one of your services.
        </small>
      </div>

      <div className="ad-field">
        <label htmlFor="fq-question">
          Question<span aria-hidden="true">*</span>
        </label>
        <input
          id="fq-question"
          className="ad-input"
          value={draft.question}
          onChange={(e) => update("question", e.target.value)}
        />
      </div>

      <div className="ad-field">
        <label htmlFor="fq-answer">
          Answer<span aria-hidden="true">*</span>
        </label>
        <textarea
          id="fq-answer"
          className="ad-input"
          rows={7}
          value={draft.answer}
          onChange={(e) => update("answer", e.target.value)}
        />
      </div>

      <div className="ad-field fq-order">
        <label htmlFor="fq-order">Question number</label>
        <input
          id="fq-order"
          className="ad-input"
          type="number"
          min={0}
          value={draft.order}
          onChange={(e) => {
            setOrderTouched(true);
            update("order", e.target.value);
          }}
          aria-describedby="fq-order-hint"
        />
        <small id="fq-order-hint" className="fq-hint" aria-live="polite">
          {hint}
        </small>
      </div>

      {error && (
        <p className="ad-note error" role="alert">
          {error}
        </p>
      )}

      <div className="fq-actions">
        <button type="submit" className="ad-btn solid" disabled={busy}>
          {busy ? "Saving…" : "Save FAQ"}
        </button>
        <a className="ad-btn" href={`#${LIST_HASH}`}>
          Cancel
        </a>
      </div>
    </form>
  );
}