import { Children, isValidElement, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const EDGE_TOLERANCE_PX = 1;

const prefersReducedMotion = (): boolean => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

type ServiceCarouselProps = {
  children: ReactNode;
  label: string;
};

/** Cards in a swipeable row with Previous / Next buttons. Scrolls by a whole set of visible cards. */
export default function ServiceCarousel({ children, label }: ServiceCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ atStart: true, atEnd: false });
  const slides = Children.toArray(children);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setEdge({
      atStart: track.scrollLeft <= EDGE_TOLERANCE_PX,
      atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - EDGE_TOLERANCE_PX,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateEdges();
    track.addEventListener("scroll", updateEdges, { passive: true });
    const resizeObserver = new ResizeObserver(updateEdges);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener("scroll", updateEdges);
      resizeObserver.disconnect();
    };
  }, [updateEdges, slides.length]);

  function scrollByPage(direction: 1 | -1) {
    const track = trackRef.current;
    const firstSlide = track?.querySelector<HTMLElement>(".expertise-slide");
    if (!track || !firstSlide) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = firstSlide.offsetWidth + gap; // one card
    const visible = Math.max(1, Math.floor((track.clientWidth + gap) / step + 0.01)); // cards on screen

    track.scrollBy({
      left: direction * visible * step,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
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
        {slides.map((child, index) => (
          <div
            className="expertise-slide"
            key={isValidElement(child) && child.key !== null ? child.key : index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="expertise-nav">
        <button
          type="button"
          className="expertise-arrow"
          aria-label="Previous services"
          disabled={edge.atStart}
          onClick={() => scrollByPage(-1)}
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          className="expertise-arrow"
          aria-label="Next services"
          disabled={edge.atEnd}
          onClick={() => scrollByPage(1)}
        >
          <Chevron dir="right" />
        </button>
      </div>
    </>
  );
}