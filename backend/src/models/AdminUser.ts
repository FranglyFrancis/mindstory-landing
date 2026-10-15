import { Schema, model } from "mongoose";

export type Role = "superadmin" | "admin";

const adminUserSchema = new Schema(
  {
    name: { type: String, trim: true, default: "" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // select:false -> the hash is never returned unless you ask for it with .select("+passwordHash")
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
    active: { type: Boolean, default: true },
    // bump this to instantly invalidate every token issued before (password change, deactivation)
    tokenVersion: { type: Number, default: 0 },
    // forgot-password: only a SHA-256 hash of the emailed token is stored
    resetTokenHash: { type: String, select: false },
    resetTokenExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

// belt and braces: strip secrets from any res.json(user)
adminUserSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    delete ret.passwordHash;
    delete ret.resetTokenHash;
    delete ret.resetTokenExpires;
    delete ret.__v;
    return ret;
  },
});

export const AdminUser = model("AdminUser", adminUserSchema);
export type AdminUserDoc = InstanceType<typeof AdminUser>;