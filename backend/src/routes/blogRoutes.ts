import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listPublic, listAdmin, createBlog, updateBlog, deleteBlog } from "../controllers/blogController.js";

/* public: GET /api/blogs?featured=true&limit=3 -> [{ _id, title, description, image, url }] */
export const publicBlogRouter = Router();
publicBlogRouter.get("/", listPublic);

/* admin: everything needs a logged-in user */
export const adminBlogRouter = Router();
adminBlogRouter.use("/blogs", requireAuth);
adminBlogRouter.get("/blogs", listAdmin);
adminBlogRouter.post("/blogs", createBlog);
adminBlogRouter.put("/blogs/:id", updateBlog);
adminBlogRouter.delete("/blogs/:id", deleteBlog);

