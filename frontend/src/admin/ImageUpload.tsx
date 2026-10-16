import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { clearToken, getToken } from "./api";
import { API_URL } from "../config";
import { imgSrc } from "../utils/imgSrc";
import "./ImageUpload.css";

const ACCEPT = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Click or drag an image onto the box. It is uploaded through the backend to Cloudinary,
 * and onChange receives the https address to store.
 * Use it on any dashboard page. If your backend upload route has a different path, pass `endpoint`.
 */
export default function ImageUpload({
  label, value, onChange, required = false, endpoint = "/upload-image",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  endpoint?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const [err, setErr] = useState("");

  async function upload(file: File) {
    setErr("");
    if (!ACCEPT.includes(file.type)) return setErr("Use a PNG, JPG, WEBP or GIF image.");
    if (file.size > MAX_BYTES) return setErr("Image must be under 5 MB.");

    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      // sent directly (not through the JSON api helper) so the browser sets the multipart header itself
      const res = await fetch(`${API_URL}/api/admin${endpoint}`, {
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

  return (
    <div className="iu">
      <span className="iu-label">{label}{required && <span aria-hidden="true">*</span>}</span>

      <div
        className={`iu-drop ${over ? "is-over" : ""} ${value ? "has-image" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={drop}
      >
        {value ? (
          <>
            <img className="iu-preview" src={imgSrc(value)} alt="" />
            <div className="iu-bar">
              <button type="button" onClick={open}>Replace</button>
              <button type="button" className="remove" onClick={() => onChange("")}>Remove</button>
            </div>
          </>
        ) : (
          <button type="button" className="iu-empty" onClick={open} aria-label={`Upload ${label}`}>
            <span className="iu-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V5m0 0L8 9m4-4l4 4" /><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
              </svg>
            </span>
            <span className="iu-title">Click to upload</span>
            <span className="iu-hint">or drag and drop</span>
            <span className="iu-hint">PNG, JPG, WEBP or GIF, up to 5 MB</span>
          </button>
        )}

        {busy && (
          <div className="iu-busy" role="status">
            <span className="iu-spin" aria-hidden="true" />
            Uploading…
          </div>
        )}
      </div>

      <input ref={fileRef} type="file" hidden accept={ACCEPT.join(",")} onChange={pick} />
      {err && <small className="iu-err" role="alert">{err}</small>}
    </div>
  );
}
