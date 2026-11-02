import { Router } from "express";
import { listPublic, getPublic } from "../controllers/serviceController.js";

/* ---------- public: GET /api/services and GET /api/services/:slug ---------- */
export const publicServiceRouter = Router();

publicServiceRouter.get("/", listPublic);
publicServiceRouter.get("/:slug", getPublic);