import type { AdminUserDoc } from "../models/AdminUser.js";

// Never send hashes or reset data to the client.
export const toPublicUser = (user: AdminUserDoc) => {
  const { passwordHash, resetTokenHash, resetTokenExpires, ...publicUser } = user.toJSON();
  return publicUser;
};