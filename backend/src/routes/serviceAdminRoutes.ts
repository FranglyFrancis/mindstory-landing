import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listServices, getService, createService, updateService, deleteService } from "../controllers/serviceAdminController.js";

export const adminServiceRouter = Router();

adminServiceRouter.use("/service-pages", requireAuth);
adminServiceRouter.get("/service-pages", listServices);
adminServiceRouter.get("/service-pages/:id", getService);
adminServiceRouter.post("/service-pages", createService);
adminServiceRouter.put("/service-pages/:id", updateService);
adminServiceRouter.delete("/service-pages/:id", deleteService);
