import { api } from "./api";

export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

const MAX_IMAGE_MB = 5;
const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;
const DEFAULT_UPLOAD_PATH = "/upload-image";

/** Returns an error message, or an empty string when the file is fine. */
export function checkImageFile(file: File): string {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return "Use a PNG, JPG, WEBP or GIF image.";
  if (file.size > MAX_IMAGE_BYTES) return `Image must be under ${MAX_IMAGE_MB} MB.`;
  return "";
}

/** Uploads the file to the server and returns the stored image URL. */
export async function uploadImageFile(file: File, path = DEFAULT_UPLOAD_PATH): Promise<string> {
  const body = new FormData();
  body.append("file", file);

  const { url } = await api<{ url: string }>(path, { method: "POST", body });
  return url;
}