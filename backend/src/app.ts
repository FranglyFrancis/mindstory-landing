import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/serviceRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:5173" }));
app.use(express.json());
app.use("/api/services", serviceRoutes);
app.use("/api/faqs", faqRoutes);

app.get("/api/test", (_req, res) => {
  res.json({ ok: true });
});

export default app;