import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import serviceRoutes from "./routes/serviceRoutes.js";
import adminRoutes from "./routes/adminAuthRoutes.js";
import { publicSuccessRouter, adminSuccessRouter } from "./routes/successStoryRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import "./utils/cloudinary.js";   // runs the config
import fs from "fs";
import { Router } from "express";
import { Brand } from "./models/Brand.js";
import { publicFaqRouter, adminFaqRouter } from "./routes/faqRoutes.js";
import { publicBlogRouter, adminBlogRouter } from "./routes/blogRoutes.js";
import { adminImageUploadRouter } from "./routes/imageUploadRoutes.js";


export const publicBrandRouter = Router();
   publicBrandRouter.get("/", async (_req, res) => {
     res.json(await Brand.find().sort({ createdAt: 1 }).select("brand image -_id"));
   });

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL ?? "http://localhost:5173")

  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""));

// app.use(express.json());
app.use(express.json({ limit: "10mb" }));

// CORS only for the API, and never throw
app.use(
  "/api",
  cors({
    origin: (origin, callback) => {
      callback(null, !origin || allowedOrigins.includes(origin));
    },
  })
);


app.use("/api/services", serviceRoutes);
app.use("/api/faqs", publicFaqRouter);
app.use("/api/admin", adminFaqRouter);
app.use("/api/brands", brandRoutes);
app.use("/api/admin/brands", brandRoutes);
app.use("/api/blogs", publicBlogRouter);
app.use("/api/admin", adminBlogRouter);
app.use("/api/admin", adminImageUploadRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/success-stories", publicSuccessRouter);
app.use("/api/admin", adminSuccessRouter);


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.get("/api/test", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/cloudinary-check", async (_req, res) => {
  const info = {
    cloud: process.env.CLOUDINARY_CLOUD_NAME ?? null,
    keyLength: process.env.CLOUDINARY_API_KEY?.length ?? 0,
    keyEnds: process.env.CLOUDINARY_API_KEY?.slice(-4) ?? null,
    secretLength: process.env.CLOUDINARY_API_SECRET?.length ?? 0,
  };
  try {
    const ping = await cloudinary.api.ping();
    res.json({ ok: true, info, ping });
  } catch (e: any) {
    res.status(500).json({ ok: false, info, error: e?.message || e?.error?.message || String(e) });
  }
});

// ---- serve the built frontend (only when it exists, e.g. a single combined service) ----
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.join(__dirname, "../../frontend/dist");

if (fs.existsSync(path.join(clientDist, "index.html"))) {
  app.use(express.static(clientDist));

  app.use((req, res, next) => {
    if (
      req.method !== "GET" ||
      req.path.startsWith("/api") ||
      req.path.startsWith("/uploads") ||
      path.extname(req.path)
    ) return next();
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  // API-only service: answer the root address with a simple message instead of an error
  app.get("/", (_req, res) => res.json({ ok: true, service: "api" }));
}

export default app;