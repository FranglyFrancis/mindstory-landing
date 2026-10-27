import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import ImageUpload from "./ImageUpload";
import ServiceField from "./ServiceField";
import { imgSrc } from "../utils/imgSrc";
import { usePageCrumb, PageProps } from "./adminPage";
import {
  CUSTOM_LAYOUT_SLUGS, HERO, SECTIONS, SECTION_BY_KEY,
  asObj, cleanValue, emptyValue, hasContent, summarize, validateValue,
} from "./serviceSections";
import "./ServicesAdmin.css";
import { SERVICE_CATEGORIES } from "../utils/serviceCategories";

type Obj = Record<string, unknown>;
type Note = { ok: boolean; text: string } | null;

/** One row of the listing (the full document is loaded when you open Edit). */
type Row = {
  _id: string; slug: string; title: string;  image: string; order: number;
  category?: string; cardTitle?: string; description: string; cardImage: string;
  sectionCount: number; updatedAt?: string; 
};
type Doc = {
  _id: string; slug: string; title: string; image: string; order: number;
  category?: string; cardTitle?: string; cardImage: string; description: string;
  hero: Obj; sectionOrder?: string[]; hiddenSections?: string[];
  [section: string]: unknown; 
};

const BASE = "/service-pages";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const slugify = (s: string) =>
  s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";


/* =========================== page =========================== */
export default function ServicesPage({ path }: PageProps) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [note, setNote] = useState<Note>(null);

  const load = useCallback(async () => {
    try {
      setRows(await api<Row[]>(BASE));
    } catch (e: any) {
      setRows((r) => r ?? []);
      setNote({ ok: false, text: e.message });
    }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const adding = path[0] === "new";
  const editId = path[0] === "edit" ? path[1] : undefined;
  const inForm = adding || !!editId;

  useEffect(() => { if (inForm) setNote(null); }, [inForm, editId]);

  const goList = (n?: Note) => {
    if (n) setNote(n);
    window.location.hash = "services";
  };

  if (inForm) {
    if (rows === null) return <p className="ad-sub" role="status">Loading…</p>;
    const nextOrder = rows.reduce((m, r) => Math.max(m, r.order ?? 0), 0) + 1;
    return <ServiceEditor key={editId ?? "new"} id={editId} nextOrder={nextOrder} reload={load} onDone={goList} />;
  }

  return <ServiceList rows={rows} note={note} setNote={setNote} reload={load} />;
}

/* =========================== listing =========================== */

function ServiceList({
  rows, note, setNote, reload,
}: { rows: Row[] | null; note: Note; setNote: (n: Note) => void; reload: () => Promise<void> }) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const sorted = useMemo(() => (rows ? [...rows].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : []), [rows]);

  const add = () => { window.location.hash = "services/new"; };

  async function remove(r: Row) {
    const extra = CUSTOM_LAYOUT_SLUGS.includes(r.slug) ? "\n\nThis service has a hand-built page, which will stop working." : "";
    if (!window.confirm(`Delete "${r.title}"? This cannot be undone.${extra}`)) return;
    setBusyId(r._id);
    setNote(null);
    try {
      await api(`${BASE}/${r._id}`, { method: "DELETE" });
      setNote({ ok: true, text: `${r.title} deleted.` });
      await reload();
    } catch (e: any) {
      setNote({ ok: false, text: e.message });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="sv-page">
      <div className="sv-head">
        <div>
          <h2>Services</h2>
          <p className="ad-sub sv-sub">{rows === null ? "Loading…" : `${rows.length} ${rows.length === 1 ? "service" : "services"}. Shown in the Expertise section, in this order.`}</p>
        </div>
        <button type="button" className="ad-btn solid sv-add-btn" onClick={add}>+ Add service</button>
      </div>

      {note && <p className={`ad-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>{note.text}</p>}

      {rows && rows.length === 0 && (
        <div className="sv-card sv-empty">
          <p>No services yet.</p>
          <button type="button" className="ad-btn solid" onClick={add}>Add your first service</button>
        </div>
      )}

      {rows && rows.length > 0 && (
        <div className="sv-card sv-table-wrap">
          <table className="sv-table">
            <thead>
              <tr>
                <th>Service</th><th>Page address</th><th>Sections</th><th>Order</th><th>Updated</th>
                <th><span className="sv-sr">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r._id}>
                  <td>
                    <div className="sv-cell">
                      {r.image ? <img className="sv-thumb" src={imgSrc(r.image)} alt="" loading="lazy" /> : <span className="sv-thumb" aria-hidden="true" />}
                      <div className="sv-cell-text">
                        <strong>{r.title}</strong>
                        {r.description && <span className="sv-clamp">{r.description}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="sv-muted">/services/{r.slug}</td>
                  <td>{r.sectionCount}{CUSTOM_LAYOUT_SLUGS.includes(r.slug) && <span className="sv-tag" title="Hand-built page layout">Custom</span>}</td>
                  <td>{r.order}</td>
                  <td className="sv-muted">{fmtDate(r.updatedAt)}</td>
                  <td>
                    <div className="sv-row-actions">
                      <button type="button" className="sv-link" disabled={busyId === r._id} onClick={() => { window.location.hash = `services/edit/${r._id}`; }}>Edit</button>
                      <a className="sv-link" href={`/services/${r.slug}`} target="_blank" rel="noreferrer">Preview</a>
                      <button type="button" className="sv-link danger" disabled={busyId === r._id} onClick={() => remove(r)}>Delete</button>
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

/* =========================== add / edit =========================== */

function ServiceEditor({
  id, nextOrder, reload, onDone,
}: { id?: string; nextOrder: number; reload: () => Promise<void>; onDone: (n?: Note) => void }) {
  usePageCrumb(id ? "Edit service" : "Add service");

  const [loading, setLoading] = useState(!!id);
  const [loadError, setLoadError] = useState("");
  const [origSlug, setOrigSlug] = useState("");

  // service details (what the Expertise card shows)
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
 
  const [image, setImage] = useState("");
  const [order, setOrder] = useState(String(nextOrder));
  const [cardTitle, setCardTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cardImage, setCardImage] = useState("");


  // page content
  const [hero, setHero] = useState<Obj>(() => emptyValue(HERO) as Obj);
  const [values, setValues] = useState<Obj>({});         // section key -> content
  const [keys, setKeys] = useState<string[]>([]);        // sections on the page, in order
  const [hidden, setHidden] = useState<string[]>([]);    // switched off for the website (content is kept)
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [focusKey, setFocusKey] = useState<string | null>(null);

  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  const custom = CUSTOM_LAYOUT_SLUGS.includes(origSlug);

  /* ---------- load an existing service ---------- */
  useEffect(() => {
    if (!id) return;
    let off = false;
    api<Doc>(`${BASE}/${id}`)
      .then((d) => {
        if (off) return;
        setOrigSlug(d.slug);
        setTitle(d.title ?? "");
        setSlug(d.slug ?? "");
        setSlugTouched(true);
        setImage(d.image ?? "");
        setCategory(d.category ?? "");
        setCardTitle(d.cardTitle ?? "");
        setDescription(d.description ?? "");
        setCardImage(d.cardImage ?? "");
        setOrder(String(d.order ?? 0));
        setHero({ ...(emptyValue(HERO) as Obj), ...asObj(d.hero) });

        // sections that have content, in the saved order (the rest follow in the website's default order)
        const present = SECTIONS.map((s) => s.key).filter((k) => hasContent(d[k]));
        const saved = (d.sectionOrder ?? []).filter((k) => present.includes(k));
        const ordered = [...saved, ...present.filter((k) => !saved.includes(k))];
        setKeys(ordered);
        setValues(Object.fromEntries(ordered.map((k) => [k, d[k]])));
        setHidden((d.hiddenSections ?? []).filter((k) => ordered.includes(k)));
      })
      .catch((e) => { if (!off) setLoadError(e.message); })
      .finally(() => { if (!off) setLoading(false); });
    return () => { off = true; };
  }, [id]);

  // bring a newly added (or invalid) section into view
  useEffect(() => {
    if (!focusKey) return;
    const card = document.getElementById(`sv-sec-${focusKey}`);
    if (card) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      card.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      (card.querySelector("input,textarea,select") as HTMLElement | null)?.focus({ preventScroll: true });
    }
    setFocusKey(null);
  }, [focusKey]);

  /* ---------- section actions ---------- */
  const addSection = (key: string) => {
    if (keys.includes(key)) return;
    setKeys((k) => [...k, key]);
    setValues((v) => ({ ...v, [key]: v[key] ?? emptyValue(SECTION_BY_KEY[key]) }));
    setOpen((o) => ({ ...o, [key]: true }));
    setFocusKey(key);
  };

  const removeSection = (key: string) => {
    const def = SECTION_BY_KEY[key];
    if (hasContent(values[key]) && !window.confirm(`Remove "${def.label}"? Its content is deleted when you save.\n\nTo keep it but hide it on the website, use "Show on website" instead.`)) return;
    setKeys((k) => k.filter((x) => x !== key));
    setHidden((h) => h.filter((x) => x !== key));
    setValues((v) => { const { [key]: _gone, ...rest } = v; return rest; });
  };

  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= keys.length) return;
    setKeys((k) => { const n = [...k]; [n[i], n[j]] = [n[j], n[i]]; return n; });
  };

  const toggleShown = (key: string) =>
    setHidden((h) => (h.includes(key) ? h.filter((x) => x !== key) : [...h, key]));

  /* ---------- save ---------- */
  async function save() {
    const fail = (m: string) => { setErr(m); return; };
    setErr("");

    const t = title.trim();
    const sl = slug.trim();
    if (!t) return fail("Enter the service name.");
    if (!SLUG_RE.test(sl)) return fail("The page address can only use lowercase letters, numbers and hyphens.");
    if (!image) return fail("Upload the card image.");
    if (!Number.isFinite(Number(order))) return fail("Order must be a number.");
    
    if (!category) return fail("Choose the navbar category.");
    if (!description.trim()) return fail("Enter the short description shown on the service card.");
    if (!cardTitle.trim()) return fail("Enter the Service Card title.");
    if (!cardImage.trim()) return fail("Upload the card image.");

    const heroClean = cleanValue(HERO, hero);
    const heroProblem = validateValue(HERO, heroClean, "Hero banner");
    if (heroProblem) return fail(heroProblem);
    

    const body: Obj = {
      title: t, slug: sl,  image, order: Number(order),
      category, cardTitle: cardTitle.trim(), description: description.trim(), cardImage,
      hero: heroClean, sectionOrder: keys, hiddenSections: hidden.filter((k) => keys.includes(k)),
    };
    for (const k of keys) {
      const def = SECTION_BY_KEY[k];
      const cleaned = cleanValue(def, values[k]);
      const problem = validateValue(def, cleaned, def.label);
      if (problem) {
        setOpen((o) => ({ ...o, [k]: true }));
        setFocusKey(k);
        return fail(problem);
      }
      body[k] = cleaned;
    }

    setSaving(true);
    try {
      if (id) await api(`${BASE}/${id}`, { method: "PUT", body: JSON.stringify(body) });
      else await api(BASE, { method: "POST", body: JSON.stringify(body) });
      await reload();
      onDone({ ok: true, text: `${t} saved.` });
    } catch (e: any) {
      setErr(e.message);
      setSaving(false);
    }
  }

  /* ---------- render ---------- */
  if (loading) return <p className="ad-sub" role="status">Loading…</p>;
  if (loadError) {
    return (
      <div className="sv-page">
        <p className="ad-note error" role="alert">{loadError}</p>
        <button type="button" className="ad-btn" onClick={() => onDone()}>Back to services</button>
      </div>
    );
  }

  return (
    <div className="sv-page">
      <div className="sv-head">
        <h2>{id ? "Edit service" : "Add service"}</h2>
        <div className="sv-head-actions">
          {id && <a className="ad-btn" href={`/services/${origSlug}`} target="_blank" rel="noreferrer">Preview</a>}
          <button type="button" className="ad-btn" onClick={() => onDone()}>Cancel</button>
        </div>
      </div>

      {custom && (
        <p className="sv-info">
          Edits appear in homepage
        </p>
      )}

      <div className="sv-editor">
        <div className="sv-main">
          {/* ---- service details ---- */}
          <section className="sv-panel">
            <h3>Expertise Card details</h3>
            <p className="sv-hint">Shown on the Expertise cards and used for the page address.</p>
            <div className="sv-two">
              <div className="ad-field">
                <label htmlFor="sv-title">Title<span aria-hidden="true">*</span></label>
                <input id="sv-title" className="ad-input" maxLength={150} value={title}
                       onChange={(e) => { setTitle(e.target.value); if (!slugTouched) setSlug(slugify(e.target.value)); }} />
              </div>
              <div className="ad-field">
                <label htmlFor="sv-slug">Page address<span aria-hidden="true">*</span></label>
                <div className="sv-prefix">
                  <span>/services/</span>
                  <input id="sv-slug" maxLength={80} value={slug} disabled={custom}
                         onChange={(e) => { setSlug(e.target.value.toLowerCase()); setSlugTouched(true); }} />
                </div>
                {custom && <small className="sv-hint">Locked: the hand-built page is tied to this address.</small>}
              </div>
            </div>
           
            <div className="sv-two">
              <div className="ad-field sv-order">
                <label htmlFor="sv-order">Order</label>
                <input id="sv-order" className="ad-input" type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
                <small className="sv-hint">Lower numbers show first in the Expertise section.</small>
              </div>
              <ImageUpload label="Card image" required value={image} onChange={(url: string) => setImage(url)} />
            </div>
            
          </section>
          
          <section className="sv-panel">
            <h3>Service Card details</h3>
            <p className="sv-hint">Shown on the Service Cards in Service page.</p>
            <div className="sv-two">
                <div className="ad-field">
                  <label htmlFor="sv-card-title">Title<span aria-hidden="true">*</span></label>
                  <input id="sv-card-title" className="ad-input" maxLength={150} value={cardTitle}
                        onChange={(e) => { setCardTitle(e.target.value); if (!slugTouched) setSlug(slugify(e.target.value)); }} />
                </div>
                <div className="ad-field">
                  <label htmlFor="sv-cat">Category<span aria-hidden="true">*</span></label>
                  <select id="sv-cat" className="ad-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    {SERVICE_CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key}>{c.title}</option>
                    ))}
                  </select>
                  <small className="sv-hint">Decides which column the service appears in under Services in the navbar.</small>
              </div>
            </div>
            
            <div className="ad-field">
              <label htmlFor="sv-desc">Short description (Service Card)<span aria-hidden="true">*</span></label>
              <textarea id="sv-desc" className="ad-input sv-area" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <ImageUpload label="Service Card image" required value={cardImage} onChange={(url: string) => setCardImage(url)} />
          </section>
           
          {/* ---- hero (always) ---- */}
          <h3>Sections</h3>
          <section className="sv-sec is-open is-hero">
            <div className="sv-sec-head">
              <div className="sv-sec-title"><b>Hero banner</b><span>Always shown at the top of the page.</span></div>
              <button type="button" className="sv-link" onClick={() => setHero((h) => ({ ...h, title: h.title || title, description: h.description || description, image: h.image || image }))}>
                Fill from service details
              </button>
            </div>
            <div className="sv-sec-body">
              <ServiceField def={HERO} value={hero} hideLabel onChange={(v) => setHero(asObj(v))} />
            </div>
          </section>

          {/* ---- chosen sections ---- */}
          <section className="sv-panel">
            <div className="sv-panel-head">
              <h3>Page sections</h3>
              <span className="sv-hint">{custom ? "Edit the content below." : "Use the arrows to change the order."}</span>
            </div>

            {keys.length === 0 && <p className="sv-empty-note">No sections yet. Pick one from the library to add it.</p>}

            <div className="sv-sections">
              {keys.map((key, i) => {
                const def = SECTION_BY_KEY[key];
                const isOpen = !!open[key];
                const off = hidden.includes(key);
                return (
                  <section key={key} id={`sv-sec-${key}`} className={`sv-sec ${isOpen ? "is-open" : ""} ${off ? "is-off" : ""}`}>
                    <div className="sv-sec-head">
                      <div className="sv-sec-title">
                        <b>{def.label}{off && <span className="sv-tag">Hidden</span>}</b>
                        <span>{summarize(def, values[key])}</span>
                      </div>
                      <div className="sv-tools">
                        {!custom && (
                          <>
                            <button type="button" className="sv-tool" disabled={i === 0} aria-label={`Move ${def.label} up`} onClick={() => move(i, -1)}>↑</button>
                            <button type="button" className="sv-tool" disabled={i === keys.length - 1} aria-label={`Move ${def.label} down`} onClick={() => move(i, 1)}>↓</button>
                            <label className="sv-switch" title="Show this section on the website">
                              <input type="checkbox" role="switch" checked={!off} onChange={() => toggleShown(key)} />
                              <span className="sv-switch-track" aria-hidden="true" />
                              <span className="sv-sr">Show {def.label} on the website</span>
                            </label>
                          </>
                        )}
                        <button type="button" className="sv-link" aria-expanded={isOpen} onClick={() => setOpen((o) => ({ ...o, [key]: !o[key] }))}>
                          {isOpen ? "Close" : "Edit"}
                        </button>
                        <button type="button" className="sv-link danger" aria-label={`Remove ${def.label}`} onClick={() => removeSection(key)}>Remove</button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="sv-sec-body">
                        <ServiceField def={def} value={values[key]} hideLabel onChange={(v) => setValues((all) => ({ ...all, [key]: v }))} />
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </section>
        </div>

        {/* ---- library ---- */}
        <aside className="sv-lib" aria-label="Section library">
          <h3>Section library</h3>
          <p className="sv-hint">Pick a ready-made section. It is added to the end of the page.</p>
          <ul>
            {SECTIONS.map((s) => {
              const added = keys.includes(s.key);
              return (
                <li key={s.key} className="sv-lib-item">
                  <div><b>{s.label}</b><span>{s.description}</span></div>
                  <button type="button" className="ad-btn small" disabled={added} aria-label={`Add ${s.label}`} onClick={() => addSection(s.key)}>
                    {added ? "Added" : "Add"}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      <div className="sv-savebar">
        <button type="button" className="ad-btn solid" disabled={saving} onClick={save}>{saving ? "Saving…" : "Save service"}</button>
        <button type="button" className="ad-btn" disabled={saving} onClick={() => onDone()}>Cancel</button>
        {err && <span className="sv-err" role="alert">{err}</span>}
      </div>
    </div>
  );
}
