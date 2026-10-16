import { Router, Request, Response } from "express";
import multer from "multer";
import { requireAuth } from "../middleware/auth.js";
import { uploadBuffer } from "../utils/cloudinaryUpload.js";

const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif"];

// the file is held in memory just long enough to hand it to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, ALLOWED.includes(file.mimetype)),
});

export const adminImageUploadRouter = Router();

// POST /api/admin/upload-image   (multipart field name: "file")  ->  { url: "https://res.cloudinary.com/..." }
adminImageUploadRouter.post("/upload-image", requireAuth, (req: Request, res: Response) => {
  upload.single("file")(req, res, async (err: any) => {
    if (err) {
      const text = err.code === "LIMIT_FILE_SIZE" ? "Image must be under 5 MB" : "Upload failed";
      return res.status(400).json({ error: text });
    }
    if (!req.file) return res.status(400).json({ error: "Choose a PNG, JPG, WEBP or GIF image" });

    try {
      res.json({ url: await uploadBuffer(req.file.buffer) });
    } catch (e) {
      console.error(e);
      res.status(502).json({ error: "Could not upload the image. Please try again." });
    }
  });
});
