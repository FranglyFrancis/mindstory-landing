// Local dev: talk to the backend on port 5000.
// Production: the API is on the same domain, so use a relative URL.
export const API_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL ?? "http://localhost:5000")
  : "";