import { useEffect, useState } from "react";
import { API_URL } from "../config";

/** The address of a service page on your website is `${SERVICE_PATH}/<slug>`. Change it here if your route is different. */
export const SERVICE_PATH = "/services";

export type ServiceListItem = {
  slug: string;
  title: string;
  description: string;
  image: string;
  order: number;
  category?: string;
  cardTitle?: string; 
  cardImage?: string;
};


/** Loads the services you created in the admin panel, ordered by their Order number. */
export function useServices() {
  const [services, setServices] = useState<ServiceListItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let ignore = false;

    fetch(`${API_URL}/api/services`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((list: ServiceListItem[]) => {
        if (ignore) return;
        setServices(list);
        setStatus("ready");
      })
      .catch(() => { if (!ignore) setStatus("error"); });

    return () => { ignore = true; };
  }, []);

  return { services, status };
}