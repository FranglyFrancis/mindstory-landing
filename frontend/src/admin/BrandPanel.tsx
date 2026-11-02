import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, KeyboardEvent } from "react";
import { errorMessage } from "./api";
import { ACCEPTED_IMAGE_TYPES, checkImageFile, uploadImageFile } from "./imageUploadApi";
import { imgSrc } from "../utils/imgSrc";
import type { BrandDraft } from "./brandTypes";

const UploadIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 16V5m0 0L8 9m4-4l4 4" />
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
);

/* ---------- logo picker ---------- */
type LogoFieldProps = {
  logo: string;
  uploading: boolean;
  onPick: (file: File) => void;
  onRemove: () => void;
};

function LogoField({ logo, uploading, onPick, onRemove }: LogoFieldProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => fileRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // lets the same file be chosen again
    if (file) onPick(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onPick(file);
  };

  return (
    <div className="br-field">
      <span className="br-label">
        Logo image<span aria-hidden="true">*</span>
      </span>

      <div
        className={`br-up ${dragOver ? "is-over" : ""} ${logo ? "has-image" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {logo ? (
          <>
            <img src={imgSrc(logo)} alt="Logo preview" />
            <div className="br-up-bar">
              <button type="button" onClick={openFilePicker}>
                Replace
              </button>
              <button type="button" className="remove" onClick={onRemove}>
                Remove
              </button>
            </div>
          </>
        ) : (
          <button type="button" className="br-up-btn" onClick={openFilePicker} aria-label="Upload logo image">
            <UploadIcon />
            <span>Upload</span>
          </button>
        )}

        {uploading && (
          <div className="br-busy" role="status">
            <span className="br-spin" aria-hidden="true" />
            <span className="br-sr">Uploading…</span>
          </div>
        )}
      </div>

      <input ref={fileRef} type="file" hidden accept={ACCEPTED_IMAGE_TYPES.join(",")} onChange={handleFileChange} />
    </div>
  );
}

/* ---------- panel ---------- */
type BrandPanelProps = {
  editing: boolean;
  initial: BrandDraft;
  focusTick: number; // changes when "Add brand" is pressed while the add panel is already open
  onSave: (draft: BrandDraft) => Promise<void>;
  onClose: () => void;
};

export default function BrandPanel({ editing, initial, focusTick, onSave, onClose }: BrandPanelProps) {
  const [name, setName] = useState(initial.name);
  const [logo, setLogo] = useState(initial.logo);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  // When the panel opens, bring it into view and focus the name field.
  useEffect(() => {
    panelRef.current?.scrollIntoView({ block: "nearest" });
    nameRef.current?.focus({ preventScroll: true });
  }, [focusTick]);

  async function handlePick(file: File) {
    const problem = checkImageFile(file);
    setError(problem);
    if (problem) return;

    setUploading(true);
    try {
      setLogo(await uploadImageFile(file));
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Enter the brand name.");
      nameRef.current?.focus();
      return;
    }
    if (!logo) {
      setError("Upload the logo image.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await onSave({ name: trimmedName, logo });
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setSaving(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") onClose();

    const target = event.target as HTMLInputElement;
    if (event.key === "Enter" && target.tagName === "INPUT" && target.type === "text") {
      event.preventDefault();
      void handleSave();
    }
  }

  return (
    <section
      id="br-panel"
      ref={panelRef}
      className="br-panel"
      aria-label={editing ? "Edit brand" : "Add brand"}
      onKeyDown={handleKeyDown}
    >
      <div className="br-panel-grid">
        <div className="br-field">
          <label htmlFor="br-name">
            Logo name<span aria-hidden="true">*</span>
          </label>
          <input
            id="br-name"
            ref={nameRef}
            type="text"
            className="ad-input"
            maxLength={100}
            placeholder="e.g. Acme Corp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <LogoField logo={logo} uploading={uploading} onPick={handlePick} onRemove={() => setLogo("")} />
      </div>

      {error && (
        <p className="ad-note error br-err" role="alert">
          {error}
        </p>
      )}

      <div className="br-panel-actions">
        <button type="button" className="ad-btn solid" disabled={saving || uploading} onClick={handleSave}>
          {saving ? "Saving…" : editing ? "Save changes" : "Add brand"}
        </button>
        <button type="button" className="ad-btn" disabled={saving} onClick={onClose}>
          Cancel
        </button>
      </div>
    </section>
  );
}