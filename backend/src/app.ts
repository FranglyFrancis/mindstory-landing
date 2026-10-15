import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import serviceRoutes from "./routes/serviceRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import adminRoutes from "./routes/adminAuthRoutes.js";
import { publicSuccessRouter, adminSuccessRouter } from "./routes/successStoryRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL ?? "http://localhost:5173")

  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""));

// app.use(express.json());
app.use(express.json({ limit: "10mb" }));

// CORS only for the API, and never throw
// app.use(
//   "/api",
//   cors({
//     origin: (origin, callback) => {
//       callback(null, !origin || allowedOrigins.includes(origin));
//     },
//   })
// );
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin not allowed by CORS"));
      }
    },
  })
);


app.use("/api/services", serviceRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/success-stories", publicSuccessRouter);
app.use("/api/admin", adminSuccessRouter);
app.use("/api/brands", brandRoutes);
app.use("/api/admin/brands", brandRoutes);


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.get("/api/test", (_req, res) => {
  res.json({ ok: true });
});

// ---- serve the built frontend ----
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.join(__dirname, "../../frontend/dist");

app.use(express.static(clientDist));

app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) return next();
  res.sendFile(path.join(clientDist, "index.html"));
});

export default app;