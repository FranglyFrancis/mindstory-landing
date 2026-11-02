import { API_URL } from "../config";

/** Thrown when the server answers with an error status. status is 0 if the server could not be reached. */
export class RequestError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "RequestError";
    this.status = status;
  }
}

/** GET a public API path and return the parsed JSON. Pass a signal to cancel the request (for example in a hook cleanup). */
export async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, { signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new RequestError("Can't reach the server.", 0);
  }

  if (!response.ok) throw new RequestError(`Request failed: ${response.status}`, response.status);
  return response.json() as Promise<T>;
}