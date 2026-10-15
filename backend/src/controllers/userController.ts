import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AdminUser } from "../models/AdminUser.js";
import { AuthRequest } from "../middleware/auth.js";

const ROLES = ["superadmin", "admin"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const me = (req: Request) => (req as AuthRequest).user!;

// true if at least one OTHER active super admin exists
async function anotherSuperAdminExists(excludeId: string) {
  const n = await AdminUser.countDocuments({ _id: { $ne: excludeId }, role: "superadmin", active: true });
  return n > 0;
}

export async function listUsers(_req: Request, res: Response) {
  res.json(await AdminUser.find().sort({ createdAt: 1 }));
}

export async function createUser(req: Request, res: Response) {
  try {
    const name = String(req.body.name ?? "").trim();
    const email = String(req.body.email ?? "").trim().toLowerCase();
    const password = String(req.body.password ?? "");
    const role = ROLES.includes(req.body.role) ? req.body.role : "admin";

    if (!EMAIL_RE.test(email)) return res.status(400).json({ error: "Enter a valid email address" });
    if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters" });

    const user = await AdminUser.create({
      name,
      email,
      role,
      passwordHash: await bcrypt.hash(password, 12),
    });
    res.status(201).json(user);
  } catch (e: any) {
    if (e.code === 11000) return res.status(409).json({ error: "A user with this email already exists" });
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const user = await AdminUser.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const self = me(req).id === user.id;
    const { name, role, active, password } = req.body;

    const losingSuperAdmin =
      user.role === "superadmin" &&
      ((role !== undefined && role !== "superadmin") || active === false);

    if (losingSuperAdmin) {
      if (self) return res.status(400).json({ error: "You can't demote or deactivate your own account" });
      if (!(await anotherSuperAdminExists(user.id))) {
        return res.status(400).json({ error: "There must be at least one active super admin" });
      }
    }

    if (name !== undefined) user.name = String(name).trim();
    if (role !== undefined && ROLES.includes(role)) user.role = role;
    if (active !== undefined) {
      user.active = Boolean(active);
      if (!user.active) user.tokenVersion += 1;
    }
    if (password !== undefined) {
      if (String(password).length < 8) return res.status(400).json({ error: "Password must be at least 8 characters" });
      user.passwordHash = await bcrypt.hash(String(password), 12);
      user.tokenVersion += 1;
    }

    await user.save();
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await AdminUser.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (me(req).id === user.id) return res.status(400).json({ error: "You can't delete your own account" });
    if (user.role === "superadmin" && !(await anotherSuperAdminExists(user.id))) {
      return res.status(400).json({ error: "There must be at least one active super admin" });
    }

    await user.deleteOne();
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}
