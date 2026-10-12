import { useEffect, useState } from "react";
import {
  fetchServices,
  fetchServiceBySlug,
  type IService,
  type IServiceListItem,
} from "../api/services";

// For the services list (cards, menus)
export function useServices() {
  const [services, setServices] = useState<IServiceListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { services, loading, error };
}

// For a single service detail page
export function useService(slug?: string) {
  const [service, setService] = useState<IService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetchServiceBySlug(slug)
      .then(setService)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { service, loading, error };
}