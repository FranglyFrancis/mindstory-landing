import { useCallback, useEffect, useState } from "react";
import { api, errorMessage } from "./api";
import type { PageProps } from "./adminPage";
import ServiceEditor from "./ServiceEditor";
import ServiceList from "./ServiceList";
import { BASE, LIST_HASH } from "./serviceTypes";
import type { Note, Row } from "./serviceTypes";
import "./ServicesAdmin.css";

export default function ServicesPage({ path }: PageProps) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [note, setNote] = useState<Note>(null);

  const load = useCallback(async () => {
    try {
      setRows(await api<Row[]>(BASE));
    } catch (e) {
      setRows((current) => current ?? []);
      setNote({ ok: false, text: errorMessage(e) });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // #services -> list, #services/new -> add form, #services/edit/<id> -> edit form
  const isAdding = path[0] === "new";
  const editId = path[0] === "edit" ? path[1] : undefined;
  const inForm = isAdding || Boolean(editId);

  // Opening a form clears any old message.
  useEffect(() => {
    if (inForm) setNote(null);
  }, [inForm, editId]);

  const goToList = (message?: Note) => {
    if (message) setNote(message);
    window.location.hash = LIST_HASH;
  };

  if (inForm) {
    if (rows === null) {
      return (
        <p className="ad-sub" role="status">
          Loading…
        </p>
      );
    }

    const nextOrder = rows.reduce((highest, row) => Math.max(highest, row.order ?? 0), 0) + 1;

    return <ServiceEditor key={editId ?? "new"} id={editId} nextOrder={nextOrder} reload={load} onDone={goToList} />;
  }

  return <ServiceList rows={rows} note={note} setNote={setNote} reload={load} />;
}