import { API_URL } from "../config";

/** Uploaded images are stored as "/uploads/<file>" and served by the API; everything else (full URLs, /images/...) is used as is. */
export const imgSrc = (url: string) => (url.startsWith("/uploads/") ? `${API_URL}${url}` : url);
