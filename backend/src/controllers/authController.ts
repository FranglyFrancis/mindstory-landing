import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AdminUser, type AdminUserDoc } from "../models/AdminUser.js";
import type { AuthRequest } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMail } from "../utils/mailer.js";

const BCRYPT_ROUNDS = 12;
const TOKEN_TTL = "8h";
const RESET_TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes
const MIN_PASSWORD_LENGTH = 8;

// Compared against when the email doesn't exist, so response time
// doesn't reveal which emails are real.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", BCRYPT_ROUNDS);

const sha256 = (value: string): string =>
  crypto.createHash("sha256").update(value).digest("hex");

const normalizeEmail = (value: unknown): string =>
  String(value ?? "").trim().toLowerCase();

export const signToken = (user: AdminUserDoc): string =>
  jwt.sign({ id: user.id, v: user.tokenVersion }, env.jwtSecret, { expiresIn: TOKEN_TTL });

// Never send hashes or reset data to the client.
const toPublicUser = (user: AdminUserDoc) => {
  const { passwordHash, resetTokenHash, resetTokenExpires, ...publicUser } = user.toJSON();
  return publicUser;
};

const buildResetEmail = (link: string) => ({
  text:
    `Use this link to set a new password. It expires in 30 minutes.\n\n${link}\n\n` +
    "If you didn't ask for this, you can ignore this email.",
  html:
    "<p>Use this link to set a new password. It expires in 30 minutes.</p>" +
    `<p><a href="${link}">Set a new password</a></p>` +
    "<p>If you didn't ask for this, you can ignore this email.</p>",
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password ?? "");

  const user = await AdminUser.findOne({ email }).select("+passwordHash");
  const passwordMatches = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);

  if (!user || !passwordMatches || !user.active) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  res.json({ token: signToken(user), user: toPublicUser(user) });
});

export function me(req: Request, res: Response): void {
  res.json({ user: (req as AuthRequest).user });
}

export async function forgotPassword(req: Request, res: Response): Promise<void> {
  // Same answer whether or not the account exists.
  const genericReply = { message: "If that email has an account, a reset link has been sent." };

  try {
    const email = normalizeEmail(req.body?.email);
    const user = await AdminUser.findOne({ email, active: true });

    if (user) {
      const rawToken = crypto.randomBytes(32).toString("hex");
      user.resetTokenHash = sha256(rawToken);
      user.resetTokenExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
      await user.save();

      const link = `${env.clientUrl}/admin?reset=${rawToken}`;
      const { text, html } = buildResetEmail(link);
      await sendMail(user.email, "Reset your admin password", text, html);
    }
  } catch (err) {
    console.error(err);
  }

  res.json(genericReply);
}

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const token = String(req.body?.token ?? "");
  const password = String(req.body?.password ?? "");

  if (!token) {
    res.status(400).json({ error: "Missing reset token" });
    return;
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
    return;
  }

  const user = await AdminUser.findOne({
    resetTokenHash: sha256(token),
    resetTokenExpires: { $gt: new Date() },
  }).select("+resetTokenHash +resetTokenExpires");

  if (!user) {
    res.status(400).json({ error: "This reset link is invalid or has expired" });
    return;
  }

  user.passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  user.resetTokenHash = undefined;
  user.resetTokenExpires = undefined;
  user.tokenVersion += 1; // logs out every existing session
  await user.save();

  res.json({ message: "Password updated. You can log in now." });
});