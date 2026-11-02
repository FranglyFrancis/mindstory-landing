import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadImage } from "../utils/cloudinary.js";

const NO_IMAGE_MESSAGE = "Choose a PNG, JPG, WEBP or GIF image";
const UPLOAD_FAILED_MESSAGE = "Could not upload the image. Please try again.";

// Runs after multer, so the file is in req.file. Responds with { url: "https://res.cloudinary.com/..." }
export const uploadImageFile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: NO_IMAGE_MESSAGE });
    return;
  }

  try {
    res.json({ url: await uploadImage(req.file.buffer) });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(502).json({ error: UPLOAD_FAILED_MESSAGE });
  }
});