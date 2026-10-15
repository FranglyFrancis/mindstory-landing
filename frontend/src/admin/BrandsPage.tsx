import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, KeyboardEvent } from "react";
import { api, clearToken, getToken } from "./api";
import { API_URL } from "../config";
import { imgSrc } from "../utils/imgSrc";
import "./BrandsPage.css";

type Brand = { _id: string; name?: string; logo: string; createdAt?: string };
type Note = { ok: boolean; text: string } | null;

const ACCEPT = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024;

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";

/** Sends the file to your existing upload endpoint and returns the stored URL. */
async function uploadLogo(file: File): Promise<string> {
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
  return data.url as string;
}

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 16V5m0 0L8 9m4-4l4 4" /><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
);

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[] | null>(null);
  const [note, setNote] = useState<Note>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  // the small add / edit panel above the list
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [over, setOver] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const load = useCallback(async () => {
    try {
      setBrands(await api<Brand[]>("/brands"));
    } catch (e: any) {
      setBrands((b) => b ?? []);
      setNote({ ok: false, text: e.message });
    }
  }, []);
  useEffect(() => { void load(); }, [load]);

  // when the panel opens, bring it into view and focus the name field
  useEffect(() => {
    if (!open) return;
    panelRef.current?.scrollIntoView({ block: "nearest" });
    nameRef.current?.focus({ preventScroll: true });
  }, [open, editId]);

  /* ---------- panel ---------- */
  function openAdd() {
    if (open && editId === null) return nameRef.current?.focus();
    setEditId(null); setName(""); setLogo(""); setErr(""); setNote(null); setOpen(true);
  }
  function openEdit(b: Brand) {
    setEditId(b._id); setName(b.name ?? ""); setLogo(b.logo); setErr(""); setNote(null); setOpen(true);
  }
  const closePanel = () => { setOpen(false); setErr(""); };

  async function pickLogo(file: File) {
    setErr("");
    if (!ACCEPT.includes(file.type)) return setErr("Use a PNG, JPG, WEBP or GIF image.");
    if (file.size > MAX_BYTES) return setErr("Image must be under 5 MB.");
    setUploading(true);
    try {
      setLogo(await uploadLogo(file));
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setUploading(false);
    }
  }
  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) void pickLogo(file);
  };
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void pickLogo(file);
  };

  async function save() {
    const n = name.trim();
    if (!n) { setErr("Enter the brand name."); nameRef.current?.focus(); return; }
    if (!logo) return setErr("Upload the logo image.");

    setSaving(true);
    setErr("");
    try {
      const body = JSON.stringify({ name: n, logo });
      if (editId) await api<Brand>(`/brands/${editId}`, { method: "PUT", body });
      else await api<Brand>("/brands", { method: "POST", body });
      await load();
      setNote({ ok: true, text: editId ? `${n} updated.` : `${n} added.` });
      setOpen(false);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  function onPanelKey(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "Escape") closePanel();
    if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT" && (e.target as HTMLInputElement).type === "text") {
      e.preventDefault();
      void save();
    }
  }

  /* ---------- delete ---------- */
  async function remove(b: Brand) {
    if (!window.confirm(`Delete "${b.name || "this brand"}"? This cannot be undone.`)) return;
    setBusyId(b._id);
    setNote(null);
    try {
      await api(`/brands/${b._id}`, { method: "DELETE" });
      if (editId === b._id) setOpen(false);
      setNote({ ok: true, text: `${b.name || "Brand"} deleted.` });
      await load();
    } catch (e: any) {
      setNote({ ok: false, text: e.message });
    } finally {
      setBusyId(null);
    }
  }

  const count = brands?.length ?? 0;

  return (
    <div className="br-page">
      <div className="br-head">
        <div>
          <h2>Brands</h2>
          <p className="ad-sub br-sub">{brands === null ? "Loading…" : `${count} ${count === 1 ? "brand" : "brands"}`}</p>
        </div>
        <button type="button" className="ad-btn solid br-add-btn" aria-expanded={open} aria-controls="br-panel" onClick={openAdd}>
          + Add brand
        </button>
      </div>

      <div aria-live="polite">
        {note && <p className={`ad-note ${note.ok ? "ok" : "error"}`}>{note.text}</p>}
      </div>

      {/* ---------- small add / edit panel ---------- */}
      {open && (
        <section id="br-panel" ref={panelRef} className="br-panel" aria-label={editId ? "Edit brand" : "Add brand"} onKeyDown={onPanelKey}>
          <div className="br-panel-grid">
            <div className="br-field">
              <label htmlFor="br-name">Logo name<span aria-hidden="true">*</span></label>
              <input id="br-name" ref={nameRef} type="text" className="ad-input" maxLength={100} placeholder="e.g. Acme Corp"
                     value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="br-field">
              <span className="br-label">Logo image<span aria-hidden="true">*</span></span>
              <div
                className={`br-up ${over ? "is-over" : ""} ${logo ? "has-image" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setOver(true); }}
                onDragLeave={() => setOver(false)}
                onDrop={onDrop}
              >
                {logo ? (
                  <>
                    <img src={imgSrc(logo)} alt="Logo preview" />
                    <div className="br-up-bar">
                      <button type="button" onClick={() => fileRef.current?.click()}>Replace</button>
                      <button type="button" className="remove" onClick={() => setLogo("")}>Remove</button>
                    </div>
                  </>
                ) : (
                  <button type="button" className="br-up-btn" onClick={() => fileRef.current?.click()} aria-label="Upload logo image">
                    <UploadIcon />
                    <span>Upload</span>
                  </button>
                )}
                {uploading && <div className="br-busy" role="status"><span className="br-spin" aria-hidden="true" /><span className="br-sr">Uploading…</span></div>}
              </div>
              <input ref={fileRef} type="file" hidden accept={ACCEPT.join(",")} onChange={onFile} />
            </div>
          </div>

          {err && <p className="ad-note error br-err" role="alert">{err}</p>}

          <div className="br-panel-actions">
            <button type="button" className="ad-btn solid" disabled={saving || uploading} onClick={save}>
              {saving ? "Saving…" : editId ? "Save changes" : "Add brand"}
            </button>
            <button type="button" className="ad-btn" disabled={saving} onClick={closePanel}>Cancel</button>
          </div>
        </section>
      )}

      {/* ---------- list ---------- */}
      {brands !== null && count === 0 && !open && (
        <div className="br-card br-empty">
          <p>No brands yet.</p>
          <button type="button" className="ad-btn solid" onClick={openAdd}>Add your first brand</button>
        </div>
      )}

      {count > 0 && (
        <div className="br-card br-table-wrap">
          <table className="br-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Brand name</th>
                <th>Added</th>
                <th><span className="br-sr">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {brands!.map((b) => (
                <tr key={b._id} className={editId === b._id && open ? "is-editing" : ""}>
                  <td><img className="br-thumb" src={imgSrc(b.logo)} alt="" /></td>
                  <td className="br-name">{b.name || <span className="br-muted">Untitled</span>}</td>
                  <td className="br-muted">{fmtDate(b.createdAt)}</td>
                  <td>
                    <div className="br-row-actions">
                      <button type="button" className="br-link" disabled={busyId === b._id} onClick={() => openEdit(b)}>Edit</button>
                      <button type="button" className="br-link danger" disabled={busyId === b._id} onClick={() => remove(b)}>Delete</button>
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
