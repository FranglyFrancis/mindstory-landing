import AddPanel from "./AddPanel";
import { Field, ImageField } from "./StoryFields";
import { imgSrc } from "../utils/imgSrc";
import type { Outcome, Strategy } from "./storyTypes";

const EMPTY_STRATEGY: Strategy = { icon: "", title: "", description: "" };
const EMPTY_OUTCOME: Outcome = { title: "", description: "" };

const hasTitle = (item: { title: string }): boolean => item.title.trim() !== "";

/* ---------- strategies ---------- */
type StrategiesProps = {
  strategies: Strategy[];
  onChange: (strategies: Strategy[]) => void;
};

export function StrategiesField({ strategies, onChange }: StrategiesProps) {
  return (
    <>
      <AddPanel<Strategy>
        buttonLabel="Add Strategy+"
        empty={EMPTY_STRATEGY}
        valid={hasTitle}
        onAdd={(draft) =>
          onChange([...strategies, { icon: draft.icon, title: draft.title.trim(), description: draft.description.trim() }])
        }
      >
        {(draft, setDraft) => (
          <>
            <div className="ss-pop-row">
              <ImageField shape="icon" label="Icon" value={draft.icon} onChange={(icon) => setDraft({ ...draft, icon })} />
              <div className="ss-grow">
                <Field id="st-title" label="Title">
                  <input
                    id="st-title"
                    className="ad-input"
                    autoFocus
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  />
                </Field>
              </div>
            </div>
            <div className="ss-pop-desc">
              <Field id="st-desc" label="Description" required={false}>
                <textarea
                  id="st-desc"
                  className="ad-input"
                  rows={3}
                  value={draft.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                />
              </Field>
            </div>
          </>
        )}
      </AddPanel>

      {strategies.length > 0 && (
        <ul className="ss-items">
          {strategies.map((strategy, index) => (
            <li key={index}>
              {strategy.icon && <img src={imgSrc(strategy.icon)} alt="" />}
              <span>
                <strong>{strategy.title}</strong>
                {strategy.description && <small>{strategy.description}</small>}
              </span>
              <button
                type="button"
                className="ad-btn small danger"
                onClick={() => onChange(strategies.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/* ---------- key outcomes ---------- */
type OutcomesProps = {
  outcomes: Outcome[];
  onChange: (outcomes: Outcome[]) => void;
};

export function OutcomesField({ outcomes, onChange }: OutcomesProps) {
  return (
    <>
      <AddPanel<Outcome>
        buttonLabel="Add Key Outcomes+"
        empty={EMPTY_OUTCOME}
        valid={hasTitle}
        onAdd={(draft) => onChange([...outcomes, { title: draft.title.trim(), description: draft.description.trim() }])}
      >
        {(draft, setDraft) => (
          <>
            <Field id="ko-title" label="Title">
              <input
                id="ko-title"
                className="ad-input"
                autoFocus
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </Field>
            <div className="ss-pop-desc">
              <Field id="ko-desc" label="Description" required={false}>
                <textarea
                  id="ko-desc"
                  className="ad-input"
                  rows={3}
                  value={draft.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                />
              </Field>
            </div>
          </>
        )}
      </AddPanel>

      {outcomes.length > 0 && (
        <ul className="ss-items">
          {outcomes.map((outcome, index) => (
            <li key={index}>
              <span>
                <strong>{outcome.title}</strong>
                {outcome.description && <small>{outcome.description}</small>}
              </span>
              <button
                type="button"
                className="ad-btn small danger"
                onClick={() => onChange(outcomes.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}