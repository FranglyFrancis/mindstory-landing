import { useCallback, useEffect, useState } from "react";
import { api, errorMessage } from "./api";
import { usePageCrumb } from "./adminPage";
import type { PageProps } from "./adminPage";
import BlogForm from "./blogForm";
import BlogList from "./blogList";
import { EMPTY_DRAFT, LIST_HASH, draftFromBlog } from "./blogTypes";
import type { Blog, Draft, Note } from "./blogTypes";
import "./BlogsPage.css";

type Mode = "list" | "new" | "edit";

// Extra breadcrumb: Dashboard / Blogs / Add Blog
const CRUMB_LABELS: Record<Mode, string | null> = {
  list: null,
  new: "Add Blog",
  edit: "Edit Blog",
};

// #blogs -> list, #blogs/new -> add form, #blogs/edit/<id> -> edit form
function getMode(path: string[]): Mode {
  if (path[0] === "new") return "new";
  if (path[0] === "edit" && path[1]) return "edit";
  return "list";
}

const toRequestBody = (draft: Draft) => ({
  title: draft.title.trim(),
  description: draft.description.trim(),
  image: draft.image,
  url: draft.url.trim(),
  featured: draft.featured,
  order: Number(draft.order) || 0,
});

export default function BlogsPage({ path }: PageProps) {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [note, setNote] = useState<Note>(null);

  const mode = getMode(path);
  const editId = mode === "edit" ? path[1] : undefined;

  usePageCrumb(CRUMB_LABELS[mode]);

  const load = useCallback(async () => {
    try {
      setBlogs(await api<Blog[]>("/blogs"));
    } catch (e) {
      setNote({ ok: false, text: errorMessage(e) });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Opening a form clears any old message.
  useEffect(() => {
    if (mode !== "list") setNote(null);
  }, [mode]);

  async function save(id: string | undefined, draft: Draft) {
    const body = JSON.stringify(toRequestBody(draft));

    if (id) await api(`/blogs/${id}`, { method: "PUT", body });
    else await api("/blogs", { method: "POST", body });

    await load();
    setNote({ ok: true, text: id ? "Blog updated." : "Blog added." });
    window.location.hash = LIST_HASH;
  }

  async function remove(blog: Blog) {
    if (!window.confirm(`Delete this blog?\n\n${blog.title}`)) return;

    try {
      await api(`/blogs/${blog._id}`, { method: "DELETE" });
      setNote({ ok: true, text: "Blog deleted." });
      await load();
    } catch (e) {
      setNote({ ok: false, text: errorMessage(e) });
    }
  }

  if (!blogs) {
    return note ? (
      <div className="ad-page">
        <p className="ad-note error" role="alert">
          {note.text}
        </p>
        <button
          type="button"
          className="ad-btn"
          onClick={() => {
            setNote(null);
            load();
          }}
        >
          Try again
        </button>
      </div>
    ) : (
      <p className="ad-sub" role="status">
        Loading…
      </p>
    );
  }

  if (mode === "new") {
    return (
      <div className="ad-page bl-page">
        <h2>Add Blog</h2>
        <BlogForm key="new" initial={EMPTY_DRAFT} onSave={(draft) => save(undefined, draft)} />
      </div>
    );
  }

  if (mode === "edit") {
    const blog = blogs.find((item) => item._id === editId);

    if (!blog) {
      return (
        <div className="ad-page bl-page">
          <h2>Blog not found</h2>
          <p className="ad-sub">It may have been deleted.</p>
          <a className="ad-btn" href={`#${LIST_HASH}`}>
            Back to Blogs
          </a>
        </div>
      );
    }

    return (
      <div className="ad-page bl-page">
        <h2>Edit Blog</h2>
        <BlogForm key={blog._id} initial={draftFromBlog(blog)} onSave={(draft) => save(blog._id, draft)} />
      </div>
    );
  }

  return (
    <div className="ad-page">
      <BlogList blogs={blogs} note={note} onDelete={remove} />
    </div>
  );
}