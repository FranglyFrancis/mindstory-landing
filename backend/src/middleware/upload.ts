   import multer from "multer";

   const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif"];

   export const upload = multer({
     storage: multer.memoryStorage(),
     limits: { fileSize: 5 * 1024 * 1024 },
     fileFilter: (_req, file, cb) =>
       ALLOWED.includes(file.mimetype) ? cb(null, true) : cb(new Error("Choose a PNG, JPG, WEBP or GIF image")),
   });