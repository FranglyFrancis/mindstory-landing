import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { errorMessage } from "./api";
import { ACCEPTED_IMAGE_TYPES, checkImageFile, uploadImageFile } from "./imageUploadApi";
import { imgSrc } from "../utils/imgSrc";
import "./ImageUpload.css";

type ImageUploadProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  endpoint?: string; // only needed if your backend upload route has a different path
};

const UploadIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 16V5m0 0L8 9m4-4l4 4" />
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
);

/**
 * Click or drag an image onto the box. It is uploaded through the backend to Cloudinary,
 * and onChange receives the https address to store.
 * Use it on any dashboard page.
 */
export default function ImageUpload({ label, value, onChange, required = false, endpoint }: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    const problem = checkImageFile(file);
    setError(problem);
    if (problem) return;

    setBusy(true);
    try {
      onChange(await uploadImageFile(file, endpoint));
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
    <div className="iu">
      <span className="iu-label">
        {label}
        {required && <span aria-hidden="true">*</span>}
      </span>

      <div
        className={`iu-drop ${dragOver ? "is-over" : ""} ${value ? "has-image" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {value ? (
          <>
            <img className="iu-preview" src={imgSrc(value)} alt="" />
            <div className="iu-bar">
              <button type="button" onClick={openFilePicker}>
                Replace
              </button>
              <button type="button" className="remove" onClick={() => onChange("")}>
                Remove
              </button>
            </div>
          </>
        ) : (
          <button type="button" className="iu-empty" onClick={openFilePicker} aria-label={`Upload ${label}`}>
            <span className="iu-icon" aria-hidden="true">
              <UploadIcon />
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

      <input
        ref={fileRef}
        type="file"
        hidden
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        onChange={handleFileChange}
      />
      {error && (
        <small className="iu-err" role="alert">
          {error}
        </small>
      )}
    </div>
  );
}