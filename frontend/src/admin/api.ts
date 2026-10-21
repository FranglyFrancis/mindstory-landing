import { API_URL } from "../config";

const KEY = "admin-token";

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin";
  active: boolean;
  createdAt?: string;
};

export const getToken = () => sessionStorage.getItem(KEY) ?? "";
export const setToken = (t: string) => sessionStorage.setItem(KEY, t);
export const clearToken = () => sessionStorage.removeItem(KEY);

export async function api<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers = new Headers(options.headers);

  // Only set JSON content type when the body is not FormData
  if (options.body instanceof FormData) {
    headers.delete("Content-Type");
  } else if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  console.log(path)
  const res = await fetch(`${API_URL}/api/admin${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && token) {
    clearToken();
    window.dispatchEvent(new Event("admin-unauthorized"));
  }

  if (!res.ok) {
    throw new Error(data.error ?? `HTTP ${res.status}`);
  }

  return data;
}