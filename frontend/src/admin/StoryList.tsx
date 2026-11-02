import { useMemo, useState } from "react";
import { api, errorMessage } from "./api";
import { imgSrc } from "../utils/imgSrc";
import { LIST_HASH, formatDate, lastChanged } from "./storyTypes";
import type { Note, Story } from "./storyTypes";

const goTo = (hash: string) => {
  window.location.hash = hash;
};

type StoryListProps = {
  stories: Story[] | null;
  note: Note;
  setNote: (note: Note) => void;
  reload: () => Promise<void>;
};

export default function StoryList({ stories, note, setNote, reload }: StoryListProps) {
  const [busyId, setBusyId] = useState<string | null>(null);

  // Newest first, using updatedAt/createdAt when the API returns them (otherwise the API order is kept).
  const rows = useMemo(
    () => (stories ? [...stories].sort((a, b) => lastChanged(b).localeCompare(lastChanged(a))) : []),
    [stories]
  );

  const openAdd = () => goTo(`${LIST_HASH}/new`);

  async function remove(story: Story) {
    if (!story._id || !window.confirm(`Delete "${story.projectName}"? This cannot be undone.`)) return;

    setBusyId(story._id);
    setNote(null);
    try {
      await api(`/success-stories/${story._id}`, { method: "DELETE" });
      setNote({ ok: true, text: `${story.projectName} deleted.` });
      await reload();
    } catch (e) {
      setNote({ ok: false, text: errorMessage(e) });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="ss-listpage">
      <div className="ss-head">
        <h2>Success Stories</h2>
        <button type="button" className="ad-btn solid ss-add-btn" onClick={openAdd}>
          + Add story
        </button>
      </div>

      {note && (
        <p className={`ad-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>
          {note.text}
        </p>
      )}

      {stories === null && (
        <p className="ad-sub" role="status">
          Loading…
        </p>
      )}

      {stories && stories.length === 0 && (
        <div className="ss-card ss-empty">
          <p>No success stories yet.</p>
          <button type="button" className="ad-btn solid" onClick={openAdd}>
            Add your first story
          </button>
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
                <th>
                  <span className="ss-sr">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((story) => (
                <tr key={story._id ?? story.projectName}>
                  <td>
                    <div className="ss-cell">
                      {story.projectLogo ? (
                        <img className="ss-logo" src={imgSrc(story.projectLogo)} alt="" />
                      ) : (
                        <span className="ss-logo ss-logo-empty" aria-hidden="true">
                          {story.projectName.charAt(0).toUpperCase()}
                        </span>
                      )}
                      <div className="ss-cell-text">
                        <strong>{story.projectName}</strong>
                        {story.projectDescription && <span className="ss-clamp">{story.projectDescription}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="ss-muted">{story.slug ? `/project-view/${story.slug}` : "-"}</td>
                  <td>{story.strategies?.length ?? 0}</td>
                  <td>{story.keyOutcomes?.length ?? 0}</td>
                  <td>
                    <span className={`ss-pill ${story.galleryEnabled ? "on" : "off"}`}>
                      {story.galleryEnabled ? "On" : "Off"}
                    </span>
                  </td>
                  <td>{formatDate(lastChanged(story))}</td>
                  <td>
                    <div className="ss-row-actions">
                      <button
                        type="button"
                        className="ss-link"
                        disabled={busyId === story._id}
                        onClick={() => story._id && goTo(`${LIST_HASH}/edit/${story._id}`)}
                      >
                        Edit
                      </button>
                      {story.slug && (
                        <a className="ss-link" href={`/project-view/${story.slug}`} target="_blank" rel="noreferrer">
                          Preview
                        </a>
                      )}
                      <button
                        type="button"
                        className="ss-link danger"
                        disabled={busyId === story._id}
                        onClick={() => remove(story)}
                      >
                        Delete
                      </button>
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