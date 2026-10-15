import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../config";
import { imgSrc } from "../../utils/imgSrc";
import "./ProjectView.css";

type Story = {
  slug: string;
  projectName: string;
  projectDescription: string;
  projectHistory: string;
  projectImage: string;
  projectLogo: string;
  impact: string;
  challenges: string;
  strategyOverview: string;
  strategies?: { icon: string; title: string; description: string }[];
  resultsOverview: string;
  keyOutcomes?: { title: string }[];
  galleryEnabled?: boolean;
  gallery?: string[];
};

type State =
  | { status: "loading" }
  | { status: "missing" }
  | { status: "error" }
  | { status: "ready"; story: Story };

/** Textareas in the admin keep line breaks, so each line becomes its own paragraph. */
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n+/).map((p) => p.trim()).filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
    </>
  );
}

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const n = images.length;
  const go = (step: number) => setI((p) => (p + step + n) % n);

  return (
    <section className="pv-wrap pv-gallery" aria-roledescription="carousel" aria-label={`${name} gallery`}>
      <div className="pv-slide">
        <img src={imgSrc(images[i])} alt={`${name}, image ${i + 1} of ${n}`} />
        {n > 1 && (
          <>
            <button type="button" className="pv-nav prev" onClick={() => go(-1)} aria-label="Previous image"><Chevron dir="left" /></button>
            <button type="button" className="pv-nav next" onClick={() => go(1)} aria-label="Next image"><Chevron dir="right" /></button>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="pv-dots">
          {images.map((_, k) => (
            <button
              key={k}
              type="button"
              className={k === i ? "on" : ""}
              onClick={() => setI(k)}
              aria-label={`Show image ${k + 1}`}
              aria-current={k === i}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function ProjectView() {
  const { slug } = useParams();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!slug) return;
    let ignore = false;
    setState({ status: "loading" });

    fetch(`${API_URL}/api/success-stories/${encodeURIComponent(slug)}`)
      .then((r) => {
        if (r.status === 404) return null;
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        if (ignore) return;
        setState(data ? { status: "ready", story: data as Story } : { status: "missing" });
      })
      .catch(() => { if (!ignore) setState({ status: "error" }); });

    return () => { ignore = true; };
  }, [slug]);

  const story = state.status === "ready" ? state.story : null;

  // browser tab title
  useEffect(() => {
    if (!story) return;
    const previous = document.title;
    document.title = `${story.projectName} | Mindstory`;
    return () => { document.title = previous; };
  }, [story]);

  if (state.status === "loading") {
    return <main className="pv"><p className="pv-wrap pv-state" role="status">Loading…</p></main>;
  }

  if (!story) {
    return (
      <main className="pv">
        <div className="pv-wrap pv-state">
          <h1>{state.status === "missing" ? "Project not found" : "Something went wrong"}</h1>
          <p>{state.status === "missing" ? "This project doesn't exist or was removed." : "Please try again in a moment."}</p>
          <Link to="/">Back to home</Link>
        </div>
      </main>
    );
  }

  const strategies = story.strategies ?? [];
  const outcomes = story.keyOutcomes ?? [];
  const gallery = story.galleryEnabled ? (story.gallery ?? []) : [];

  return (
    <main className="pv">
      {/* title + short description */}
      <section className="pv-hero">
        <div className="pv-wrap pv-hero-grid">
          <h1>{story.projectName}</h1>
          <p className="pv-lead">{story.projectDescription}</p>
        </div>
      </section>

      <svg className="pv-wave" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 34 C 220 0, 560 66, 1000 18 L1000 60 L0 60 Z" />
      </svg>

      {/* history + logo + project image */}
      <section className="pv-grey">
        <div className="pv-wrap pv-history">
          <div className="pv-text"><Paragraphs text={story.projectHistory} /></div>
          {story.projectLogo && (
            <div className="pv-logo"><img src={imgSrc(story.projectLogo)} alt={`${story.projectName} logo`} /></div>
          )}
        </div>
      </section>

      {/* impact | challenges */}
      <section className="pv-wrap pv-section pv-two">
        <article className="pv-card">
          <h2>Impact of Mindstory</h2>
          <Paragraphs text={story.impact} />
        </article>
        <article className="pv-card">
          <h2>Challenges Faced</h2>
          <Paragraphs text={story.challenges} />
        </article>
      </section>

      {/* strategy */}
      <section className="pv-wrap pv-section">
        <h2 className="pv-h2">Strategy and Implementation</h2>
        <div className="pv-text"><Paragraphs text={story.strategyOverview} /></div>
        {strategies.length > 0 && (
          <ul className="pv-icons">
            {strategies.map((s, i) => (
              <li key={i}>
                {s.icon && <span className="pv-icon"><img src={imgSrc(s.icon)} alt="" /></span>}
                <div>
                  <h3>{s.title}</h3>
                  {s.description && <p>{s.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
     
      {/* results | key outcomes */}
      <section className={`pv-wrap pv-section pv-two ${outcomes.length ? "" : "pv-single"}`}>
        <article className="pv-card">
          <h2>Results and Impact</h2>
          <Paragraphs text={story.resultsOverview} />
        </article>
        {outcomes.length > 0 && (
          <article className="pv-card">
            <h2>Key Outcomes</h2>
            <ul className="pv-outcomes">
              {outcomes.map((o, i) => <li key={i}>{o.title}</li>)}
            </ul>
          </article>
        )}
      </section>

       {/* gallery */}
      {gallery.length > 0 && <Gallery key={story.slug} images={gallery} name={story.projectName} />}
    </main>
  );
}
