import { API_URL } from "../config";

const TOKEN_KEY = "admin-token";
const NETWORK_ERROR_MESSAGE = "Can't reach the server. Check your connection and try again.";

/** Fired when the server answers 401, so the app can drop back to the login page. */
export const UNAUTHORIZED_EVENT = "admin-unauthorized";

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin";
  active: boolean;
  createdAt?: string;
};

/** Thrown for every failed request. status is 0 when the server could not be reached. */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/* ---------- token (kept per tab, gone when the tab closes) ---------- */
export const getToken = (): string => {
  try {
    return sessionStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
};

export const setToken = (token: string): void => {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* storage unavailable */
  }
};

export const clearToken = (): void => {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable */
  }
};

/* ---------- requests ---------- */
function buildHeaders(options: RequestInit, token: string): Headers {
  const headers = new Headers(options.headers);

  // For FormData the browser sets its own Content-Type (with the upload boundary).
  if (options.body instanceof FormData) {
    headers.delete("Content-Type");
  } else if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) headers.set("Authorization", `Bearer ${token}`);
  return headers;
}

/** Calls /api/admin<path> with the saved login token. Resolves with the parsed JSON body. */
// The default type stays loose so existing pages keep compiling; pass a type, e.g. api<Brand[]>("/brands").
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function api<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/admin${path}`, {
      ...options,
      headers: buildHeaders(options, token),
    });
  } catch {
    throw new ApiError(NETWORK_ERROR_MESSAGE, 0);
  }

  const body: unknown = await response.json().catch(() => ({}));

  if (response.status === 401 && token) {
    clearToken();
    window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
  }

  if (!response.ok) {
    const message = (body as { error?: string }).error ?? `HTTP ${response.status}`;
    throw new ApiError(message, response.status);
  }

  return body as T;
}

/** Turns anything thrown into text that is safe to show the user. */
export const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Something went wrong. Please try again.";