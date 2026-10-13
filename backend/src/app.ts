import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import serviceRoutes from "./routes/serviceRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL ?? "http://localhost:5173")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""));

app.use(express.json());

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
app.use("/api/admin", adminRoutes);

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