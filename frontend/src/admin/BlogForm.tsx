import { useState } from "react";
import type { FormEvent } from "react";
import { errorMessage } from "./api";
import ImageUpload from "./ImageUpload";
import { LIST_HASH } from "./blogTypes";
import type { Draft } from "./blogTypes";

const REQUIRED_MESSAGE = "Title, description, image and link are all required.";
const LINK_MESSAGE = "The link must be a full web address (https://...) or a site path starting with /";

// A full web address, or a site path such as /blog/my-post
const isLink = (value: string): boolean =>
  /^https?:\/\/\S+$/i.test(value) || /^\/(?!\/)\S*$/.test(value);

// Returns an error message, or an empty string when the draft is fine.
function validate(draft: Draft): string {
  if (!draft.title.trim() || !draft.description.trim() || !draft.image || !draft.url.trim()) {
    return REQUIRED_MESSAGE;
  }
  if (!isLink(draft.url.trim())) return LINK_MESSAGE;
  return "";
}

type BlogFormProps = {
  initial: Draft;
  onSave: (draft: Draft) => Promise<void>;
};

export default function BlogForm({ initial, onSave }: BlogFormProps) {
  const [draft, setDraft] = useState<Draft>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof Draft>(field: K, value: Draft[K]) =>
    setDraft((current) => ({ ...current, [field]: value }));

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const problem = validate(draft);
    setError(problem);
    if (problem) return;

    setBusy(true);
    try {
      await onSave(draft);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="bl-form" onSubmit={handleSubmit}>
      <div className="ad-field">
        <label htmlFor="bl-title">
          Title<span aria-hidden="true">*</span>
        </label>
        <input
          id="bl-title"
          className="ad-input"
          value={draft.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>

      <div className="ad-field">
        <label htmlFor="bl-desc">
          Description<span aria-hidden="true">*</span>
        </label>
        <textarea
          id="bl-desc"
          className="ad-input"
          rows={4}
          value={draft.description}
          onChange={(e) => update("description", e.target.value)}
        />
        <small className="bl-hint">A short summary shown on the blog card.</small>
      </div>

      <ImageUpload label="Image" required value={draft.image} onChange={(url) => update("image", url)} />

      <div className="ad-field">
        <label htmlFor="bl-url">
          Link<span aria-hidden="true">*</span>
        </label>
        <input
          id="bl-url"
          className="ad-input"
          value={draft.url}
          onChange={(e) => update("url", e.target.value)}
          placeholder="/blog/my-post or https://..."
        />
        <small className="bl-hint">Where the card goes when someone clicks it.</small>
      </div>

      <label className="bl-check">
        <input
          type="checkbox"
          checked={draft.featured}
          onChange={(e) => update("featured", e.target.checked)}
        />
        <span>Show in the Featured Blogs section on the home page</span>
      </label>

      <div className="ad-field bl-order">
        <label htmlFor="bl-order">Order</label>
        <input
          id="bl-order"
          className="ad-input"
          type="number"
          value={draft.order}
          onChange={(e) => update("order", e.target.value)}
        />
        <small className="bl-hint">Lower numbers show first. Leave 0 to show the newest first.</small>
      </div>

      {error && (
        <p className="ad-note error" role="alert">
          {error}
        </p>
      )}

      <div className="bl-actions">
        <button type="submit" className="ad-btn solid" disabled={busy}>
          {busy ? "Saving…" : "Save blog"}
        </button>
        <a className="ad-btn" href={`#${LIST_HASH}`}>
          Cancel
        </a>
      </div>
    </form>
  );
}