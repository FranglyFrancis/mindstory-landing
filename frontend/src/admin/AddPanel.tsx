import { useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

type AddPanelProps<T> = {
  buttonLabel: string;
  empty: T;
  valid: (draft: T) => boolean;
  onAdd: (draft: T) => void;
  children: (draft: T, setDraft: (draft: T) => void) => ReactNode;
};

/** A button that opens a panel directly below it. Add keeps the panel open so you can add several in a row. */
export default function AddPanel<T>({ buttonLabel, empty, valid, onAdd, children }: AddPanelProps<T>) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<T>(empty);

  const close = () => {
    setOpen(false);
    setDraft(empty);
  };

  const add = () => {
    if (!valid(draft)) return;
    onAdd(draft);
    setDraft(empty);
  };

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") close();

    if (event.key === "Enter" && (event.target as HTMLElement).tagName === "INPUT") {
      event.preventDefault();
      add();
    }
  }

  return (
    <div className="ss-add">
      <button type="button" className="ad-btn" aria-expanded={open} onClick={() => (open ? close() : setOpen(true))}>
        {buttonLabel}
      </button>

      {open && (
        <div className="ss-pop" role="group" aria-label={buttonLabel} onKeyDown={handleKeyDown}>
          {children(draft, setDraft)}
          <div className="ss-pop-actions">
            <button type="button" className="ad-btn solid small" disabled={!valid(draft)} onClick={add}>
              Add
            </button>
            <button type="button" className="ad-btn small" onClick={close}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}