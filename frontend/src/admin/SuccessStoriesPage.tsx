import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, KeyboardEvent, ReactNode } from "react";
import { api, clearToken, getToken } from "./api";
import { API_URL } from "../config";
import { imgSrc } from "../utils/imgSrc";
import { usePageCrumb } from "./adminPage";
import type { PageProps } from "./adminPage";
import "./SuccessStoriesPage.css";

type Strategy = { icon: string; title: string; description: string };
type Outcome = { title: string, description: string };
type Story = {
  _id?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  projectName: string;
  projectDescription: string;
  projectHistory: string;
  projectImage: string;
  projectLogo: string;
  impact: string;
  challenges: string;
  strategyOverview: string;
  strategies: Strategy[];
  resultsOverview: string;
  keyOutcomes: Outcome[];
  galleryEnabled: boolean;
  gallery: string[];
};
type Note = { ok: boolean; text: string } | null;

const blank = (): Story => ({
  projectName: "", projectDescription: "", projectHistory: "", projectImage: "", projectLogo: "",
  impact: "", challenges: "", strategyOverview: "", strategies: [],
  resultsOverview: "", keyOutcomes: [], galleryEnabled: false, gallery: [],
});

const REQUIRED: [keyof Story, string][] = [
  ["projectName", "Project Name"],
  ["projectDescription", "Project Description"],
  ["projectHistory", "Project History"],
  ["projectImage", "Project Image"],
  ["projectLogo", "Project Logo"],
  ["impact", "Impact of Mindstory"],
  ["challenges", "Challenges faced"],
  ["strategyOverview", "Strategy and Implementation"],
  ["resultsOverview", "Results and Impact"],
];

const ACCEPT = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024;

const when = (s: Story) => s.updatedAt ?? s.createdAt ?? "";
const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";

/* ---------- icons ---------- */
const Icon = ({ children, size = 20 }: { children: ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const UploadIcon = () => (
  <Icon size={22}><path d="M12 16V5m0 0L8 9m4-4l4 4" /><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></Icon>
);
const PlusIcon = () => (
  <Icon><path d="M12 5v14M5 12h14" /></Icon>
);

/* ---------- small building blocks (unchanged from your form) ---------- */

function Field({ id, label, children, required = true }: { id: string; label: string; children: ReactNode; required?: boolean }) {
  return (
    <div className="ss-field">
      <label htmlFor={id}>{label}{required && <span aria-hidden="true">*</span>}</label>
      {children}
    </div>
  );
}

/**
 * Image upload: click or drag a file onto the box. Shows a preview with Replace / Remove once uploaded.
 * It calls the upload endpoint directly (not through the JSON api helper), so the browser sets the
 * multipart header itself.
 */
function ImageField({
  label, value, onChange, shape,
}: { label?: string; value: string; onChange: (url: string) => void; shape: "wide" | "square" | "icon" | "tile" }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const [err, setErr] = useState("");
  const big = shape === "wide" || shape === "square";

  async function upload(file: File) {
    setErr("");
    if (!ACCEPT.includes(file.type)) return setErr("Use a PNG, JPG, WEBP or GIF image.");
    if (file.size > MAX_BYTES) return setErr("Image must be under 5 MB.");

    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch(`${API_URL}/api/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        clearToken();
        window.dispatchEvent(new Event("admin-unauthorized"));
      }
      if (!res.ok) throw new Error(data.error ?? `Upload failed (${res.status})`);
      onChange(data.url);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  const open = () => fileRef.current?.click();
  const pick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) upload(file);
  };
  const drop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  const name = label ?? "image";

  return (
    <div className={`ss-img ss-img-${shape}`}>
      {label && <span className="ss-label">{label}{shape !== "icon" && <span aria-hidden="true">*</span>}</span>}

      <div
        className={`ss-drop ${over ? "is-over" : ""} ${value ? "has-image" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={drop}
      >
        {value && shape === "icon" && (
          <>
            <button type="button" className="ss-drop-btn" onClick={open} aria-label="Replace icon">
              <img className="ss-thumb" src={imgSrc(value)} alt="" />
            </button>
            <button type="button" className="ss-icon-x" onClick={() => onChange("")} aria-label="Remove icon">✕</button>
          </>
        )}

        {value && big && (
          <>
            <img className="ss-preview" src={imgSrc(value)} alt="" />
            <div className="ss-drop-bar">
              <button type="button" onClick={open}>Replace</button>
              <button type="button" className="remove" onClick={() => onChange("")}>Remove</button>
            </div>
          </>
        )}

        {!value && (
          <button type="button" className="ss-drop-btn" onClick={open} aria-label={`Upload ${name}`}>
            {big ? (
              <>
                <span className="ss-drop-icon"><UploadIcon /></span>
                <span className="ss-drop-title">Click to upload</span>
                <span className="ss-drop-hint">or drag and drop</span>
                <span className="ss-drop-hint">PNG, JPG, WEBP or GIF, up to 5 MB</span>
              </>
            ) : shape === "tile" ? (
              <>
                <PlusIcon />
                <span className="ss-drop-title">Add image</span>
              </>
            ) : (
              <PlusIcon />
            )}
          </button>
        )}

        {busy && (
          <div className="ss-busy" role="status">
            <span className="ss-spin" aria-hidden="true" />
            {big && "Uploading…"}
          </div>
        )}
      </div>

      <input ref={fileRef} type="file" hidden accept={ACCEPT.join(",")} onChange={pick} />
      {err && <small className="ss-err" role="alert">{err}</small>}
    </div>
  );
}

/** A button that opens a panel directly below it. Add keeps the panel open so you can add several in a row. */
function AddPanel<T>({
  buttonLabel, empty, valid, onAdd, children,
}: {
  buttonLabel: string;
  empty: T;
  valid: (draft: T) => boolean;
  onAdd: (draft: T) => void;
  children: (draft: T, setDraft: (d: T) => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<T>(empty);

  const close = () => { setOpen(false); setDraft(empty); };
  const add = () => { if (!valid(draft)) return; onAdd(draft); setDraft(empty); };

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") close();
    if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") {
      e.preventDefault();
      add();
    }
  }

  return (
    <div className="ss-add">
      <button type="button" className="ad-btn" aria-expanded={open} onClick={() => (open ? close() : setOpen(true))}>
        {buttonLabel}
      </button>
      {open && (
        <div className="ss-pop" role="group" aria-label={buttonLabel} onKeyDown={onKeyDown}>
          {children(draft, setDraft)}
          <div className="ss-pop-actions">
            <button type="button" className="ad-btn solid small" disabled={!valid(draft)} onClick={add}>Add</button>
            <button type="button" className="ad-btn small" onClick={close}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================== page =========================== */
/* #stories            -> listing
   #stories/new        -> add form
   #stories/edit/<id>  -> edit form        */

export default function SuccessStoriesPage({ path }: PageProps) {
  const [stories, setStories] = useState<Story[] | null>(null);
  const [note, setNote] = useState<Note>(null);

  const load = useCallback(async () => {
    try {
      setStories(await api<Story[]>("/success-stories"));
    } catch (e: any) {
      setStories((s) => s ?? []);
      setNote({ ok: false, text: e.message });
    }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const adding = path[0] === "new";
  const editId = path[0] === "edit" ? path[1] : undefined;
  const inForm = adding || !!editId;

  // Clear an old message when a form opens (the "saved" message must stay visible on the list).
  useEffect(() => { if (inForm) setNote(null); }, [inForm, editId]);

  const goList = (n?: Note) => {
    if (n) setNote(n);
    window.location.hash = "stories";
  };

  if (adding) return <StoryForm key="new" initial={blank()} reload={load} onDone={goList} />;

  if (editId) {
    if (stories === null) return <p className="ad-sub">Loading…</p>;
    const found = stories.find((s) => s._id === editId);
    if (!found) return <NotFound onBack={() => goList()} />;
    return <StoryForm key={editId} initial={found} reload={load} onDone={goList} />;
  }

  return <StoryList stories={stories} note={note} setNote={setNote} reload={load} />;
}

function NotFound({ onBack }: { onBack: () => void }) {
  usePageCrumb("Edit story");
  return (
    <div className="ss-card ss-empty">
      <p>That story could not be found. It may have been deleted.</p>
      <button type="button" className="ad-btn solid" onClick={onBack}>Back to the list</button>
    </div>
  );
}

/* =========================== listing =========================== */

function StoryList({
  stories, note, setNote, reload,
}: { stories: Story[] | null; note: Note; setNote: (n: Note) => void; reload: () => Promise<void> }) {
  const [busyId, setBusyId] = useState<string | null>(null);

  // Newest first, using updatedAt/createdAt when your API returns them (otherwise the API order is kept).
  const rows = useMemo(() => (stories ? [...stories].sort((a, b) => when(b).localeCompare(when(a))) : []), [stories]);

  const add = () => { window.location.hash = "stories/new"; };
  const edit = (id?: string) => { if (id) window.location.hash = `stories/edit/${id}`; };

  async function remove(s: Story) {
    if (!s._id || !window.confirm(`Delete "${s.projectName}"? This cannot be undone.`)) return;
    setBusyId(s._id);
    setNote(null);
    try {
      await api(`/success-stories/${s._id}`, { method: "DELETE" });
      setNote({ ok: true, text: `${s.projectName} deleted.` });
      await reload();
    } catch (e: any) {
      setNote({ ok: false, text: e.message });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="ss-listpage">
      <div className="ss-head">
        <h2>Success Stories</h2>
        <button type="button" className="ad-btn solid ss-add-btn" onClick={add}>+ Add story</button>
      </div>

      {note && <p className={`ad-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>{note.text}</p>}

      {stories === null && <p className="ad-sub">Loading…</p>}

      {stories && stories.length === 0 && (
        <div className="ss-card ss-empty">
          <p>No success stories yet.</p>
          <button type="button" className="ad-btn solid" onClick={add}>Add your first story</button>
        </div>
      )}

      {stories && stories.length > 0 && (
        <div className="ss-card ss-table-wrap">
          <table className="ss-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Page address</th>
                <th>Strategies</th>
                <th>Key outcomes</th>
                <th>Gallery</th>
                <th>Updated</th>
                <th><span className="ss-sr">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s._id ?? s.projectName}>
                  <td>
                    <div className="ss-cell">
                      {s.projectLogo
                        ? <img className="ss-logo" src={imgSrc(s.projectLogo)} alt="" />
                        : <span className="ss-logo ss-logo-empty" aria-hidden="true">{s.projectName.charAt(0).toUpperCase()}</span>}
                      <div className="ss-cell-text">
                        <strong>{s.projectName}</strong>
                        {s.projectDescription && <span className="ss-clamp">{s.projectDescription}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="ss-muted">{s.slug ? `/project-view/${s.slug}` : "-"}</td>
                  <td>{s.strategies?.length ?? 0}</td>
                  <td>{s.keyOutcomes?.length ?? 0}</td>
                  <td><span className={`ss-pill ${s.galleryEnabled ? "on" : "off"}`}>{s.galleryEnabled ? "On" : "Off"}</span></td>
                  <td>{fmtDate(when(s))}</td>
                  <td>
                    <div className="ss-row-actions">
                      <button type="button" className="ss-link" disabled={busyId === s._id} onClick={() => edit(s._id)}>Edit</button>
                      {s.slug && (
                        <a className="ss-link" href={`/project-view/${s.slug}`} target="_blank" rel="noreferrer">Preview</a>
                      )}
                      <button type="button" className="ss-link danger" disabled={busyId === s._id} onClick={() => remove(s)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* =========================== add / edit form (your original form) =========================== */

function StoryForm({
  initial, reload, onDone,
}: { initial: Story; reload: () => Promise<void>; onDone: (n?: Note) => void }) {
  const [doc, setDoc] = useState<Story>(initial);
  const [note, setNote] = useState<Note>(null);
  const [busy, setBusy] = useState(false);

  usePageCrumb(doc._id ? "Edit story" : "Add story");

  const set = <K extends keyof Story>(key: K, value: Story[K]) =>
    setDoc((d) => ({ ...d, [key]: value }));

  async function save() {
    const missing = REQUIRED.filter(([k]) => !String(doc[k] ?? "").trim()).map(([, label]) => label);
    if (missing.length) return setNote({ ok: false, text: `Fill in: ${missing.join(", ")}` });

    setBusy(true);
    setNote(null);
    try {
      const { _id, ...body } = doc;
      if (_id) await api<Story>(`/success-stories/${_id}`, { method: "PUT", body: JSON.stringify(body) });
      else await api<Story>("/success-stories", { method: "POST", body: JSON.stringify(body) });
      await reload();
      onDone({ ok: true, text: `${doc.projectName} saved. It now appears in the homepage carousel.` });
    } catch (e: any) {
      setNote({ ok: false, text: e.message });
      setBusy(false);
    }
  }

  async function remove() {
    if (!doc._id || !window.confirm(`Delete "${doc.projectName}"?`)) return;
    try {
      await api(`/success-stories/${doc._id}`, { method: "DELETE" });
      await reload();
      onDone({ ok: true, text: `${doc.projectName} deleted.` });
    } catch (e: any) {
      setNote({ ok: false, text: e.message });
    }
  }

  return (
    <section className="ss-main">
      <div className="ss-formhead">
        <h2>{doc._id ? "Edit story" : "Add story"}</h2>
        <button type="button" className="ad-btn" onClick={() => onDone()}>← Back to list</button>
      </div>

      {doc.slug && <p className="ad-sub">Page address: /project-view/{doc.slug}</p>}

      {/* name + description + history | project image | project logo */}
      <div className="ss-top">
        <div>
          <Field id="ss-name" label="Project Name">
            <input id="ss-name" className="ad-input" value={doc.projectName} onChange={(e) => set("projectName", e.target.value)} />
          </Field>
          <Field id="ss-desc" label="Project Description">
            <textarea id="ss-desc" className="ad-input" rows={3} value={doc.projectDescription} onChange={(e) => set("projectDescription", e.target.value)} />
          </Field>
          <Field id="ss-history" label="Project History">
            <textarea id="ss-history" className="ad-input" rows={4} value={doc.projectHistory} onChange={(e) => set("projectHistory", e.target.value)} />
          </Field>
        </div>
        <ImageField shape="wide" label="Project Image" value={doc.projectImage} onChange={(v) => set("projectImage", v)} />
        <ImageField shape="square" label="Project Logo" value={doc.projectLogo} onChange={(v) => set("projectLogo", v)} />
      </div>

      {/* impact | challenges */}
      <div className="ss-two">
        <Field id="ss-impact" label="Impact of Mindstory">
          <textarea id="ss-impact" className="ad-input" rows={6} value={doc.impact} onChange={(e) => set("impact", e.target.value)} />
        </Field>
        <Field id="ss-challenges" label="Challenges faced">
          <textarea id="ss-challenges" className="ad-input" rows={6} value={doc.challenges} onChange={(e) => set("challenges", e.target.value)} />
        </Field>
      </div>

      {/* strategy */}
      <div className="ss-block">
        <Field id="ss-strategy" label="Strategy and Implementation">
          <textarea id="ss-strategy" className="ad-input" rows={3} value={doc.strategyOverview} onChange={(e) => set("strategyOverview", e.target.value)} />
        </Field>

        <AddPanel<Strategy>
          buttonLabel="Add Strategy+"
          empty={{ icon: "", title: "", description: "" }}
          valid={(d) => d.title.trim() !== ""}
          onAdd={(d) => set("strategies", [...doc.strategies, { icon: d.icon, title: d.title.trim(), description: d.description.trim() }])}
        >
          {(d, setD) => (
            <>
              <div className="ss-pop-row">
                <ImageField shape="icon" label="Icon" value={d.icon} onChange={(v) => setD({ ...d, icon: v })} />
                <div className="ss-grow">
                  <Field id="st-title" label="Title">
                    <input id="st-title" className="ad-input" autoFocus value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} />
                  </Field>
                </div>
              </div>
              <div className="ss-pop-desc">
                <Field id="st-desc" label="Description" required={false}>
                  <textarea id="st-desc" className="ad-input" rows={3} value={d.description} onChange={(e) => setD({ ...d, description: e.target.value })} />
                </Field>
              </div>
            </>
          )}
        </AddPanel>

        {doc.strategies.length > 0 && (
          <ul className="ss-items">
            {doc.strategies.map((s, i) => (
              <li key={i}>
                {s.icon && <img src={imgSrc(s.icon)} alt="" />}
                <span>
                  <strong>{s.title}</strong>
                  {s.description && <small>{s.description}</small>}
                </span>
                <button type="button" className="ad-btn small danger" onClick={() => set("strategies", doc.strategies.filter((_, j) => j !== i))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* results */}
      <div className="ss-block">
        <Field id="ss-results" label="Results and Impact">
          <textarea id="ss-results" className="ad-input" rows={3} value={doc.resultsOverview} onChange={(e) => set("resultsOverview", e.target.value)} />
        </Field>

        <AddPanel<Outcome>
          buttonLabel="Add Key Outcomes+"
          empty={{ title: "" , description: ""}}
          valid={(d) => d.title.trim() !== ""}
          onAdd={(d) => set("keyOutcomes", [...doc.keyOutcomes, { title: d.title.trim(), description: d.description.trim() }])}
        >
          {(d, setD) => (
            <>
            <Field id="ko-title" label="Title">
              <input id="ko-title" className="ad-input" autoFocus value={d.title} onChange={(e) => setD({...d, title: e.target.value })} />
            </Field>
            <div className="ss-pop-desc">
                <Field id="st-desc" label="Description" required={false}>
                  <textarea id="st-desc" className="ad-input" rows={3} value={d.description} onChange={(e) => setD({ ...d, description: e.target.value })} />
                </Field>
            </div>
            </>
          )}
        </AddPanel>

        {doc.keyOutcomes.length > 0 && (
          <ul className="ss-items">
            {doc.keyOutcomes.map((o, i) => (
              <li key={i}>
                <span>
                  <strong>{o.title}</strong>
                  {o.description && <small>{o.description}</small>}
                </span>

                <button type="button" className="ad-btn small danger" onClick={() => set("keyOutcomes", doc.keyOutcomes.filter((_, j) => j !== i))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* gallery */}
      <div className="ss-block">
        <div className="ss-gallery-head">
          <span className="ss-heading">Gallery</span>
          <label className="ss-switch">
            <input type="checkbox" role="switch" checked={doc.galleryEnabled} onChange={(e) => set("galleryEnabled", e.target.checked)} />
            <span className="ss-switch-track" aria-hidden="true" />
            <span className="ss-sr">Show gallery on the project page</span>
          </label>
        </div>

        {doc.galleryEnabled && (
          <div className="ss-gallery">
            {doc.gallery.map((g, i) => (
              <div key={i} className="ss-tile">
                <img src={imgSrc(g)} alt="" />
                <button type="button" className="ss-tile-x" aria-label="Remove image" onClick={() => set("gallery", doc.gallery.filter((_, j) => j !== i))}>✕</button>
              </div>
            ))}
            <ImageField shape="tile" value="" onChange={(u) => u && set("gallery", [...doc.gallery, u])} />
          </div>
        )}
      </div>

      <div className="ss-savebar">
        <button className="ad-btn solid" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</button>
        <button className="ad-btn" onClick={() => onDone()} disabled={busy}>Cancel</button>
        {doc._id && <button className="ad-btn danger" onClick={remove} disabled={busy}>Delete</button>}
        {note && <span className={`ss-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>{note.text}</span>}
      </div>
    </section>
  );
}
