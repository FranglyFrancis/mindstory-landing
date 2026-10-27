import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contact from "./blocks/Contact";
import { NotFound } from "../NotFound";
import ServicePageView from "./ServicePageView";
import type { ServiceData } from "./ServicePageView";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceData | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "notfound">("loading");

  useEffect(() => {
    let ignore = false;
    setStatus("loading");
    fetch(`${API_URL}/api/services/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: ServiceData) => {
        if (ignore) return;
        setService(data);
        setStatus("ok");
      })
      .catch(() => { if (!ignore) setStatus("notfound"); });
    return () => { ignore = true; };
  }, [slug]);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "notfound" || !service) return <NotFound />;

  return (
    <>
      <ServicePageView service={service} />
      <Contact />
    </>
  );
}