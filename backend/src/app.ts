import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import serviceRoutes from "./routes/serviceRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import adminRoutes from "./routes/adminAuthRoutes.js";
import { publicSuccessRouter, adminSuccessRouter } from "./routes/successStoryRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import "./utils/cloudinary.js";   // runs the config


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
app.use("/api/faqs", faqRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/admin/brands", brandRoutes);
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

// ---- serve the built frontend ----
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.join(__dirname, "../../frontend/dist");

app.use(express.static(clientDist));

app.use((req, res, next) => {
  if (
    req.method !== "GET" ||
    req.path.startsWith("/api") ||
    req.path.startsWith("/uploads") ||
    path.extname(req.path)          // a request for a file (.css, .js, .png...) that wasn't found
  ) return next();
  res.setHeader("Cache-Control", "no-cache");   // browsers always fetch the latest index.html after a deploy
  res.sendFile(path.join(clientDist, "index.html"));
});

export default app;