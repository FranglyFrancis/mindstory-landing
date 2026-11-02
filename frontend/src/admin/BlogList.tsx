import { imgSrc } from "../utils/imgSrc";
import { LIST_HASH } from "./blogTypes";
import type { Blog, Note } from "./blogTypes";

type BlogListProps = {
  blogs: Blog[];
  note: Note;
  onDelete: (blog: Blog) => void;
};

export default function BlogList({ blogs, note, onDelete }: BlogListProps) {
  const countLabel = `${blogs.length} ${blogs.length === 1 ? "blog" : "blogs"}`;

  return (
    <>
      <div className="bl-head">
        <div>
          <h2>Blogs</h2>
          <p className="ad-sub">{countLabel}</p>
        </div>
        <a className="ad-btn solid" href={`#${LIST_HASH}/new`}>
          + Add Blog
        </a>
      </div>

      {note && (
        <p className={`ad-note ${note.ok ? "ok" : "error"}`} role={note.ok ? "status" : "alert"}>
          {note.text}
        </p>
      )}

      {blogs.length === 0 ? (
        <div className="ad-card bl-empty">
          <p>No blogs yet.</p>
          <a className="ad-btn solid" href={`#${LIST_HASH}/new`}>
            + Add your first blog
          </a>
        </div>
      ) : (
        <ul className="bl-list">
          {blogs.map((blog) => (
            <li key={blog._id} className="bl-item">
              <img className="bl-thumb" src={imgSrc(blog.image)} alt="" loading="lazy" />
              <div className="bl-body">
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <div className="bl-meta">
                  <span className={`bl-chip ${blog.featured ? "on" : ""}`}>
                    {blog.featured ? "Featured" : "Not featured"}
                  </span>
                  <span>Order {blog.order}</span>
                  <span className="bl-url">{blog.url}</span>
                </div>
              </div>
              <div className="bl-item-actions">
                <a className="ad-btn small" href={`#${LIST_HASH}/edit/${blog._id}`}>
                  Edit
                </a>
                <button type="button" className="ad-btn small danger" onClick={() => onDelete(blog)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}