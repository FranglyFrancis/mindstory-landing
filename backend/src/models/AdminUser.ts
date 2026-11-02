import { Schema, model } from "mongoose";

export const ROLES = ["superadmin", "admin"] as const;
export type Role = (typeof ROLES)[number];

// Fields that must never reach the client.
const HIDDEN_FIELDS = ["passwordHash", "resetTokenHash", "resetTokenExpires", "__v"] as const;

const adminUserSchema = new Schema(
  {
    name: { type: String, trim: true, default: "" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // select:false -> the hash is never returned unless you ask for it with .select("+passwordHash")
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: "admin" },
    active: { type: Boolean, default: true },
    // bump this to instantly invalidate every token issued before (password change, deactivation)
    tokenVersion: { type: Number, default: 0 },
    // forgot-password: only a SHA-256 hash of the emailed token is stored
    resetTokenHash: { type: String, select: false },
    resetTokenExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

// Belt and braces: strip secrets from any res.json(user).
adminUserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const output = ret as Record<string, unknown>;
    for (const field of HIDDEN_FIELDS) delete output[field];
    return output;
  },
});

export const AdminUser = model("AdminUser", adminUserSchema);
export type AdminUserDoc = InstanceType<typeof AdminUser>;