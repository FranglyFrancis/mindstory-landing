import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent, ReactNode } from "react";
import { errorMessage } from "./api";
import { ACCEPTED_IMAGE_TYPES, checkImageFile, uploadImageFile } from "./imageUploadApi";
import { imgSrc } from "../utils/imgSrc";

/* ---------- icons ---------- */
const Icon = ({ children, size = 20 }: { children: ReactNode; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const UploadIcon = () => (
  <Icon size={22}>
    <path d="M12 16V5m0 0L8 9m4-4l4 4" />
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </Icon>
);

const PlusIcon = () => (
  <Icon>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

/* ---------- label + input wrapper ---------- */
type FieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  required?: boolean;
};

export function Field({ id, label, children, required = true }: FieldProps) {
  return (
    <div className="ss-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ---------- image upload ---------- */
type Shape = "wide" | "square" | "icon" | "tile";

type ImageFieldProps = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  shape: Shape;
};

/**
 * Image upload: click or drag a file onto the box. Shows a preview with Replace / Remove once uploaded.
 * The shape picks the layout: a big banner, a square logo, a small icon or a gallery tile.
 */
export function ImageField({ label, value, onChange, shape }: ImageFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const isBig = shape === "wide" || shape === "square";
  const name = label ?? "image";

  async function upload(file: File) {
    const problem = checkImageFile(file);
    setError(problem);
    if (problem) return;

    setBusy(true);
    try {
      onChange(await uploadImageFile(file));
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  const openFilePicker = () => fileRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // lets the same file be chosen again
    if (file) void upload(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void upload(file);
  };

  return (
    <div className={`ss-img ss-img-${shape}`}>
      {label && (
        <span className="ss-label">
          {label}
          {shape !== "icon" && <span aria-hidden="true">*</span>}
        </span>
      )}

      <div
        className={`ss-drop ${dragOver ? "is-over" : ""} ${value ? "has-image" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {value && shape === "icon" && (
          <>
            <button type="button" className="ss-drop-btn" onClick={openFilePicker} aria-label="Replace icon">
              <img className="ss-thumb" src={imgSrc(value)} alt="" />
            </button>
            <button type="button" className="ss-icon-x" onClick={() => onChange("")} aria-label="Remove icon">
              ✕
            </button>
          </>
        )}

        {value && isBig && (
          <>
            <img className="ss-preview" src={imgSrc(value)} alt="" />
            <div className="ss-drop-bar">
              <button type="button" onClick={openFilePicker}>
                Replace
              </button>
              <button type="button" className="remove" onClick={() => onChange("")}>
                Remove
              </button>
            </div>
          </>
        )}

        {!value && (
          <button type="button" className="ss-drop-btn" onClick={openFilePicker} aria-label={`Upload ${name}`}>
            {isBig ? (
              <>
                <span className="ss-drop-icon">
                  <UploadIcon />
                </span>
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
            {isBig && "Uploading…"}
          </div>
        )}
      </div>

      <input ref={fileRef} type="file" hidden accept={ACCEPTED_IMAGE_TYPES.join(",")} onChange={handleFileChange} />
      {error && (
        <small className="ss-err" role="alert">
          {error}
        </small>
      )}
    </div>
  );
}