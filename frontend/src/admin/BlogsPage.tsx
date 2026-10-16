import { useCallback, useContext, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { api } from "./api";
import { PageCrumbContext } from "./adminPage";
import type { PageProps } from "./adminPage";
import ImageUpload from "./ImageUpload";
import { imgSrc } from "../utils/imgSrc";
import "./BlogsPage.css";

type Blog = { _id: string; title: string; description: string; image: string; url: string; featured: boolean; order: number };
type Draft = { title: string; description: string; image: string; url: string; featured: boolean; order: string };
type Note = { ok: boolean; text: string } | null;

// a full web address, or a site path such as /blog/my-post
const isLink = (v: string) => /^https?:\/\/\S+$/i.test(v) || /^\/(?!\/)\S*$/.test(v);

/* ---------- add / edit form ---------- */

function BlogForm({ initial, onSave }: { initial: Draft; onSave: (d: Draft) => Promise<void> }) {
  const [d, setD] = useState<Draft>(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr("");
    if (!d.title.trim() || !d.description.trim() || !d.image || !d.url.trim()) {
      return setErr("Title, description, image and link are all required.");
    }
    if (!isLink(d.url.trim())) {
      return setErr("The link must be a full web address (https://...) or a site path starting with /");
    }
    setBusy(true);
    try {
      await onSave(d);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="bl-form" onSubmit={submit}>
      <div className="ad-field">
        <label htmlFor="bl-title">Title<span aria-hidden="true">*</span></label>
        <input id="bl-title" className="ad-input" value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} />
      </div>

      <div className="ad-field">
        <label htmlFor="bl-desc">Description<span aria-hidden="true">*</span></label>
        <textarea id="bl-desc" className="ad-input" rows={4} value={d.description} onChange={(e) => setD({ ...d, description: e.target.value })} />
        <small className="bl-hint">A short summary shown on the blog card.</small>
      </div>

      <ImageUpload label="Image" required value={d.image} onChange={(url) => setD({ ...d, image: url })} />

      <div className="ad-field">
        <label htmlFor="bl-url">Link<span aria-hidden="true">*</span></label>
        <input id="bl-url" className="ad-input" value={d.url} onChange={(e) => setD({ ...d, url: e.target.value })} placeholder="/blog/my-post or https://..." />
        <small className="bl-hint">Where the card goes when someone clicks it.</small>
      </div>

      <label className="bl-check">
        <input type="checkbox" checked={d.featured} onChange={(e) => setD({ ...d, featured: e.target.checked })} />
        <span>Show in the Featured Blogs section on the home page</span>
      </label>

      <div className="ad-field bl-order">
        <label htmlFor="bl-order">Order</label>
        <input id="bl-order" className="ad-input" type="number" value={d.order} onChange={(e) => setD({ ...d, order: e.target.value })} />
        <small className="bl-hint">Lower numbers show first. Leave 0 to show the newest first.</small>
      </div>

      {err && <p className="ad-note error" role="alert">{err}</p>}

      <div className="bl-actions">
        <button className="ad-btn solid" disabled={busy}>{busy ? "Saving…" : "Save blog"}</button>
        <a className="ad-btn" href="#blogs">Cancel</a>
      </div>
    </form>
  );
}

/* ---------- listing ---------- */

function BlogList({ blogs, note, onDelete }: { blogs: Blog[]; note: Note; onDelete: (b: Blog) => void }) {
  return (
    <>
      <div className="bl-head">
        <div>
          <h2>Blogs</h2>
          <p className="ad-sub">{blogs.length} {blogs.length === 1 ? "blog" : "blogs"}</p>
        </div>
        <a className="ad-btn solid" href="#blogs/new">+ Add Blog</a>
      </div>

      {note && <p className={`ad-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>{note.text}</p>}

      {blogs.length === 0 ? (
        <div className="ad-card bl-empty">
          <p>No blogs yet.</p>
          <a className="ad-btn solid" href="#blogs/new">+ Add your first blog</a>
        </div>
      ) : (
        <ul className="bl-list">
          {blogs.map((b) => (
            <li key={b._id} className="bl-item">
              <img className="bl-thumb" src={imgSrc(b.image)} alt="" loading="lazy" />
              <div className="bl-body">
                <h3>{b.title}</h3>
                <p>{b.description}</p>
                <div className="bl-meta">
                  <span className={`bl-chip ${b.featured ? "on" : ""}`}>{b.featured ? "Featured" : "Not featured"}</span>
                  <span>Order {b.order}</span>
                  <span className="bl-url">{b.url}</span>
                </div>
              </div>
              <div className="bl-item-actions">
                <a className="ad-btn small" href={`#blogs/edit/${b._id}`}>Edit</a>
                <button type="button" className="ad-btn small danger" onClick={() => onDelete(b)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/* ---------- page ---------- */

export default function BlogsPage({ path }: PageProps) {
  const setCrumb = useContext(PageCrumbContext);
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [note, setNote] = useState<Note>(null);

  // #blogs -> list, #blogs/new -> add form, #blogs/edit/<id> -> edit form
  const mode = path[0] === "new" ? "new" : path[0] === "edit" && path[1] ? "edit" : "list";
  const editId = mode === "edit" ? path[1] : undefined;

  const load = useCallback(async () => {
    try {
      setBlogs(await api<Blog[]>("/blogs"));
    } catch (e: any) {
      setNote({ ok: false, text: e.message });
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // extra breadcrumb: Dashboard / Blogs / Add Blog
  useEffect(() => {
    setCrumb?.(mode === "new" ? "Add Blog" : mode === "edit" ? "Edit Blog" : null);
    if (mode !== "list") setNote(null);
    return () => setCrumb?.(null);
  }, [mode, setCrumb]);

  async function save(id: string | undefined, d: Draft) {
    const body = {
      title: d.title.trim(),
      description: d.description.trim(),
      image: d.image,
      url: d.url.trim(),
      featured: d.featured,
      order: Number(d.order) || 0,
    };
    if (id) await api(`/blogs/${id}`, { method: "PUT", body: JSON.stringify(body) });
    else await api("/blogs", { method: "POST", body: JSON.stringify(body) });

    await load();
    setNote({ ok: true, text: id ? "Blog updated." : "Blog added." });
    window.location.hash = "blogs";
  }

  async function remove(b: Blog) {
    if (!window.confirm(`Delete this blog?\n\n${b.title}`)) return;
    try {
      await api(`/blogs/${b._id}`, { method: "DELETE" });
      setNote({ ok: true, text: "Blog deleted." });
      await load();
    } catch (e: any) {
      setNote({ ok: false, text: e.message });
    }
  }

  if (!blogs) {
    return note ? (
      <div className="ad-page">
        <p className="ad-note error" role="alert">{note.text}</p>
        <button className="ad-btn" onClick={() => { setNote(null); load(); }}>Try again</button>
      </div>
    ) : (
      <p className="ad-sub" role="status">Loading…</p>
    );
  }

  if (mode === "new") {
    return (
      <div className="ad-page bl-page">
        <h2>Add Blog</h2>
        <BlogForm key="new" initial={{ title: "", description: "", image: "", url: "", featured: true, order: "0" }} onSave={(d) => save(undefined, d)} />
      </div>
    );
  }

  if (mode === "edit") {
    const blog = blogs.find((b) => b._id === editId);
    if (!blog) {
      return (
        <div className="ad-page bl-page">
          <h2>Blog not found</h2>
          <p className="ad-sub">It may have been deleted.</p>
          <a className="ad-btn" href="#blogs">Back to Blogs</a>
        </div>
      );
    }
    return (
      <div className="ad-page bl-page">
        <h2>Edit Blog</h2>
        <BlogForm
          key={blog._id}
          initial={{
            title: blog.title, description: blog.description, image: blog.image, url: blog.url,
            featured: blog.featured, order: String(blog.order ?? 0),
          }}
          onSave={(d) => save(blog._id, d)}
        />
      </div>
    );
  }

  return (
    <div className="ad-page">
      <BlogList blogs={blogs} note={note} onDelete={remove} />
    </div>
  );
}
