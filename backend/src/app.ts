import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:5173" }));
app.use(express.json());
app.use("/api/services", serviceRoutes);

app.get("/api/test", (_req, res) => {
  res.json({ ok: true });
});

app.get("/", (_req, res) => {
    res.send("Mindstory API is running");
  });

export default app;