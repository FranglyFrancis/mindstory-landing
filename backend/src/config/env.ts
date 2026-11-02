import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// src/config/env.ts -> backend root is two levels up
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MIN_SECRET_LENGTH = 32;

const clean = (value: string): string => value.trim().replace(/^["']|["']$/g, "");

const required = (name: string): string => {
  const value = clean(process.env[name] ?? "");
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
};

const toList = (value: string): string[] =>
  value
    .split(",")
    .map((item) => clean(item).replace(/\/$/, ""))
    .filter(Boolean);

const jwtSecret = required("JWT_SECRET");
if (jwtSecret.length < MIN_SECRET_LENGTH) {
  throw new Error(`JWT_SECRET must be at least ${MIN_SECRET_LENGTH} characters`);
}
const optional = (name: string): string | undefined => clean(process.env[name] ?? "") || undefined;

export const env = {
  port: Number(process.env.PORT ?? 5000),
  mongodbUri: required("MONGODB_URI"),
  jwtSecret,
  clientUrl: required("CLIENT_URL"),
  frontendUrls: toList(process.env.FRONTEND_URL ?? "http://localhost:5173"),
   isProduction: process.env.NODE_ENV === "production",
  smtp: {
    host: optional("SMTP_HOST"),
    port: Number(optional("SMTP_PORT") ?? 587),
    user: optional("SMTP_USER"),
    pass: optional("SMTP_PASS"),
    from: optional("MAIL_FROM"),
  },

   cloudinary: {
    cloudName: required("CLOUDINARY_CLOUD_NAME"),
    apiKey: required("CLOUDINARY_API_KEY"),
    apiSecret: required("CLOUDINARY_API_SECRET"),
  },
} as const;

