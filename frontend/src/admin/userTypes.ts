import type { AdminUser } from "./api";

export type Note = { ok: boolean; text: string } | null;

export type NewUser = {
  name: string;
  email: string;
  password: string;
  role: AdminUser["role"];
};

export const EMPTY_USER: NewUser = { name: "", email: "", password: "", role: "admin" };

export const MIN_PASSWORD_LENGTH = 8; // same rule as the server

export const roleLabel = (role: AdminUser["role"]): string => (role === "superadmin" ? "Super admin" : "Admin");