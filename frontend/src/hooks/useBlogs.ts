import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { imgSrc } from "../utils/imgSrc";
import type { Blog } from "../types";   // { id: number; image; title; description; url }

// What the API sends for each blog (the same fields you fill in on the admin Blogs page).
type ApiBlog = {
  _id: string;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  featured?: boolean;
  order?: number;
  createdAt?: string;
};

// Admin rule: lower order numbers show first, and blogs with the same order show newest first.
function byOrder(a: ApiBlog, b: ApiBlog): number {
  const o = (a.order ?? 0) - (b.order ?? 0);
  if (o !== 0) return o;
  return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
}

/** Loads the blogs you added in the admin panel. Pass { featuredOnly: true } for the home page section. */
export function useBlogs({ featuredOnly = false }: { featuredOnly?: boolean } = {}) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let ignore = false;
    const query = featuredOnly ? "?featured=true" : "";

    const url = `${API_URL}/api/blogs${query}`;

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`GET ${url} returned ${r.status}`);
        return r.json();
      })
      .then((data: ApiBlog[] | { blogs?: ApiBlog[]; data?: ApiBlog[] }) => {
        if (ignore) return;
        // accept a plain array, or an object that wraps the array
        const all = Array.isArray(data) ? data : data.blogs ?? data.data ?? [];
        const shown = all
          .filter((b) => !featuredOnly || b.featured !== false)   // safe even if the server ignores ?featured=true
          .sort(byOrder)
          .map((b, i): Blog => ({
            id: i + 1,                                  // your Blog type needs a number; the card only uses it as a list key
            image: imgSrc(b.image ?? ""),               // handles Cloudinary links and old /uploads paths
            title: b.title ?? "",
            description: b.description ?? "",
            url: b.url ?? "",
          }));

        if (shown.length === 0) console.warn(`useBlogs: ${url} returned ${all.length} blog(s), ${shown.length} to show`);
        setBlogs(shown);
        setStatus("ready");
      })
      .catch((e) => {
        console.error("useBlogs failed:", e);
        if (!ignore) setStatus("error");
      });

    return () => { ignore = true; };
  }, [featuredOnly]);

  return { blogs, status };
}