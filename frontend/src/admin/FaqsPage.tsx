import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { api } from "./api";
import { PageCrumbContext } from "./adminPage";
import type { PageProps } from "./adminPage";
import "./FaqsPage.css";

type Faq = { _id: string; page: string; question: string; answer: string; order: number };
type Draft = { page: string; question: string; answer: string; order: string };
type Note = { ok: boolean; text: string } | null;

/* ---------- add / edit form ---------- */

function FaqForm({
  initial, pages, onSave,
}: { initial: Draft; pages: string[]; onSave: (d: Draft) => Promise<void> }) {
  const [d, setD] = useState<Draft>(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr("");
    if (!d.page.trim() || !d.question.trim() || !d.answer.trim()) {
      return setErr("Page, question and answer are all required.");
    }
    setBusy(true);
    try {
      await onSave(d);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="fq-form" onSubmit={submit}>
      <div className="ad-field">
        <label htmlFor="fq-page">Page<span aria-hidden="true">*</span></label>
        <input
          id="fq-page"
          className="ad-input"
          list="fq-pages"
          value={d.page}
          onChange={(e) => setD({ ...d, page: e.target.value })}
          autoComplete="off"
        />
        <datalist id="fq-pages">
          {pages.map((p) => <option key={p} value={p} />)}
        </datalist>
        <small className="fq-hint">
          Where this FAQ shows on the website. It must match the name that page asks for, for example <code>home</code>. Pick an existing one or type a new one.
        </small>
      </div>

      <div className="ad-field">
        <label htmlFor="fq-question">Question<span aria-hidden="true">*</span></label>
        <input id="fq-question" className="ad-input" value={d.question} onChange={(e) => setD({ ...d, question: e.target.value })} />
      </div>

      <div className="ad-field">
        <label htmlFor="fq-answer">Answer<span aria-hidden="true">*</span></label>
        <textarea id="fq-answer" className="ad-input" rows={7} value={d.answer} onChange={(e) => setD({ ...d, answer: e.target.value })} />
      </div>

      <div className="ad-field fq-order">
        <label htmlFor="fq-order">Order</label>
        <input id="fq-order" className="ad-input" type="number" value={d.order} onChange={(e) => setD({ ...d, order: e.target.value })} />
        <small className="fq-hint">Lower numbers show first. Leave 0 to keep the order you added them in.</small>
      </div>

      {err && <p className="ad-note error" role="alert">{err}</p>}

      <div className="fq-actions">
        <button className="ad-btn solid" disabled={busy}>{busy ? "Saving…" : "Save FAQ"}</button>
        <a className="ad-btn" href="#faqs">Cancel</a>
      </div>
    </form>
  );
}

/* ---------- listing ---------- */

function FaqList({
  faqs, filter, setFilter, note, onDelete,
}: {
  faqs: Faq[];
  filter: string;
  setFilter: (v: string) => void;
  note: Note;
  onDelete: (f: Faq) => void;
}) {
  const pages = useMemo(() => Array.from(new Set(faqs.map((f) => f.page))).sort(), [faqs]);
  const active = pages.includes(filter) ? filter : "all";
  const shown = active === "all" ? faqs : faqs.filter((f) => f.page === active);

  return (
    <>
      <div className="fq-head">
        <div>
          <h2>FAQs</h2>
          <p className="ad-sub">
            {faqs.length} {faqs.length === 1 ? "question" : "questions"}
            {active !== "all" && ` · showing ${shown.length} on “${active}”`}
          </p>
        </div>
        <a className="ad-btn solid" href="#faqs/new">+ Add FAQ</a>
      </div>

      {note && <p className={`ad-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>{note.text}</p>}

      {pages.length > 1 && (
        <div className="fq-filter">
          <label htmlFor="fq-filter">Show</label>
          <select id="fq-filter" className="ad-input" value={active} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All pages</option>
            {pages.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      )}

      {faqs.length === 0 ? (
        <div className="ad-card fq-empty">
          <p>No FAQs yet.</p>
          <a className="ad-btn solid" href="#faqs/new">+ Add your first FAQ</a>
        </div>
      ) : (
        <ul className="fq-list">
          {shown.map((f) => (
            <li key={f._id} className="fq-item">
              <div className="fq-body">
                <h3>{f.question}</h3>
                <p>{f.answer}</p>
                <div className="fq-meta">
                  <span className="fq-chip">{f.page}</span>
                  <span>Order {f.order}</span>
                </div>
              </div>
              <div className="fq-item-actions">
                <a className="ad-btn small" href={`#faqs/edit/${f._id}`}>Edit</a>
                <button type="button" className="ad-btn small danger" onClick={() => onDelete(f)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/* ---------- page ---------- */

export default function FaqsPage({ path }: PageProps) {
  const setCrumb = useContext(PageCrumbContext);
  const [faqs, setFaqs] = useState<Faq[] | null>(null);
  const [note, setNote] = useState<Note>(null);
  const [filter, setFilter] = useState("all");

  // #faqs -> list, #faqs/new -> add form, #faqs/edit/<id> -> edit form
  const mode = path[0] === "new" ? "new" : path[0] === "edit" && path[1] ? "edit" : "list";
  const editId = mode === "edit" ? path[1] : undefined;

  const load = useCallback(async () => {
    try {
      setFaqs(await api<Faq[]>("/faqs"));
    } catch (e: any) {
      setNote({ ok: false, text: e.message });
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // extra breadcrumb: Dashboard / FAQs / Add FAQ
  useEffect(() => {
    setCrumb?.(mode === "new" ? "Add FAQ" : mode === "edit" ? "Edit FAQ" : null);
    if (mode !== "list") setNote(null);
    return () => setCrumb?.(null);
  }, [mode, setCrumb]);

  async function save(id: string | undefined, d: Draft) {
    const body = {
      page: d.page.trim(),
      question: d.question.trim(),
      answer: d.answer.trim(),
      order: Number(d.order) || 0,
    };
    if (id) await api(`/faqs/${id}`, { method: "PUT", body: JSON.stringify(body) });
    else await api("/faqs", { method: "POST", body: JSON.stringify(body) });

    await load();
    setNote({ ok: true, text: id ? "FAQ updated." : "FAQ added." });
    window.location.hash = "faqs";
  }

  async function remove(f: Faq) {
    if (!window.confirm(`Delete this FAQ?\n\n${f.question}`)) return;
    try {
      await api(`/faqs/${f._id}`, { method: "DELETE" });
      setNote({ ok: true, text: "FAQ deleted." });
      await load();
    } catch (e: any) {
      setNote({ ok: false, text: e.message });
    }
  }

  if (!faqs) {
    return note ? (
      <div className="ad-page">
        <p className="ad-note error" role="alert">{note.text}</p>
        <button className="ad-btn" onClick={() => { setNote(null); load(); }}>Try again</button>
      </div>
    ) : (
      <p className="ad-sub" role="status">Loading…</p>
    );
  }

  const pages = Array.from(new Set(faqs.map((f) => f.page))).sort();

  if (mode === "new") {
    return (
      <div className="ad-page fq-page">
        <h2>Add FAQ</h2>
        <FaqForm
          key="new"
          pages={pages}
          initial={{ page: filter !== "all" ? filter : "", question: "", answer: "", order: "0" }}
          onSave={(d) => save(undefined, d)}
        />
      </div>
    );
  }

  if (mode === "edit") {
    const faq = faqs.find((f) => f._id === editId);
    if (!faq) {
      return (
        <div className="ad-page fq-page">
          <h2>FAQ not found</h2>
          <p className="ad-sub">It may have been deleted.</p>
          <a className="ad-btn" href="#faqs">Back to FAQs</a>
        </div>
      );
    }
    return (
      <div className="ad-page fq-page">
        <h2>Edit FAQ</h2>
        <FaqForm
          key={faq._id}
          pages={pages}
          initial={{ page: faq.page, question: faq.question, answer: faq.answer, order: String(faq.order ?? 0) }}
          onSave={(d) => save(faq._id, d)}
        />
      </div>
    );
  }

  return (
    <div className="ad-page">
      <FaqList faqs={faqs} filter={filter} setFilter={setFilter} note={note} onDelete={remove} />
    </div>
  );
}
