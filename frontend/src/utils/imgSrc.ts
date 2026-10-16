import { API_URL } from "../config";

export const imgSrc = (u: string) => (/^https?:\/\//i.test(u) ? u : `${API_URL}${u}`);