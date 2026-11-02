import { useState } from "react";
import { api, errorMessage } from "./api";
import { usePageCrumb } from "./adminPage";
import { Field, ImageField } from "./StoryFields";
import { OutcomesField, StrategiesField } from "./StoryItems";
import { imgSrc } from "../utils/imgSrc";
import { missingFieldLabels } from "./storyTypes";
import type { Note, Story } from "./storyTypes";

const BASE = "/success-stories";

type StoryFormProps = {
  initial: Story;
  reload: () => Promise<void>;
  onDone: (note?: Note) => void;
};

export default function StoryForm({ initial, reload, onDone }: StoryFormProps) {
  const [doc, setDoc] = useState<Story>(initial);
  const [note, setNote] = useState<Note>(null);
  const [busy, setBusy] = useState(false);

  usePageCrumb(doc._id ? "Edit story" : "Add story");

  const update = <K extends keyof Story>(key: K, value: Story[K]) =>
    setDoc((current) => ({ ...current, [key]: value }));

  async function handleSave() {
    const missing = missingFieldLabels(doc);
    if (missing.length > 0) {
      setNote({ ok: false, text: `Fill in: ${missing.join(", ")}` });
      return;
    }

    setBusy(true);
    setNote(null);
    try {
      const { _id, ...body } = doc;
      const options = { method: _id ? "PUT" : "POST", body: JSON.stringify(body) };
      await api<Story>(_id ? `${BASE}/${_id}` : BASE, options);

      await reload();
      onDone({ ok: true, text: `${doc.projectName} saved. It now appears in the homepage carousel.` });
    } catch (e) {
      setNote({ ok: false, text: errorMessage(e) });
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!doc._id || !window.confirm(`Delete "${doc.projectName}"?`)) return;

    try {
      await api(`${BASE}/${doc._id}`, { method: "DELETE" });
      await reload();
      onDone({ ok: true, text: `${doc.projectName} deleted.` });
    } catch (e) {
      setNote({ ok: false, text: errorMessage(e) });
    }
  }

  return (
    <section className="ss-main">
      <div className="ss-formhead">
        <h2>{doc._id ? "Edit story" : "Add story"}</h2>
        <button type="button" className="ad-btn" onClick={() => onDone()}>
          ← Back to list
        </button>
      </div>

      {doc.slug && <p className="ad-sub">Page address: /project-view/{doc.slug}</p>}

      {/* name + description + history | project image | project logo */}
      <div className="ss-top">
        <div>
          <Field id="ss-name" label="Project Name">
            <input
              id="ss-name"
              className="ad-input"
              value={doc.projectName}
              onChange={(e) => update("projectName", e.target.value)}
            />
          </Field>
          <Field id="ss-desc" label="Project Description">
            <textarea
              id="ss-desc"
              className="ad-input"
              rows={3}
              value={doc.projectDescription}
              onChange={(e) => update("projectDescription", e.target.value)}
            />
          </Field>
          <Field id="ss-history" label="Project History">
            <textarea
              id="ss-history"
              className="ad-input"
              rows={4}
              value={doc.projectHistory}
              onChange={(e) => update("projectHistory", e.target.value)}
            />
          </Field>
        </div>
        <ImageField shape="wide" label="Project Image" value={doc.projectImage} onChange={(url) => update("projectImage", url)} />
        <ImageField shape="square" label="Project Logo" value={doc.projectLogo} onChange={(url) => update("projectLogo", url)} />
      </div>

      {/* impact | challenges */}
      <div className="ss-two">
        <Field id="ss-impact" label="Impact of Mindstory">
          <textarea
            id="ss-impact"
            className="ad-input"
            rows={6}
            value={doc.impact ?? ""}
            onChange={(e) => update("impact", e.target.value)}
          />
        </Field>
        <Field id="ss-challenges" label="Challenges faced">
          <textarea
            id="ss-challenges"
            className="ad-input"
            rows={6}
            value={doc.challenges ?? ""}
            onChange={(e) => update("challenges", e.target.value)}
          />
        </Field>
      </div>

      {/* strategy */}
      <div className="ss-block">
        <Field id="ss-strategy" label="Strategy and Implementation">
          <textarea
            id="ss-strategy"
            className="ad-input"
            rows={3}
            value={doc.strategyOverview}
            onChange={(e) => update("strategyOverview", e.target.value)}
          />
        </Field>
        <StrategiesField strategies={doc.strategies} onChange={(strategies) => update("strategies", strategies)} />
      </div>

      {/* results | conclusion */}
      <div className="ss-two">
        <div>
          <Field id="ss-results" label="Results and Impact">
            <textarea
              id="ss-results"
              className="ad-input"
              rows={3}
              value={doc.resultsOverview}
              onChange={(e) => update("resultsOverview", e.target.value)}
            />
          </Field>
          <OutcomesField outcomes={doc.keyOutcomes} onChange={(outcomes) => update("keyOutcomes", outcomes)} />
        </div>
        <div>
          <Field id="ss-conclusion" label="Conclusion">
            <textarea
              id="ss-conclusion"
              className="ad-input"
              rows={6}
              value={doc.conclusion}
              onChange={(e) => update("conclusion", e.target.value)}
            />
          </Field>
        </div>
      </div>

      {/* gallery */}
      <div className="ss-block">
        <div className="ss-gallery-head">
          <span className="ss-heading">Gallery</span>
          <label className="ss-switch">
            <input
              type="checkbox"
              role="switch"
              checked={doc.galleryEnabled}
              onChange={(e) => update("galleryEnabled", e.target.checked)}
            />
            <span className="ss-switch-track" aria-hidden="true" />
            <span className="ss-sr">Show gallery on the project page</span>
          </label>
        </div>

        <ImageField shape="tile" value="" onChange={(url) => url && update("gallery", [...doc.gallery, url])} />

        {doc.galleryEnabled && (
          <div className="ss-gallery">
            {doc.gallery.map((image, index) => (
              <div key={index} className="ss-tile">
                <img src={imgSrc(image)} alt="" />
                <button
                  type="button"
                  className="ss-tile-x"
                  aria-label="Remove image"
                  onClick={() => update("gallery", doc.gallery.filter((_, i) => i !== index))}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="ss-savebar">
        <button type="button" className="ad-btn solid" onClick={handleSave} disabled={busy}>
          {busy ? "Saving…" : "Save"}
        </button>
        <button type="button" className="ad-btn" onClick={() => onDone()} disabled={busy}>
          Cancel
        </button>
        {doc._id && (
          <button type="button" className="ad-btn danger" onClick={handleDelete} disabled={busy}>
            Delete
          </button>
        )}
        {note && (
          <span className={`ss-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>
            {note.text}
          </span>
        )}
      </div>
    </section>
  );
}