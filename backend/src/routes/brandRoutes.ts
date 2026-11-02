import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getBrands, createBrand, updateBrand, deleteBrand } from "../controllers/brandController.js";

const router = Router();

/* ---------- public ---------- */
router.get("/", getBrands);

/* ---------- admin: needs a logged-in user ---------- */
router.post("/", requireAuth, createBrand);
router.put("/:id", requireAuth, updateBrand);
router.delete("/:id", requireAuth, deleteBrand);

export default router;