import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth, requireSuperAdmin } from "../middleware/auth.js";
import { login, me, forgotPassword, resetPassword } from "../controllers/authController.js";
import { listUsers, createUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = Router();

// slows down password guessing and email spamming
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts. Try again in 15 minutes." },
});

// public
router.post("/login", authLimiter, login);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);

// any logged-in admin
router.get("/me", requireAuth, me);

// super admin only: manage who can log in
router.get("/users", requireAuth, requireSuperAdmin, listUsers);
router.post("/users", requireAuth, requireSuperAdmin, createUser);
router.put("/users/:id", requireAuth, requireSuperAdmin, updateUser);
router.delete("/users/:id", requireAuth, requireSuperAdmin, deleteUser);

export default router;

/*
  ── In your server file (app.ts / server.ts) ──

  import adminAuthRoutes from "./routes/adminAuthRoutes";
  import { requireAuth } from "./middleware/auth";

  app.set("trust proxy", 1); // only if you deploy behind a proxy (Render, Railway, Nginx...), needed for rate limiting
  app.use("/api/admin", adminAuthRoutes);

  // IMPORTANT: protect your existing admin services routes.
  // Either mount them with the middleware:
  app.use("/api/admin/services", requireAuth, yourExistingServicesRouter);
  // ...or put `router.use(requireAuth);` at the top of that router file.

  Then delete the old password-only login route and the old admin password env variable.
*/