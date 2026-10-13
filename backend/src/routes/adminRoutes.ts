import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { login, listAll, create, update, remove } from "../controllers/adminController.js";

const router = Router();
router.post("/login", login);
router.get("/services", requireAdmin, listAll);
router.post("/services", requireAdmin, create);
router.put("/services/:id", requireAdmin, update);
router.delete("/services/:id", requireAdmin, remove);
export default router;