import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth, requireSuperAdmin } from "../middleware/auth.js";
import { login, me, forgotPassword, resetPassword } from "../controllers/authController.js";
import { listUsers, createUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = Router();

const AUTH_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const AUTH_MAX_ATTEMPTS = 10;

// Slows down password guessing and email spamming.
const authLimiter = rateLimit({
  windowMs: AUTH_WINDOW_MS,
  limit: AUTH_MAX_ATTEMPTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts. Try again in 15 minutes." },
});

/* ---------- public ---------- */
router.post("/login", authLimiter, login);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);

/* ---------- any logged-in admin ---------- */
router.get("/me", requireAuth, me);

/* ---------- super admin only: manage who can log in ---------- */
router.use("/users", requireAuth, requireSuperAdmin);
router.get("/users", listUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;