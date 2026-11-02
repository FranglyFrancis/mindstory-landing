import { useId } from "react";
import ImageUpload from "./ImageUpload";
import { asObj, asString, emptyValue } from "./serviceSections";
import type { FieldBody } from "./serviceSections";

const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

/* ---------- label text: "Title *" or "Title (optional)" ---------- */
function FieldLabel({ def }: { def: FieldBody }) {
  return (
    <>
      {def.label}
      {def.optional ? " (optional)" : <span aria-hidden="true">*</span>}
    </>
  );
}

/* ---------- repeating lists (arrays of objects, or arrays of strings) ---------- */
type ListFieldProps = {
  def: FieldBody;
  value: unknown;
  onChange: (value: unknown) => void;
};

function ListField({ def, value, onChange }: ListFieldProps) {
  const items: unknown[] = Array.isArray(value) ? value : [];
  const noun = def.itemLabel ?? "Item";
  const isStrings = def.type === "strings";

  const updateItem = (index: number, next: unknown) =>
    onChange(items.map((item, i) => (i === index ? next : item)));

  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));

  const addItem = () =>
    onChange([...items, isStrings ? "" : emptyValue({ label: noun, type: "object", fields: def.fields })]);

  return (
    <div>
      {items.map((item, index) => (
        <div className="sv-item" key={index}>
          <div className="sv-item-head">
            <span>
              {noun} {index + 1}
            </span>
            <button
              type="button"
              className="sv-link danger"
              aria-label={`Remove ${noun.toLowerCase()} ${index + 1}`}
              onClick={() => removeItem(index)}
            >
              Remove
            </button>
          </div>

          {isStrings ? (
            <textarea
              className="ad-input sv-area"
              rows={3}
              aria-label={`${noun} ${index + 1}`}
              value={asString(item)}
              onChange={(e) => updateItem(index, e.target.value)}
            />
          ) : (
            (def.fields ?? []).map((field) => (
              <ServiceField
                key={field.name}
                def={field}
                value={asObj(item)[field.name]}
                onChange={(next) => updateItem(index, { ...asObj(item), [field.name]: next })}
              />
            ))
          )}
        </div>
      ))}

      <button type="button" className="ad-btn small" onClick={addItem}>
        + Add {noun.toLowerCase()}
      </button>
    </div>
  );
}

/* ---------- any field ---------- */
type ServiceFieldProps = {
  def: FieldBody;
  value: unknown;
  onChange: (value: unknown) => void;
  hideLabel?: boolean; // the section card already shows the title
};

/** Draws any field described in serviceSections.ts, including nested lists. State lives in the parent. */
export default function ServiceField({ def, value, onChange, hideLabel }: ServiceFieldProps) {
  const id = useId();

  switch (def.type) {
    case "text":
      return (
        <div className="ad-field">
          <label htmlFor={id}>
            <FieldLabel def={def} />
          </label>
          <input id={id} className="ad-input" value={asString(value)} onChange={(e) => onChange(e.target.value)} />
        </div>
      );

    case "textarea":
      return (
        <div className="ad-field">
          <label htmlFor={id}>
            <FieldLabel def={def} />
          </label>
          <textarea
            id={id}
            className="ad-input sv-area"
            rows={3}
            value={asString(value)}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );

    case "select":
      return (
        <div className="ad-field">
          <label htmlFor={id}>
            <FieldLabel def={def} />
          </label>
          <select id={id} className="ad-input" value={asString(value)} onChange={(e) => onChange(e.target.value)}>
            {(def.options ?? []).map((option) => (
              <option key={option} value={option}>
                {capitalize(option)}
              </option>
            ))}
          </select>
        </div>
      );

    case "image":
      return (
        <div className="ad-field">
          <ImageUpload label={def.label} required={!def.optional} value={asString(value)} onChange={onChange} />
        </div>
      );

    case "object": {
      const object = asObj(value);
      const fields = (def.fields ?? []).map((field) => (
        <ServiceField
          key={field.name}
          def={field}
          value={object[field.name]}
          onChange={(next) => onChange({ ...object, [field.name]: next })}
        />
      ));

      if (hideLabel) return <div>{fields}</div>;

      return (
        <div className="ad-field">
          <span className="sv-label">
            <FieldLabel def={def} />
          </span>
          <div className="sv-group">{fields}</div>
        </div>
      );
    }

    case "array":
    case "strings":
      return (
        <div className="ad-field">
          {!hideLabel && (
            <span className="sv-label">
              <FieldLabel def={def} />
            </span>
          )}
          <ListField def={def} value={value} onChange={onChange} />
        </div>
      );
  }
}