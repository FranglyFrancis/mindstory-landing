import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { AdminUser, AdminUserDoc } from "../models/AdminUser.js";
import { AuthRequest } from "../middleware/auth.js";
import { sendMail } from "../utils/mailer.js";

// compared against when the email doesn't exist, so response time doesn't reveal which emails are real
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

const sha256 = (s: string) => crypto.createHash("sha256").update(s).digest("hex");
const cleanEmail = (v: unknown) => String(v ?? "").trim().toLowerCase();

export const signToken = (user: AdminUserDoc) =>
  jwt.sign({ id: user.id, v: user.tokenVersion }, process.env.JWT_SECRET as string, { expiresIn: "8h" });

export async function login(req: Request, res: Response) {
  try {
    const email = cleanEmail(req.body.email);
    const password = String(req.body.password ?? "");

    const user = await AdminUser.findOne({ email }).select("+passwordHash");
    const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);

    if (!user || !ok || !user.active) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ token: signToken(user), user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export function me(req: Request, res: Response) {
  res.json({ user: (req as AuthRequest).user });
}

export async function forgotPassword(req: Request, res: Response) {
  const generic = { message: "If that email has an account, a reset link has been sent." };
  try {
    const email = cleanEmail(req.body.email);
    const user = await AdminUser.findOne({ email, active: true });

    if (user) {
      const raw = crypto.randomBytes(32).toString("hex");
      user.resetTokenHash = sha256(raw);
      user.resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
      await user.save();

      const link = `${process.env.CLIENT_URL}/admin?reset=${raw}`;
      await sendMail(
        user.email,
        "Reset your admin password",
        `Use this link to set a new password. It expires in 30 minutes.\n\n${link}\n\nIf you didn't ask for this, you can ignore this email.`,
        `<p>Use this link to set a new password. It expires in 30 minutes.</p><p><a href="${link}">Set a new password</a></p><p>If you didn't ask for this, you can ignore this email.</p>`
      );
    }
    // same answer whether or not the account exists
    res.json(generic);
  } catch (e) {
    console.error(e);
    res.json(generic);
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const token = String(req.body.token ?? "");
    const password = String(req.body.password ?? "");
    if (!token) return res.status(400).json({ error: "Missing reset token" });
    if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters" });

    const user = await AdminUser.findOne({
      resetTokenHash: sha256(token),
      resetTokenExpires: { $gt: new Date() },
    }).select("+resetTokenHash +resetTokenExpires");

    if (!user) return res.status(400).json({ error: "This reset link is invalid or has expired" });

    user.passwordHash = await bcrypt.hash(password, 12);
    user.resetTokenHash = undefined;
    user.resetTokenExpires = undefined;
    user.tokenVersion += 1; // logs out every existing session
    await user.save();

    res.json({ message: "Password updated. You can log in now." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}
