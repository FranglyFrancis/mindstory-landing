import { useEffect, useState } from "react";
import { api, errorMessage } from "./api";
import { usePageCrumb } from "./adminPage";
import ServiceField from "./ServiceField";
import ServiceDetailsPanels from "./ServiceDetailsPanels";
import SectionCard from "./SectionCard";
import SectionLibrary from "./SectionLibrary";
import { useSectionList } from "./useSectionList";
import { buildServiceBody } from "./serviceForm";
import { CUSTOM_LAYOUT_SLUGS, HERO, SECTION_BY_KEY, asObj, emptyValue } from "./serviceSections";
import { BASE, detailsFromDoc, emptyDetails, slugify } from "./serviceTypes";
import type { Details, Doc, Note, Obj } from "./serviceTypes";

type ServiceEditorProps = {
  id?: string; // undefined when adding a new service
  nextOrder: number;
  reload: () => Promise<void>;
  onDone: (note?: Note) => void;
};

export default function ServiceEditor({ id, nextOrder, reload, onDone }: ServiceEditorProps) {
  usePageCrumb(id ? "Edit service" : "Add service");

  const [loading, setLoading] = useState(Boolean(id));
  const [loadError, setLoadError] = useState("");
  const [originalSlug, setOriginalSlug] = useState("");

  const [details, setDetails] = useState<Details>(() => emptyDetails(nextOrder));
  const [slugTouched, setSlugTouched] = useState(false); // true once the address is typed by hand
  const [hero, setHero] = useState<Obj>(() => emptyValue(HERO) as Obj);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const sectionList = useSectionList();
  const { loadFrom } = sectionList;

  const custom = CUSTOM_LAYOUT_SLUGS.includes(originalSlug);

  /* ---------- load an existing service ---------- */
  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    api<Doc>(`${BASE}/${id}`)
      .then((doc) => {
        if (cancelled) return;
        setOriginalSlug(doc.slug);
        setDetails(detailsFromDoc(doc));
        setSlugTouched(true);
        setHero({ ...(emptyValue(HERO) as Obj), ...asObj(doc.hero) });
        loadFrom(doc);
      })
      .catch((e) => {
        if (!cancelled) setLoadError(errorMessage(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, loadFrom]);

  /* ---------- details ---------- */
  const updateDetail = <K extends keyof Details>(field: K, value: Details[K]) =>
    setDetails((current) => ({ ...current, [field]: value }));

  // The page address follows the title until it is edited by hand.
  const handleTitleChange = (value: string) => {
    updateDetail("title", value);
    if (!slugTouched) updateDetail("slug", slugify(value));
  };

  const handleSlugChange = (value: string) => {
    updateDetail("slug", value.toLowerCase());
    setSlugTouched(true);
  };

  const fillHeroFromDetails = () =>
    setHero((current) => ({
      ...current,
      title: current.title || details.title,
      description: current.description || details.description,
      image: current.image || details.image,
    }));

  /* ---------- save ---------- */
  async function handleSave() {
    setError("");

    const result = buildServiceBody({
      details,
      hero,
      keys: sectionList.keys,
      values: sectionList.values,
      hidden: sectionList.hidden,
    });

    if ("error" in result) {
      if (result.revealKey) sectionList.reveal(result.revealKey);
      setError(result.error);
      return;
    }

    setSaving(true);
    try {
      const body = JSON.stringify(result.body);
      if (id) await api(`${BASE}/${id}`, { method: "PUT", body });
      else await api(BASE, { method: "POST", body });

      await reload();
      onDone({ ok: true, text: `${details.title.trim()} saved.` });
    } catch (e) {
      setError(errorMessage(e));
      setSaving(false);
    }
  }

  /* ---------- render ---------- */
  if (loading) {
    return (
      <p className="ad-sub" role="status">
        Loading…
      </p>
    );
  }

  if (loadError) {
    return (
      <div className="sv-page">
        <p className="ad-note error" role="alert">
          {loadError}
        </p>
        <button type="button" className="ad-btn" onClick={() => onDone()}>
          Back to services
        </button>
      </div>
    );
  }

  return (
    <div className="sv-page">
      <div className="sv-head">
        <h2>{id ? "Edit service" : "Add service"}</h2>
        <div className="sv-head-actions">
          {id && (
            <a className="ad-btn" href={`/services/${originalSlug}`} target="_blank" rel="noreferrer">
              Preview
            </a>
          )}
          <button type="button" className="ad-btn" onClick={() => onDone()}>
            Cancel
          </button>
        </div>
      </div>

      {custom && <p className="sv-info">Edits appear in homepage</p>}

      <div className="sv-editor">
        <div className="sv-main">
          <ServiceDetailsPanels
            details={details}
            slugLocked={custom}
            onField={updateDetail}
            onTitleChange={handleTitleChange}
            onSlugChange={handleSlugChange}
          />

          <h3>Sections</h3>

          {/* ---- hero (always) ---- */}
          <section className="sv-sec is-open is-hero">
            <div className="sv-sec-head">
              <div className="sv-sec-title">
                <b>Hero banner</b>
                <span>Always shown at the top of the page.</span>
              </div>
              <button type="button" className="sv-link" onClick={fillHeroFromDetails}>
                Fill from service details
              </button>
            </div>
            <div className="sv-sec-body">
              <ServiceField def={HERO} value={hero} hideLabel onChange={(value) => setHero(asObj(value))} />
            </div>
          </section>

          {/* ---- chosen sections ---- */}
          <section className="sv-panel">
            <div className="sv-panel-head">
              <h3>Page sections</h3>
              <span className="sv-hint">{custom ? "Edit the content below." : "Use the arrows to change the order."}</span>
            </div>

            {sectionList.keys.length === 0 && (
              <p className="sv-empty-note">No sections yet. Pick one from the library to add it.</p>
            )}

            <div className="sv-sections">
              {sectionList.keys.map((key, index) => (
                <SectionCard
                  key={key}
                  def={SECTION_BY_KEY[key]}
                  index={index}
                  total={sectionList.keys.length}
                  value={sectionList.values[key]}
                  isOpen={Boolean(sectionList.open[key])}
                  isHidden={sectionList.hidden.includes(key)}
                  custom={custom}
                  onMove={(delta) => sectionList.move(index, delta)}
                  onToggleShown={() => sectionList.toggleShown(key)}
                  onToggleOpen={() => sectionList.toggleOpen(key)}
                  onRemove={() => sectionList.remove(key)}
                  onChange={(value) => sectionList.setValue(key, value)}
                />
              ))}
            </div>
          </section>
        </div>

        <SectionLibrary addedKeys={sectionList.keys} onAdd={sectionList.add} />
      </div>

      <div className="sv-savebar">
        <button type="button" className="ad-btn solid" disabled={saving} onClick={handleSave}>
          {saving ? "Saving…" : "Save service"}
        </button>
        <button type="button" className="ad-btn" disabled={saving} onClick={() => onDone()}>
          Cancel
        </button>
        {error && (
          <span className="sv-err" role="alert">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}