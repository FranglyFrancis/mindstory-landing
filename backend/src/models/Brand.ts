import { Schema, model } from "mongoose";

// Add brand
const brandSchema = new Schema(
    {
        // default "" so brands saved before this field existed still load
        name: { type: String, default: "", trim: true },
        logo: { type: String, default: "" }
    },
    { timestamps: true }
);

export const Brand = model("Brand", brandSchema);
