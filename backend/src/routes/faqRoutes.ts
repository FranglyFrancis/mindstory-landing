import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listPublic, listAdmin, createFaq, updateFaq, deleteFaq } from "../controllers/faqController.js";

/* public: GET /api/faqs?page=home  -> [{ question, answer }]
   Skip this one if you already have a public FAQ route; just make it read from the Faq model. */
export const publicFaqRouter = Router();
publicFaqRouter.get("/", listPublic);

/* admin: everything needs a logged-in user */
export const adminFaqRouter = Router();
adminFaqRouter.use("/faqs", requireAuth);
adminFaqRouter.get("/faqs", listAdmin);
adminFaqRouter.post("/faqs", createFaq);
adminFaqRouter.put("/faqs/:id", updateFaq);
adminFaqRouter.delete("/faqs/:id", deleteFaq);
