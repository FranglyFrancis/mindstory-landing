import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/serviceRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL ?? "http://localhost:5173")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (curl, Postman) and listed origins
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS blocked: ${origin}`));
    },
  })
);

app.use(express.json());
app.use("/api/services", serviceRoutes);
app.use("/api/faqs", faqRoutes);

app.get("/api/test", (_req, res) => {
  res.json({ ok: true });
});

export default app;