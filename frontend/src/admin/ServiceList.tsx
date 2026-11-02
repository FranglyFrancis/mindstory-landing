import { useMemo, useState } from "react";
import { api, errorMessage } from "./api";
import { CUSTOM_LAYOUT_SLUGS } from "./serviceSections";
import { BASE, LIST_HASH, formatDate } from "./serviceTypes";
import type { Note, Row } from "./serviceTypes";
import { imgSrc } from "../utils/imgSrc";

const goTo = (hash: string) => {
  window.location.hash = hash;
};

const hasCustomLayout = (row: Row): boolean => CUSTOM_LAYOUT_SLUGS.includes(row.slug);

type ServiceListProps = {
  rows: Row[] | null;
  note: Note;
  setNote: (note: Note) => void;
  reload: () => Promise<void>;
};

export default function ServiceList({ rows, note, setNote, reload }: ServiceListProps) {
  const [busyId, setBusyId] = useState<string | null>(null);

  const sorted = useMemo(
    () => (rows ? [...rows].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : []),
    [rows]
  );

  const openAdd = () => goTo(`${LIST_HASH}/new`);

  async function remove(row: Row) {
    const warning = hasCustomLayout(row) ? "\n\nThis service has a hand-built page, which will stop working." : "";
    if (!window.confirm(`Delete "${row.title}"? This cannot be undone.${warning}`)) return;

    setBusyId(row._id);
    setNote(null);
    try {
      await api(`${BASE}/${row._id}`, { method: "DELETE" });
      setNote({ ok: true, text: `${row.title} deleted.` });
      await reload();
    } catch (e) {
      setNote({ ok: false, text: errorMessage(e) });
    } finally {
      setBusyId(null);
    }
  }

  const subtitle =
    rows === null
      ? "Loading…"
      : `${rows.length} ${rows.length === 1 ? "service" : "services"}. Shown in the Expertise section, in this order.`;

  return (
    <div className="sv-page">
      <div className="sv-head">
        <div>
          <h2>Services</h2>
          <p className="ad-sub sv-sub">{subtitle}</p>
        </div>
        <button type="button" className="ad-btn solid sv-add-btn" onClick={openAdd}>
          + Add service
        </button>
      </div>

      {note && (
        <p className={`ad-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>
          {note.text}
        </p>
      )}

      {rows && rows.length === 0 && (
        <div className="sv-card sv-empty">
          <p>No services yet.</p>
          <button type="button" className="ad-btn solid" onClick={openAdd}>
            Add your first service
          </button>
        </div>
      )}

      {rows && rows.length > 0 && (
        <div className="sv-card sv-table-wrap">
          <table className="sv-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Page address</th>
                <th>Sections</th>
                <th>Order</th>
                <th>Updated</th>
                <th>
                  <span className="sv-sr">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row._id}>
                  <td>
                    <div className="sv-cell">
                      {row.image ? (
                        <img className="sv-thumb" src={imgSrc(row.image)} alt="" loading="lazy" />
                      ) : (
                        <span className="sv-thumb" aria-hidden="true" />
                      )}
                      <div className="sv-cell-text">
                        <strong>{row.title}</strong>
                        {row.description && <span className="sv-clamp">{row.description}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="sv-muted">/services/{row.slug}</td>
                  <td>
                    {row.sectionCount}
                    {hasCustomLayout(row) && (
                      <span className="sv-tag" title="Hand-built page layout">
                        Custom
                      </span>
                    )}
                  </td>
                  <td>{row.order}</td>
                  <td className="sv-muted">{formatDate(row.updatedAt)}</td>
                  <td>
                    <div className="sv-row-actions">
                      <button
                        type="button"
                        className="sv-link"
                        disabled={busyId === row._id}
                        onClick={() => goTo(`${LIST_HASH}/edit/${row._id}`)}
                      >
                        Edit
                      </button>
                      <a className="sv-link" href={`/services/${row.slug}`} target="_blank" rel="noreferrer">
                        Preview
                      </a>
                      <button
                        type="button"
                        className="sv-link danger"
                        disabled={busyId === row._id}
                        onClick={() => remove(row)}
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