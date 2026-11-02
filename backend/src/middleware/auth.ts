import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AdminUser, type AdminUserDoc } from "../models/AdminUser.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export interface AuthRequest extends Request {
  user?: AdminUserDoc;
}

type TokenPayload = { id: string; v: number };

const BEARER_PREFIX = "Bearer ";
const SESSION_EXPIRED = "Session expired. Please log in again.";

const sendUnauthorized = (res: Response, message: string): void => {
  res.status(401).json({ error: message });
};

const getBearerToken = (req: Request): string => {
  const header = req.headers.authorization ?? "";
  return header.startsWith(BEARER_PREFIX) ? header.slice(BEARER_PREFIX.length) : "";
};

const isTokenPayload = (value: unknown): value is TokenPayload =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as TokenPayload).id === "string" &&
  typeof (value as TokenPayload).v === "number";

// Returns null for anything wrong with the token: bad signature, expired, or unexpected shape.
function verifyToken(token: string): TokenPayload | null {
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    return isTokenPayload(payload) ? payload : null;
  } catch {
    return null;
  }
}

export const requireAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = getBearerToken(req);
  if (!token) return sendUnauthorized(res, "Not authenticated");

  const payload = verifyToken(token);
  if (!payload) return sendUnauthorized(res, SESSION_EXPIRED);

  const user = await AdminUser.findById(payload.id);

  // Re-checked on every request, so deactivating a user or changing a password logs them out at once.
  if (!user || !user.active || user.tokenVersion !== payload.v) {
    return sendUnauthorized(res, SESSION_EXPIRED);
  }

  (req as AuthRequest).user = user;
  next();
});

export function requireSuperAdmin(req: Request, res: Response, next: NextFunction): void {
  if ((req as AuthRequest).user?.role !== "superadmin") {
    res.status(403).json({ error: "Only a super admin can do this" });
    return;
  }
  next();
}