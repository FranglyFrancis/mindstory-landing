import { Schema, model, type InferSchemaType } from "mongoose";

// A brand is a name and a logo image URL.
const brandSchema = new Schema(
  {
    // default "" so brands saved before this field existed still load
    name: { type: String, default: "", trim: true },
    logo: { type: String, default: "" }, // uploaded image URL
  },
  { timestamps: true }
);

export type BrandDoc = InferSchemaType<typeof brandSchema>;

export const Brand = model("Brand", brandSchema);