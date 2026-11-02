// src/hooks/useAllFaqs.ts
import { useEffect, useState } from "react";
import { API_URL } from "../config";

export type FaqRow = { page: string; question: string; answer: string; order: number };

export function useAllFaqs() {
  const [faqs, setFaqs] = useState<FaqRow[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let ignore = false;
    fetch(`${API_URL}/api/faqs`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: FaqRow[]) => { if (!ignore) { setFaqs(d); setStatus("ready"); } })
      .catch(() => { if (!ignore) setStatus("error"); });
    return () => { ignore = true; };
  }, []);

  return { faqs, status };
}