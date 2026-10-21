import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  listPublic, getPublic, listAdmin, createService, updateService, deleteService,
} from "../controllers/serviceController.js";

/* public: GET /api/services  and  GET /api/services/:slug */
export const publicServiceRouter = Router();
publicServiceRouter.get("/", listPublic);
publicServiceRouter.get("/:slug", getPublic);
