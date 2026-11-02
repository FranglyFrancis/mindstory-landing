import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contact from "./blocks/Contact";
import { NotFound } from "../NotFound";
import ServicePageView from "./ServicePageView";
import { fetchServiceBySlug } from "../../api/services";
import { RequestError } from "../../api/request";
import type { IService } from "../../api/services";

type Status = "loading" | "ready" | "notfound" | "error";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<IService | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!slug) {
      setStatus("notfound");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");

    fetchServiceBySlug(slug, controller.signal)
      .then((data) => {
        setService(data);
        setStatus("ready");
      })
      .catch((error) => {
        if (controller.signal.aborted) return; // the page changed or closed, nothing to show
        const missing = error instanceof RequestError && error.status === 404;
        setStatus(missing ? "notfound" : "error");
      });

    return () => controller.abort();
  }, [slug]);

  if (status === "loading") return <p role="status">Loading…</p>;
  if (status === "error") return <p role="alert">Unable to load this service right now. Please try again.</p>;
  if (status === "notfound" || !service) return <NotFound />;

  return (
    <>
      <ServicePageView service={service} />
      <Contact />
    </>
  );
}