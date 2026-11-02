import { useMemo } from "react";
import { countLabel, groupByPage, labelForPage, uniquePages } from "./faqHelpers";
import { LIST_HASH } from "./FaqTypes";
import type { Faq, Note, PageOption } from "./FaqTypes";

type FaqListProps = {
  faqs: Faq[];
  options: PageOption[];
  filter: string;
  onFilterChange: (value: string) => void;
  note: Note;
  onDelete: (faq: Faq) => void;
  onAddTo: (page: string) => void;
};

export default function FaqList({ faqs, options, filter, onFilterChange, note, onDelete, onAddTo }: FaqListProps) {
  const pages = useMemo(() => uniquePages(faqs), [faqs]);
  const activePage = pages.includes(filter) ? filter : "all";

  // One group per page; inside a group the questions are numbered 1, 2, 3... by their order value.
  const groups = useMemo(() => groupByPage(faqs, pages, activePage), [faqs, pages, activePage]);
  const shownCount = groups.reduce((total, group) => total + group.items.length, 0);

  const labelFor = (page: string) => labelForPage(options, page);

  return (
    <>
      <div className="fq-head">
        <div>
          <h2>FAQs</h2>
          <p className="ad-sub">
            {countLabel(faqs.length)}
            {activePage !== "all" && ` · showing ${shownCount} on “${labelFor(activePage)}”`}
          </p>
        </div>
        <a className="ad-btn solid" href={`#${LIST_HASH}/new`}>
          + Add FAQ
        </a>
      </div>

      {note && (
        <p className={`ad-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>
          {note.text}
        </p>
      )}

      {pages.length > 1 && (
        <div className="fq-filter">
          <label htmlFor="fq-filter">Show</label>
          <select
            id="fq-filter"
            className="ad-input"
            value={activePage}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All pages</option>
            {pages.map((page) => (
              <option key={page} value={page}>
                {labelFor(page)}
              </option>
            ))}
          </select>
        </div>
      )}

      {faqs.length === 0 ? (
        <div className="ad-card fq-empty">
          <p>No FAQs yet.</p>
          <a className="ad-btn solid" href={`#${LIST_HASH}/new`}>
            + Add your first FAQ
          </a>
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.page} className="fq-group">
            <div className="fq-group-head">
              <h3>
                {labelFor(group.page)}
                <span>{countLabel(group.items.length)}</span>
              </h3>
              <button type="button" className="fq-link" onClick={() => onAddTo(group.page)}>
                + Add question
              </button>
            </div>

            <ul className="fq-list">
              {group.items.map((faq, index) => (
                <li key={faq._id} className="fq-item">
                  <div className="fq-body">
                    <h3>
                      <span className="fq-num" aria-hidden="true">
                        {index + 1}
                      </span>
                      <span className="fq-sr">Question {index + 1}: </span>
                      {faq.question}
                    </h3>
                    <p>{faq.answer}</p>
                    <div className="fq-meta">
                      <span className="fq-chip">{labelFor(faq.page)}</span>
                      <span>Order {faq.order}</span>
                    </div>
                  </div>
                  <div className="fq-item-actions">
                    <a className="ad-btn small" href={`#${LIST_HASH}/edit/${faq._id}`}>
                      Edit
                    </a>
                    <button type="button" className="ad-btn small danger" onClick={() => onDelete(faq)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </>
  );
}