import './Expertise.css';
import '../Card.css';
import './ExpertiseCarousel.css';   
import { useServices } from '../../../hooks/useServices';
import type { ServiceListItem } from '../../../hooks/useServices';
import { imgSrc } from '../../../utils/imgSrc';

import { Children, useCallback, useEffect, useRef, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import ExpertiseItem from './ExpertiseItem';

// the item shape your ExpertiseItem card already expects
type ExpertiseListItem = ComponentProps<typeof ExpertiseItem>["list"];

// service from the database -> card. If ExpertiseItem reads other fields, add them here.
const toItem = (s: ServiceListItem) =>
  ({
    id: s.slug,
    title: s.title,
    image: imgSrc(s.image),
    url: `${s.slug}`,
  }) as unknown as ExpertiseListItem;

// up to this many services stay in the normal row; one more and they become a carousel
const MAX_IN_ROW = 4;

/* ---------- carousel ---------- */

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

/** Cards in a swipeable row with Previous / Next buttons. Scrolls by a whole set of visible cards. */
function Carousel({ children, label }: { children: ReactNode; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ atStart: true, atEnd: false });
  const slides = Children.toArray(children);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdge({
      atStart: el.scrollLeft <= 1,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", update); ro.disconnect(); };
  }, [update, slides.length]);

  function go(dir: 1 | -1) {
    const el = trackRef.current;
    const first = el?.querySelector<HTMLElement>(".expertise-slide");
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = first.offsetWidth + gap;                                        // one card
    const visible = Math.max(1, Math.floor((el.clientWidth + gap) / step + 0.01)); // cards on screen
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * visible * step, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <>
      <div
        className="expertise-track"
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
      >
        {slides.map((child, i) => (
          <div
            className="expertise-slide"
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="expertise-nav">
        <button type="button" className="expertise-arrow" aria-label="Previous services" disabled={edge.atStart} onClick={() => go(-1)}>
          <Chevron dir="left" />
        </button>
        <button type="button" className="expertise-arrow" aria-label="Next services" disabled={edge.atEnd} onClick={() => go(1)}>
          <Chevron dir="right" />
        </button>
      </div>
    </>
  );
}

/* ---------- section ---------- */

function Expertise() {
  const [showCards, setShowCards] = useState(false);
  const { services } = useServices();

  const cardsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCards(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const asCarousel = services.length > MAX_IN_ROW;

  const cards = services.map(service => (
    <ExpertiseItem key={service.slug} list={toItem(service)} />
  ));

  return (
    <>
      <div className="custom-shape-divider-bottom-1788602044">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          />
        </svg>
      </div>

      <section className="expertise">
        <div className="expertise-container">

          <div>
            <h2 className="expertise-heading">
              Our Expertise in Digital Marketing
            </h2>

            <p className='expertise-desc'>
              At Mindstory, a top digital marketing agency in Kerala, we know how to use every type of digital marketing to boost your brand’s online presence.
            </p>
          </div>

          {/* same element either way (so the scroll-in animation keeps working); only its classes change */}
          <div
            ref={cardsRef}
            className={`${asCarousel ? "expertise-carousel" : "card-row cards-view"} ${
              showCards ? "cards-slide-up show" : "cards-slide-up"
            }`}
          >
            {asCarousel ? <Carousel label="Our services">{cards}</Carousel> : cards}
          </div>
        </div>
      </section>

      <div className="custom-shape-divider-top-1788603175">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          />
        </svg>
      </div>
    </>
  );
}

export default Expertise;
