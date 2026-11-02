import { SECTIONS } from "./serviceSections";

type SectionLibraryProps = {
  addedKeys: string[];
  onAdd: (key: string) => void;
};

export default function SectionLibrary({ addedKeys, onAdd }: SectionLibraryProps) {
  return (
    <aside className="sv-lib" aria-label="Section library">
      <h3>Section library</h3>
      <p className="sv-hint">Pick a ready-made section. It is added to the end of the page.</p>
      <ul>
        {SECTIONS.map((section) => {
          const added = addedKeys.includes(section.key);

          return (
            <li key={section.key} className="sv-lib-item">
              <div>
                <b>{section.label}</b>
                <span>{section.description}</span>
              </div>
              <button
                type="button"
                className="ad-btn small"
                disabled={added}
                aria-label={`Add ${section.label}`}
                onClick={() => onAdd(section.key)}
              >
                {added ? "Added" : "Add"}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}