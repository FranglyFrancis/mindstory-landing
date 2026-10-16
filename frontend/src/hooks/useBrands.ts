import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { Brand } from "../types";

// What the API actually sends. The image is stored as "logo"; the name field is checked under a few likely names.
type ApiBrand = { logo?: string; image?: string; brand?: string; name?: string; title?: string };

/** Loads the brands you added in the admin panel. */
export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let ignore = false;

    fetch(`${API_URL}/api/brands`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((list: ApiBrand[]) => {
        if (ignore) return;
        // convert to the { image, brand } shape that Brands / BrandCard already use
        setBrands(
          list.map((b) => ({
            image: b.logo ?? b.image ?? "",
            brand: b.brand ?? b.name ?? b.title ?? "",
          })) as Brand[]
        );
        setStatus("ready");
      })
      .catch(() => { if (!ignore) setStatus("error"); });

    return () => { ignore = true; };
  }, []);

  return { brands, status };
}