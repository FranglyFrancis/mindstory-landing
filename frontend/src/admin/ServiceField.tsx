import { useId } from "react";
import ImageUpload from "./ImageUpload";
import { asObj, asString, emptyValue } from "./serviceSections";
import type { FieldBody } from "./serviceSections";

interface Props {
  def: FieldBody;
  value: unknown;
  onChange: (v: unknown) => void;
  hideLabel?: boolean; // the section card already shows the title
}

/** Draws any field described in serviceSections.ts, including nested lists. State lives in the parent. */
export default function ServiceField({ def, value, onChange, hideLabel }: Props) {
  const id = useId();
  const star = !def.optional && <span aria-hidden="true">*</span>;
  const label = <>{def.label}{def.optional ? " (optional)" : star}</>;

  switch (def.type) {
    case "text":
      return (
        <div className="ad-field">
          <label htmlFor={id}>{label}</label>
          <input id={id} className="ad-input" value={asString(value)} onChange={(e) => onChange(e.target.value)} />
        </div>
      );

    case "textarea":
      return (
        <div className="ad-field">
          <label htmlFor={id}>{label}</label>
          <textarea id={id} className="ad-input sv-area" rows={3} value={asString(value)} onChange={(e) => onChange(e.target.value)} />
        </div>
      );

    case "select":
      return (
        <div className="ad-field">
          <label htmlFor={id}>{label}</label>
          <select id={id} className="ad-input" value={asString(value)} onChange={(e) => onChange(e.target.value)}>
            {(def.options ?? []).map((o) => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
          </select>
        </div>
      );

    case "image":
      return (
        <div className="ad-field">
          <ImageUpload label={def.label} required={!def.optional} value={asString(value)} onChange={(url: string) => onChange(url)} />
        </div>
      );

    case "object": {
      const obj = asObj(value);
      const fields = (def.fields ?? []).map((f) => (
        <ServiceField key={f.name} def={f} value={obj[f.name]} onChange={(v) => onChange({ ...obj, [f.name]: v })} />
      ));
      if (hideLabel) return <div>{fields}</div>;
      return (
        <div className="ad-field">
          <span className="sv-label">{label}</span>
          <div className="sv-group">{fields}</div>
        </div>
      );
    }

    case "array":
    case "strings":
      return (
        <div className="ad-field">
          {!hideLabel && <span className="sv-label">{label}</span>}
          <ListField def={def} value={value} onChange={onChange} />
        </div>
      );
  }
}

function ListField({ def, value, onChange }: { def: FieldBody; value: unknown; onChange: (v: unknown) => void }) {
  const items: unknown[] = Array.isArray(value) ? value : [];
  const noun = def.itemLabel ?? "Item";
  const isStrings = def.type === "strings";

  const setItem = (i: number, v: unknown) => onChange(items.map((x, j) => (j === i ? v : x)));
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  const add = () => onChange([...items, isStrings ? "" : emptyValue({ label: noun, type: "object", fields: def.fields })]);

  return (
    <div>
      {items.map((item, i) => (
        <div className="sv-item" key={i}>
          <div className="sv-item-head">
            <span>{noun} {i + 1}</span>
            <button type="button" className="sv-link danger" aria-label={`Remove ${noun.toLowerCase()} ${i + 1}`} onClick={() => remove(i)}>Remove</button>
          </div>
          {isStrings ? (
            <textarea className="ad-input sv-area" rows={3} aria-label={`${noun} ${i + 1}`}
                      value={asString(item)} onChange={(e) => setItem(i, e.target.value)} />
          ) : (
            (def.fields ?? []).map((f) => (
              <ServiceField key={f.name} def={f} value={asObj(item)[f.name]}
                            onChange={(v) => setItem(i, { ...asObj(item), [f.name]: v })} />
            ))
          )}
        </div>
      ))}
      <button type="button" className="ad-btn small" onClick={add}>+ Add {noun.toLowerCase()}</button>
    </div>
  );
}
