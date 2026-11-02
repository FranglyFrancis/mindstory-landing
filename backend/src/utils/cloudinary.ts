import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

const DEFAULT_FOLDER = "mindstory";

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
});

/** Uploads an image buffer to Cloudinary and returns its public https URL. */
export function uploadImage(buffer: Buffer, folder = DEFAULT_FOLDER): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: "image" }, (error, result) => {
        if (error || !result) {
          reject(new Error(error?.message ?? "Upload failed"));
          return;
        }
        resolve(result.secure_url);
      })
      .end(buffer);
  });
}