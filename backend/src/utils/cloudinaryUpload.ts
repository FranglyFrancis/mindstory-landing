import { v2 as cloudinary } from "cloudinary";

/**
 * Uploads an image to Cloudinary and resolves with its https address (secure_url).
 * Cloudinary reads CLOUDINARY_URL from the environment, or whatever
 * cloudinary.config({...}) your Brands upload already set up at server start.
 */
export function uploadBuffer(buffer: Buffer, folder = "mindstory"): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => (err || !result ? reject(err ?? new Error("Upload failed")) : resolve(result.secure_url))
    );
    stream.end(buffer);
  });
}
