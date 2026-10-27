import './Testimonials.css';
import { useEffect, useMemo, useRef, useState } from "react";
import google from "/images/googleR.svg";
import { API_URL } from "../../../config";
import { testimonials as fallback } from '../../../data/home/TestimonialsList';
import TestimonialCard from './TestimonialCard';

type Review = {
    id: number | string;
    name: string;
    text: string;
    rating?: number;
    photo?: string;
    when?: string;
};

// Your Google listing link (the "Based on N reviews" text points here)
const GOOGLE_LISTING_URL = "https://www.google.com/maps/place/?q=place_id:YOUR_PLACE_ID";

const SPEED = 40; // scroll speed in pixels per second

function Testimonials() {
    const [reviews, setReviews] = useState<Review[]>(fallback);
    const [rating, setRating] = useState<number | null>(null);
    const [total, setTotal] = useState<number>(109);

    const trackRef = useRef<HTMLDivElement>(null);
    const pausedRef = useRef(false);

    useEffect(() => {
        fetch(`${API_URL}/api/reviews`)
            .then(r => (r.ok ? r.json() : Promise.reject()))
            .then(d => {
                if (d.reviews?.length) setReviews(d.reviews);
                if (d.rating) setRating(d.rating);
                if (d.total) setTotal(d.total);
            })
            .catch(() => { /* keep the static fallback list */ });
    }, []);

    // Repeat enough cards to fill wide screens, then double the set for a seamless loop
    const loop = useMemo(() => {
        const copies = Math.max(1, Math.ceil(8 / Math.max(reviews.length, 1)));
        const base = Array.from({ length: copies }, () => reviews).flat();
        return [...base, ...base];
    }, [reviews]);

    // Auto scroll (JS driven, so no CSS animation or OS setting can switch it off)
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let offset = 0;
        let last = performance.now();
        let raf = 0;

        const step = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.1);
            last = now;

            if (!pausedRef.current) {
                offset += SPEED * dt;
                const half = track.scrollWidth / 2; // width of one full set of cards
                if (half > 0 && offset >= half) offset -= half;
                track.style.transform = `translate3d(${-offset}px, 0, 0)`;
            }
            raf = requestAnimationFrame(step);
        };

        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [loop]);

    return (
        <section className="testimonial">
            <div className="testimonial-heading">
                <h2>Experiences of our delighted customers</h2>
            </div>

            <div className="google-rating">
                <h3>EXCELLENT</h3>
                <div className="google-stars">★ ★ ★ ★ ★</div>
                <p>
                    <a href={GOOGLE_LISTING_URL} target="_blank" rel="noopener noreferrer">
                        {rating ? `${rating.toFixed(1)} · ` : ""}Based on {total} reviews
                    </a>
                </p>
                <div className="google-logos">
                    <img src={google} alt="Posted on Google" className="google-logo" />
                </div>
            </div>

            <div
                className="reviews-wrapper"
                onMouseEnter={() => (pausedRef.current = true)}
                onMouseLeave={() => (pausedRef.current = false)}
                onTouchStart={() => (pausedRef.current = true)}
                onTouchEnd={() => (pausedRef.current = false)}
            >
                <div className="reviews-container" ref={trackRef}>
                    {loop.map((review, i) => (
                        <TestimonialCard
                            key={`${review.id}-${i}`}
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

export default Testimonials;
