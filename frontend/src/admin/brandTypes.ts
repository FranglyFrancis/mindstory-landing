export type Brand = {
  _id: string;
  name?: string;
  logo: string;
  createdAt?: string;
};

export type BrandDraft = { name: string; logo: string };

export type Note = { ok: boolean; text: string } | null;

export const EMPTY_DRAFT: BrandDraft = { name: "", logo: "" };