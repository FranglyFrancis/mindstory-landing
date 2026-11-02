import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { isValidObjectId } from "mongoose";
import { AdminUser } from "../models/AdminUser.js";
import type { AuthRequest } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { toPublicUser } from "../utils/publicUser.js";

const ROLES = ["superadmin", "admin"] as const;
type Role = (typeof ROLES)[number];

const DEFAULT_ROLE: Role = "admin";
const BCRYPT_ROUNDS = 12;
const MIN_PASSWORD_LENGTH = 8;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_TOO_SHORT = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
const LAST_SUPER_ADMIN = "There must be at least one active super admin";

const isRole = (value: unknown): value is Role => ROLES.includes(value as Role);

const toText = (value: unknown): string => String(value ?? "").trim();

const sendError = (res: Response, status: number, message: string): void => {
  res.status(status).json({ error: message });
};

const sendNotFound = (res: Response): void => sendError(res, 404, "User not found");

const getCurrentUserId = (req: Request): string | undefined => (req as AuthRequest).user?.id;

// True if at least one OTHER active super admin exists.
async function anotherSuperAdminExists(excludeId: string): Promise<boolean> {
  const count = await AdminUser.countDocuments({
    _id: { $ne: excludeId },
    role: "superadmin",
    active: true,
  });
  return count > 0;
}

export const listUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await AdminUser.find().sort({ createdAt: 1 });
  res.json(users.map(toPublicUser));
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const name = toText(req.body?.name);
  const email = toText(req.body?.email).toLowerCase();
  const password = String(req.body?.password ?? "");
  const role = isRole(req.body?.role) ? req.body.role : DEFAULT_ROLE;

  if (!EMAIL_PATTERN.test(email)) return sendError(res, 400, "Enter a valid email address");
  if (password.length < MIN_PASSWORD_LENGTH) return sendError(res, 400, PASSWORD_TOO_SHORT);

  const user = await AdminUser.create({
    name,
    email,
    role,
    passwordHash: await bcrypt.hash(password, BCRYPT_ROUNDS),
  });

  res.status(201).json(toPublicUser(user));
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) return sendNotFound(res);

  const user = await AdminUser.findById(id);
  if (!user) return sendNotFound(res);

  const { name, role, active, password } = req.body ?? {};
  const isSelf = getCurrentUserId(req) === user.id;

  const losingSuperAdmin =
    user.role === "superadmin" &&
    ((role !== undefined && role !== "superadmin") || active === false);

  if (losingSuperAdmin) {
    if (isSelf) return sendError(res, 400, "You can't demote or deactivate your own account");
    if (!(await anotherSuperAdminExists(user.id))) return sendError(res, 400, LAST_SUPER_ADMIN);
  }

  if (password !== undefined && String(password).length < MIN_PASSWORD_LENGTH) {
    return sendError(res, 400, PASSWORD_TOO_SHORT);
  }

  if (name !== undefined) user.name = toText(name);
  if (isRole(role)) user.role = role;

  if (active !== undefined) {
    user.active = Boolean(active);
    if (!user.active) user.tokenVersion += 1; // logs them out everywhere
  }

  if (password !== undefined) {
    user.passwordHash = await bcrypt.hash(String(password), BCRYPT_ROUNDS);
    user.tokenVersion += 1; // logs them out everywhere
  }

  await user.save();
  res.json(toPublicUser(user));
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) return sendNotFound(res);

  const user = await AdminUser.findById(id);
  if (!user) return sendNotFound(res);

  if (getCurrentUserId(req) === user.id) {
    return sendError(res, 400, "You can't delete your own account");
  }
  if (user.role === "superadmin" && !(await anotherSuperAdminExists(user.id))) {
    return sendError(res, 400, LAST_SUPER_ADMIN);
  }

  await user.deleteOne();
  res.json({ ok: true });
});