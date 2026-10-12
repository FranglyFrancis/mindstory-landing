import { useEffect, useState } from "react";
import { fetchFaqs, type IFaqItem } from "../api/faqs";

export function useFaqs(page: string) {
  const [faqs, setFaqs] = useState<IFaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFaqs(page)
      .then(setFaqs)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page]);

  return { faqs, loading, error };
}