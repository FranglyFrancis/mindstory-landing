/*
  Creates the FIRST admin account (a super admin), so you can log in once.
  After that, create every other account from the Users page in the dashboard.

  Usage (from your backend folder):
    npx tsx scripts/createSuperAdmin.ts you@example.com "a-strong-password" "Your Name"

  (use `npx ts-node` instead of `npx tsx` if that's what your project uses)
  Safe to re-run: it does nothing if that email already exists.
*/
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { AdminUser } from "../models/AdminUser.js";

async function main() {
  const [emailArg, password, name = "Admin"] = process.argv.slice(2);

  if (!emailArg || !password || password.length < 8) {
    console.error('Usage: npx tsx scripts/createSuperAdmin.ts <email> "<password, min 8 chars>" ["Name"]');
    process.exit(1);
  }

  // change MONGO_URI to whatever your .env calls your connection string
  await mongoose.connect(process.env.MONGODB_URI as string);

  const email = emailArg.trim().toLowerCase();
  const existing = await AdminUser.findOne({ email });

  if (existing) {
    console.log(`A user with ${email} already exists. Nothing changed.`);
  } else {
    await AdminUser.create({
      name,
      email,
      role: "superadmin",
      passwordHash: await bcrypt.hash(password, 12),
    });
    console.log(`Super admin created: ${email}`);
  }

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
