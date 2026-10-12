import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/serviceRoutes.js";
<<<<<<< HEAD
import faqRoutes from "./routes/faqRoutes.js";
=======
>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:5173" }));
app.use(express.json());
app.use("/api/services", serviceRoutes);
<<<<<<< HEAD
app.use("/api/faqs", faqRoutes);
=======
>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342

app.get("/api/test", (_req, res) => {
  res.json({ ok: true });
});

<<<<<<< HEAD
=======
app.get("/", (_req, res) => {
    res.send("Mindstory API is running");
  });

>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342
export default app;