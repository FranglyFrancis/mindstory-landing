import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { uploadImageFile } from "../controllers/uploadController.js";

export const adminImageUploadRouter = Router();

// POST /api/admin/upload-image (multipart field name: "file") -> { url }
adminImageUploadRouter.post("/upload-image", requireAuth, upload.single("file"), uploadImageFile);