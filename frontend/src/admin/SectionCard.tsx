import ServiceField from "./ServiceField";
import { summarize } from "./serviceSections";
import type { SectionDef } from "./serviceSections";

type SectionCardProps = {
  def: SectionDef;
  index: number;
  total: number;
  value: unknown;
  isOpen: boolean;
  isHidden: boolean;
  custom: boolean; // hand-built layout: order and visibility are fixed in code
  onMove: (delta: number) => void;
  onToggleShown: () => void;
  onToggleOpen: () => void;
  onRemove: () => void;
  onChange: (value: unknown) => void;
};

export default function SectionCard({
  def,
  index,
  total,
  value,
  isOpen,
  isHidden,
  custom,
  onMove,
  onToggleShown,
  onToggleOpen,
  onRemove,
  onChange,
}: SectionCardProps) {
  return (
    <section
      id={`sv-sec-${def.key}`}
      className={`sv-sec ${isOpen ? "is-open" : ""} ${isHidden ? "is-off" : ""}`}
    >
      <div className="sv-sec-head">
        <div className="sv-sec-title">
          <b>
            {def.label}
            {isHidden && <span className="sv-tag">Hidden</span>}
          </b>
          <span>{summarize(def, value)}</span>
        </div>

        <div className="sv-tools">
          {!custom && (
            <>
              <button
                type="button"
                className="sv-tool"
                disabled={index === 0}
                aria-label={`Move ${def.label} up`}
                onClick={() => onMove(-1)}
              >
                ↑
              </button>
              <button
                type="button"
                className="sv-tool"
                disabled={index === total - 1}
                aria-label={`Move ${def.label} down`}
                onClick={() => onMove(1)}
              >
                ↓
              </button>
              <label className="sv-switch" title="Show this section on the website">
                <input type="checkbox" role="switch" checked={!isHidden} onChange={onToggleShown} />
                <span className="sv-switch-track" aria-hidden="true" />
                <span className="sv-sr">Show {def.label} on the website</span>
              </label>
            </>
          )}
          <button type="button" className="sv-link" aria-expanded={isOpen} onClick={onToggleOpen}>
            {isOpen ? "Close" : "Edit"}
          </button>
          <button type="button" className="sv-link danger" aria-label={`Remove ${def.label}`} onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="sv-sec-body">
          <ServiceField def={def} value={value} hideLabel onChange={onChange} />
        </div>
      )}
    </section>
  );
}