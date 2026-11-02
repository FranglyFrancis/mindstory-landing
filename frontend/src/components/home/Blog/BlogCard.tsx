import type { Blog } from "../../../types";

const CARD_STYLE = { width: "18rem" };

type BlogCardProps = {
  blog: Blog;
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="card blog-card" style={CARD_STYLE}>
      <img src={blog.image} className="card-img-top w-80 mx-auto" alt={blog.title} loading="lazy" />

      <div className="card-body">
        <p className="cards-text">{blog.description}</p>
      </div>

      <a href={blog.url} className="read-more" aria-label={`Continue reading: ${blog.title}`}>
        <i className="bi bi-chat-left-text" aria-hidden="true"></i> CONTINUE READING
      </a>

      <div className="card-footer"></div>
    </div>
  );
}