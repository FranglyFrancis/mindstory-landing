import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { uploadImageFile } from "../controllers/uploadController.js";
import {
  listPublic,
  getPublic,
  listAdmin,
  createStory,
  updateStory,
  deleteStory,
} from "../controllers/successStoryController.js";


/* ---------- public: used by the website carousel ---------- */
export const publicSuccessRouter = Router();

publicSuccessRouter.get("/", listPublic);
publicSuccessRouter.get("/:slug", getPublic);

/* ---------- admin: mounted at /api/admin, everything needs a logged-in user ---------- */
export const adminSuccessRouter = Router();

adminSuccessRouter.use("/success-stories", requireAuth);
adminSuccessRouter.get("/success-stories", listAdmin);
adminSuccessRouter.post("/success-stories", createStory);
adminSuccessRouter.put("/success-stories/:id", updateStory);
adminSuccessRouter.delete("/success-stories/:id", deleteStory);
// POST /api/admin/upload (multipart field name: "file") -> { url }
adminSuccessRouter.post("/upload", requireAuth, upload.single("file"), uploadImageFile);