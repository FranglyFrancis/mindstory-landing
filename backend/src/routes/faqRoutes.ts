import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listPublic, listAdmin, createFaq, updateFaq, deleteFaq } from "../controllers/faqController.js";

/* ---------- public: GET /api/faqs?page=home ---------- */
export const publicFaqRouter = Router();

publicFaqRouter.get("/", listPublic);

/* ---------- admin: mounted at /api/admin, everything needs a logged-in user ---------- */
export const adminFaqRouter = Router();

adminFaqRouter.use("/faqs", requireAuth);
adminFaqRouter.get("/faqs", listAdmin);
adminFaqRouter.post("/faqs", createFaq);
adminFaqRouter.put("/faqs/:id", updateFaq);
adminFaqRouter.delete("/faqs/:id", deleteFaq);