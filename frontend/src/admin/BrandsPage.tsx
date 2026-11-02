import { useCallback, useEffect, useState } from "react";
import { api, errorMessage } from "./api";
import BrandPanel from "./BrandPanel";
import BrandTable from "./BrandTable";
import { EMPTY_DRAFT } from "./brandTypes";
import type { Brand, BrandDraft, Note } from "./brandTypes";
import "./BrandsPage.css";

// null = panel closed. editId is null when adding.
type PanelState = { editId: string | null; initial: BrandDraft } | null;

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[] | null>(null);
  const [note, setNote] = useState<Note>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [panel, setPanel] = useState<PanelState>(null);
  const [focusTick, setFocusTick] = useState(0);

  const load = useCallback(async () => {
    try {
      setBrands(await api<Brand[]>("/brands"));
    } catch (e) {
      setBrands((current) => current ?? []);
      setNote({ ok: false, text: errorMessage(e) });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  /* ---------- panel ---------- */
  function openAdd() {
    // Already adding: just move focus back to the name field.
    if (panel && panel.editId === null) {
      setFocusTick((tick) => tick + 1);
      return;
    }
    setNote(null);
    setPanel({ editId: null, initial: EMPTY_DRAFT });
  }

  function openEdit(brand: Brand) {
    setNote(null);
    setPanel({ editId: brand._id, initial: { name: brand.name ?? "", logo: brand.logo } });
  }

  const closePanel = () => setPanel(null);

  async function save(draft: BrandDraft) {
    const editId = panel?.editId;
    const body = JSON.stringify(draft);

    if (editId) await api<Brand>(`/brands/${editId}`, { method: "PUT", body });
    else await api<Brand>("/brands", { method: "POST", body });

    await load();
    setNote({ ok: true, text: editId ? `${draft.name} updated.` : `${draft.name} added.` });
    setPanel(null);
  }

  /* ---------- delete ---------- */
  async function remove(brand: Brand) {
    if (!window.confirm(`Delete "${brand.name || "this brand"}"? This cannot be undone.`)) return;

    setBusyId(brand._id);
    setNote(null);
    try {
      await api(`/brands/${brand._id}`, { method: "DELETE" });
      if (panel?.editId === brand._id) setPanel(null);
      setNote({ ok: true, text: `${brand.name || "Brand"} deleted.` });
      await load();
    } catch (e) {
      setNote({ ok: false, text: errorMessage(e) });
    } finally {
      setBusyId(null);
    }
  }

  const list = brands ?? [];
  const count = list.length;

  return (
    <div className="br-page">
      <div className="br-head">
        <div>
          <h2>Brands</h2>
          <p className="ad-sub br-sub">
            {brands === null ? "Loading…" : `${count} ${count === 1 ? "brand" : "brands"}`}
          </p>
        </div>
        <button
          type="button"
          className="ad-btn solid br-add-btn"
          aria-expanded={panel !== null}
          aria-controls="br-panel"
          onClick={openAdd}
        >
          + Add brand
        </button>
      </div>

      <div aria-live="polite">
        {note && <p className={`ad-note ${note.ok ? "ok" : "error"}`}>{note.text}</p>}
      </div>

      {panel && (
        <BrandPanel
          key={panel.editId ?? "new"}
          editing={panel.editId !== null}
          initial={panel.initial}
          focusTick={focusTick}
          onSave={save}
          onClose={closePanel}
        />
      )}

      {brands !== null && count === 0 && !panel && (
        <div className="br-card br-empty">
          <p>No brands yet.</p>
          <button type="button" className="ad-btn solid" onClick={openAdd}>
            Add your first brand
          </button>
        </div>
      )}

      {count > 0 && (
        <BrandTable
          brands={list}
          editingId={panel?.editId ?? null}
          busyId={busyId}
          onEdit={openEdit}
          onDelete={remove}
        />
      )}
    </div>
  );
}