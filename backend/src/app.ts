import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import { env } from "./config/env.js";
import "./utils/cloudinary.js"; // runs the Cloudinary config
import { requireAuth } from "./middleware/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import { publicServiceRouter } from "./routes/serviceRoutes.js";
import { adminServiceRouter } from "./routes/serviceAdminRoutes.js";
import { publicFaqRouter, adminFaqRouter } from "./routes/faqRoutes.js";
import { publicBlogRouter, adminBlogRouter } from "./routes/blogRoutes.js";
import { publicSuccessRouter, adminSuccessRouter } from "./routes/successStoryRoutes.js";
import { adminImageUploadRouter } from "./routes/imageUploadRoutes.js";

const app = express();

// ---- Setup ----
app.set("trust proxy", 1);
app.use(express.json({ limit: "10mb" }));

// CORS only for the API, and never throw
app.use(
  "/api",
  cors({
    origin: (origin, callback) => {
      callback(null, !origin || env.frontendUrls.includes(origin));
    },
  })
);

// ---- Public API ----
app.get("/api/test", (_req, res) => {
  res.json({ ok: true });
});
app.use("/api/services", publicServiceRouter);
app.use("/api/faqs", publicFaqRouter);
app.use("/api/blogs", publicBlogRouter);
app.use("/api/success-stories", publicSuccessRouter);
app.use("/api/brands", brandRoutes);

// ---- Admin API ----
// Login, forgot-password and reset-password are public, so this mounts before requireAuth.
app.use("/api/admin", adminAuthRoutes);

app.use(
  "/api/admin",
  requireAuth,
  adminServiceRouter,
  adminFaqRouter,
  adminBlogRouter,
  adminSuccessRouter,
  adminImageUploadRouter
);
app.use("/api/admin/brands", requireAuth, brandRoutes);

app.get(
  "/api/admin/cloudinary-check",
  requireAuth,
  asyncHandler(async (_req, res) => {
    res.json({ ok: true, ping: await cloudinary.api.ping() });
  })
);

// ---- Static files ----
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ---- Frontend (only when it exists, e.g. a single combined service) ----
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.join(__dirname, "../../frontend/dist");

if (fs.existsSync(path.join(clientDist, "index.html"))) {
  app.use(express.static(clientDist));

  app.use((req, res, next) => {
    const isApiOrAsset =
      req.method !== "GET" ||
      req.path.startsWith("/api") ||
      req.path.startsWith("/uploads") ||
      path.extname(req.path);
    if (isApiOrAsset) return next();

    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  // API-only service: answer the root address with a simple message instead of an error
  app.get("/", (_req, res) => res.json({ ok: true, service: "api" }));
}

// ---- Error handling (must be last) ----
app.use(errorHandler);

export default app;