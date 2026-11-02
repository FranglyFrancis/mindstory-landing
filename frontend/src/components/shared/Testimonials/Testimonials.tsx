import "./Testimonials.css";
import TestimonialCard from "./TestimonialCard";
import { useGoogleReviews } from "../../../hooks/useGoogleReviews";
import type { Review } from "../../../hooks/useGoogleReviews";
import { useMarquee } from "../../../hooks/useMarquee";
import { useMemo } from "react";

const GOOGLE_LOGO_SRC = "/images/googleR.svg"; // in the public folder; the name must match letter for letter

// Your Google Place ID, from Google's Place ID Finder. It looks like ChIJ...
const GOOGLE_PLACE_ID = "ChIJabIEWi3upzsRcxnKa3mvl4M";
const GOOGLE_LISTING_URL = `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`;

const SCROLL_SPEED = 40; // pixels per second
const MIN_CARDS_IN_ROW = 8; // enough to fill wide screens

// Repeat the cards to fill wide screens, then double the set for a seamless loop.
function buildLoop(reviews: Review[]): Review[] {
  const copies = Math.max(1, Math.ceil(MIN_CARDS_IN_ROW / Math.max(reviews.length, 1)));
  const base = Array.from({ length: copies }, () => reviews).flat();
  return [...base, ...base];
}

export default function Testimonials() {
  const { reviews, rating, total } = useGoogleReviews();
  const loop = useMemo(() => buildLoop(reviews), [reviews]);
  const { trackRef, pause, resume } = useMarquee<HTMLDivElement>(SCROLL_SPEED, loop);

  return (
    <section className="testimonial">
      <div className="testimonial-heading">
        <h2>Experiences of our delighted customers</h2>
      </div>

      <div className="google-rating">
        <h3>EXCELLENT</h3>
        <div className="google-stars" aria-hidden="true">
          ★ ★ ★ ★ ★
        </div>
        <p>
          <a href={GOOGLE_LISTING_URL} target="_blank" rel="noopener noreferrer">
            {rating ? `${rating.toFixed(1)} · ` : ""}Based on {total} reviews
          </a>
        </p>
        <div className="google-logos">
          <img src={GOOGLE_LOGO_SRC} alt="Posted on Google" className="google-logo" />
        </div>
      </div>

      <div
        className="reviews-wrapper"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        <div className="reviews-container" ref={trackRef}>
          {loop.map((review, index) => (
            <TestimonialCard
              key={`${review.id}-${index}`}
              name={review.name}
              text={review.text}
              rating={review.rating}
              photo={review.photo}
              when={review.when}
            />
          ))}
        </div>
      </div>
    </section>
  );
}