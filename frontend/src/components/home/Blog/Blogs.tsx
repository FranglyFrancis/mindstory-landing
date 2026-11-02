import "./Blogs.css";
import "../Card.css";
import BlogCard from "./BlogCard";
import { useBlogs } from "../../../hooks/useBlogs";

const COPY = {
  title: "Featured Blogs",
  description:
    "Explore a world of knowledge, innovation, and inspiration with Mindstory's Blogs. Our carefully curated content covers the latest trends, expert insights, and creative ideas to elevate your understanding of the digital landscape. Stay informed and inspired as you delve into a wealth of information that sparks creativity and drives success in the ever-evolving world of digital marketing.",
};

export default function FeaturedBlogs() {
  const { blogs, status } = useBlogs({ featuredOnly: true });

  // Nothing to show (no featured blogs yet, or the API is unreachable): hide the whole section.
  const nothingToShow = status === "error" || (status === "ready" && blogs.length === 0);
  if (nothingToShow) return null;

  return (
    <section className="centered-section">
      <h2>{COPY.title}</h2>
      <p className="centered-desc">{COPY.description}</p>

      <div className="blogs-wrapper">
        {status === "loading" && <p role="status">Loading blogs…</p>}
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}