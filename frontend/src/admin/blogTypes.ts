export type Blog = {
  _id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  featured: boolean;
  order: number;
};

// The form keeps `order` as text so the field can be empty while typing.
export type Draft = {
  title: string;
  description: string;
  image: string;
  url: string;
  featured: boolean;
  order: string;
};

export type Note = { ok: boolean; text: string } | null;

export const LIST_HASH = "blogs";

export const EMPTY_DRAFT: Draft = {
  title: "",
  description: "",
  image: "",
  url: "",
  featured: true,
  order: "0",
};

export const draftFromBlog = (blog: Blog): Draft => ({
  title: blog.title,
  description: blog.description,
  image: blog.image,
  url: blog.url,
  featured: blog.featured,
  order: String(blog.order ?? 0),
});