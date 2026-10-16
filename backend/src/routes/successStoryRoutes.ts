import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import {
  listPublic, getPublic, listAdmin, createStory, updateStory, deleteStory,
} from "../controllers/successStoryController.js";
import { uploadImage } from "../utils/cloudinary.js";


/* public: used by the website carousel */
export const publicSuccessRouter = Router();
publicSuccessRouter.get("/", listPublic);
publicSuccessRouter.get("/:slug", getPublic);

/* admin: everything here needs a logged-in user */
export const adminSuccessRouter = Router();

adminSuccessRouter.use("/success-stories", requireAuth);
adminSuccessRouter.get("/success-stories", listAdmin);
adminSuccessRouter.post("/success-stories", createStory);
adminSuccessRouter.put("/success-stories/:id", updateStory);
adminSuccessRouter.delete("/success-stories/:id", deleteStory);

adminSuccessRouter.post("/upload", requireAuth, (req: Request, res: Response) => {
     upload.single("file")(req, res, async (err: any) => {
       if (err) {
         const message = err.code === "LIMIT_FILE_SIZE" ? "Image must be under 5 MB" : err.message || "Upload failed";
         return res.status(400).json({ error: message });
       }
       if (!req.file) return res.status(400).json({ error: "Choose a PNG, JPG, WEBP or GIF image" });
       try {
         const url = await uploadImage(req.file.buffer);
         return res.json({ url });
       } catch (e: any) {
          console.error("Cloudinary upload error:", e);
          return res.status(500).json({ error: e?.message || e?.error?.message || "Upload failed" });
        }
     });
});
