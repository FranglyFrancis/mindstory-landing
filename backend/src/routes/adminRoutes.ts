import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { login, listAll, create, update, remove } from "../controllers/adminController.js";

const router = Router();
router.post("/login", login);
router.get("/services", requireAdmin, listAll);
router.post("/services", requireAdmin, create);
router.put("/services/:id", requireAdmin, update);
router.delete("/services/:id", requireAdmin, remove);

router.get("/debug", (_req, res) => {
  const p = process.env.ADMIN_PASSWORD ?? "";
  res.json({
    passwordSet: p.length > 0,
    length: p.length,
    firstChar: p[0] ?? null,
    lastChar: p[p.length - 1] ?? null,
    hasSpace: /\s/.test(p),
    hasQuote: /["']/.test(p),
    jwtSecretSet: !!process.env.JWT_SECRET,
  });
});

export default router;