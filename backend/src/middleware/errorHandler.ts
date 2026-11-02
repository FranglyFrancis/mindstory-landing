import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: "Invalid data" });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
}