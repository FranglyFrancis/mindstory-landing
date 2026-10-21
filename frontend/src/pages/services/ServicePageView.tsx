import { Fragment } from "react";
import type { ReactNode } from "react";
import type { IService } from "../../api/services";
import CommonHero from "./CommonHero";
import IconList from "./blocks/IconList";
import TransparentCard from "./blocks/TransparentCard";
import { imgSrc } from "../../utils/imgSrc";
import "./ServicePageView.css";

/** IService plus the two fields the admin panel saves for the page layout. Add them to IService when you like. */
export type ServiceData = IService & { sectionOrder?: string[]; hiddenSections?: string[] };

// does this value hold anything worth showing?
const has = (v: unknown): boolean =>
  Array.isArray(v) ? v.length > 0
  : v && typeof v === "object" ? Object.values(v).some(has)
  : typeof v === "string" ? v.trim() !== ""
  : false;

/* One renderer per section. The key is the section name used in the admin panel and the database. */
const BLOCKS: Record<string, (s: ServiceData) => ReactNode> = {
  mainImage: (s) => (
    <section className="sb-block sb-main">
      <img src={imgSrc(s.mainImage ?? "")} alt={s.title} />
    </section>
  ),

  heading: (s) => (
    <section className="sb-block centered-section">
      <h2 className="sb-title">{s.heading?.title}</h2>
      {s.heading?.description && <p className="centered-desc">{s.heading.description}</p>}
    </section>
  ),

  intro: (s) => (
    <section className="sb-block">
      <h2 className="sb-title">{s.intro?.title}</h2>
      <div className="sb-two">
        <p className="justified-text">{s.intro?.left}</p>
        <p className="justified-text">{s.intro?.right}</p>
      </div>
    </section>
  ),

  article: (s) => (
    <section className="sb-block paragraph justified-text">
      {s.article?.title && <h3>{s.article.title}</h3>}
      {(s.article?.descriptions ?? []).map((p, i) => <p key={i}>{p}</p>)}
    </section>
  ),

  lists: (s) => (
    <section className="sb-block list-item section-division">
      {(s.lists ?? []).map((l, i) => (
        <IconList key={i} icon={l.icon} title={l.title} description={l.description} />
      ))}
    </section>
  ),

  iconCards: (s) => (
    <section className="sb-block cards-container">
      {(s.iconCards ?? []).map((c, i) => (
        <TransparentCard key={i} icon={c.icon} title={c.title} description={c.description} />
      ))}
    </section>
  ),

  titleCards: (s) => (
    <section className="sb-block sb-cards">
      {(s.titleCards ?? []).map((c, i) => (
        <article key={i} className="sb-card">
          <h3>{c.title}</h3>
          <p>{c.description}</p>
        </article>
      ))}
    </section>
  ),

  titleItem: (s) => (
    <section className="sb-block sb-cards">
      {(s.titleItem ?? []).map((c, i) => (
        <article key={i} className="sb-card sb-card-image">
          {c.image && <img src={imgSrc(c.image)} alt="" loading="lazy" />}
          <h3>{c.title}</h3>
          <p>{c.description}</p>
        </article>
      ))}
    </section>
  ),

  imageItem: (s) => (
    <section className="sb-block sb-imageitem">
      {s.imageItem?.image && <img src={imgSrc(s.imageItem.image)} alt="" loading="lazy" />}
      <p className="justified-text">{s.imageItem?.description}</p>
    </section>
  ),

  paraItem: (s) => (
    <section className="sb-block paragraph justified-text">
      {(s.paraItem ?? []).map((p, i) => <p key={i}>{p.description}</p>)}
    </section>
  ),

  features: (s) => (
    <section className="sb-block">
      {(s.features ?? []).map((f, i) => (
        <article key={i} className={`sb-feature ${f.imagePosition === "right" ? "is-right" : ""}`}>
          {f.image && <img src={imgSrc(f.image)} alt="" loading="lazy" />}
          <div>
            {f.title && <h3>{f.title}</h3>}
            <p className="justified-text">{f.description}</p>
          </div>
        </article>
      ))}
    </section>
  ),

  sections: (s) => (
    <section className="sb-block">
      {(s.sections ?? []).map((g, i) => (
        <article key={i} className="sb-group">
          {g.image && <img src={imgSrc(g.image)} alt="" loading="lazy" />}
          <div>
            <h3>{g.title}</h3>
            {(g.content ?? []).map((c, j) => (
              <div key={j} className="sb-content">
                <h4>{c.title}</h4>
                <p>{c.description}</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  ),

  brands: (s) => (
    <section className="sb-block">
      <ul className="sb-brands">
        {(s.brands ?? []).map((b, i) => (
          <li key={i}>
            <img src={imgSrc(b.image)} alt={b.brand} loading="lazy" />
          </li>
        ))}
      </ul>
    </section>
  ),

  faqs: (s) => (
    <section className="sb-block sb-faqs">
      <h2 className="sb-title">Frequently Asked Questions</h2>
      {(s.faqs ?? []).map((q, i) => (
        <details key={i}>
          <summary>{q.question}</summary>
          <p>{q.answer}</p>
        </details>
      ))}
    </section>
  ),
};

const KEYS = Object.keys(BLOCKS);

/** Sections with content, in the order saved in the admin, minus the ones switched off. */
function visibleKeys(s: ServiceData): string[] {
  const data = s as unknown as Record<string, unknown>;
  const present = KEYS.filter((k) => has(data[k]));
  const saved = (s.sectionOrder ?? []).filter((k) => present.includes(k));
  const hidden = s.hiddenSections ?? [];
  return [...saved, ...present.filter((k) => !saved.includes(k))].filter((k) => !hidden.includes(k));
}

export default function ServicePageView({ service }: { service: ServiceData }) {
  // the hero is required in the admin; older services without one fall back to their card details
  const hero = {
    title: service.hero?.title || service.title,
    description: service.hero?.description || service.description,
    image: service.hero?.image || service.image,
  };

  return (
    <>
      <CommonHero image={hero.image} title={hero.title} description={hero.description} />
      <div className="sb-page">
        {visibleKeys(service).map((k) => (
          <Fragment key={k}>{BLOCKS[k](service)}</Fragment>
        ))}
      </div>
    </>
  );
}
