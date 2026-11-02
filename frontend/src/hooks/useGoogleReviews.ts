import { useEffect, useState } from "react";
import { request } from "../api/request";
import { testimonials as fallback } from "../data/home/TestimonialsList";

export type Review = {
  id: number | string;
  name: string;
  text: string;
  rating?: number;
  photo?: string;
  when?: string;
};

type ReviewsResponse = {
  reviews?: Review[];
  rating?: number;
  total?: number;
};

const DEFAULT_TOTAL = 109;

/** Live Google reviews from the backend. If that fails, the built-in list stays on screen. */
export function useGoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>(fallback);
  const [rating, setRating] = useState<number | null>(null);
  const [total, setTotal] = useState<number>(DEFAULT_TOTAL);

  useEffect(() => {
    const controller = new AbortController();

    request<ReviewsResponse>("/api/reviews", controller.signal)
      .then((data) => {
        if (data.reviews?.length) setReviews(data.reviews);
        if (data.rating) setRating(data.rating);
        if (data.total) setTotal(data.total);
      })
      .catch(() => {
        /* keep the static fallback list */
      });

    return () => controller.abort();
  }, []);

  return { reviews, rating, total };
}