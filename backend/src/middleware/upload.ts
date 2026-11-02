import multer from "multer";

const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

// Thrown for problems the user can fix, so the error handler can show the message as is.
export class UploadError extends Error {}

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: (_req, file, callback) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      callback(null, true);
      return;
    }
    callback(new UploadError("Choose a PNG, JPG, WEBP or GIF image"));
  },
});