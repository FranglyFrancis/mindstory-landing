import { Router } from "express";
import { getBrands, createBrand, updateBrand, deleteBrand } from "../controllers/brandController.js";
// Use the same admin-auth middleware your other protected routes use (for example the one on /success-stories).
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", getBrands);                       
router.post("/", requireAuth, createBrand);      
router.put("/:id", requireAuth, updateBrand);
router.delete("/:id", requireAuth, deleteBrand);

export default router;
