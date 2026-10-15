import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AdminUser, AdminUserDoc } from "../models/AdminUser.js";

export interface AuthRequest extends Request {
  user?: AdminUserDoc;
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; v: number };
    const user = await AdminUser.findById(payload.id);
    // re-checked on every request, so deactivating a user or changing a password logs them out at once
    if (!user || !user.active || user.tokenVersion !== payload.v) {
      return res.status(401).json({ error: "Session expired. Please log in again." });
    }
    (req as AuthRequest).user = user;
    next();
  } catch {
    res.status(401).json({ error: "Session expired. Please log in again." });
  }
}

export function requireSuperAdmin(req: Request, res: Response, next: NextFunction) {
  if ((req as AuthRequest).user?.role !== "superadmin") {
    return res.status(403).json({ error: "Only a super admin can do this" });
  }
  next();
}
