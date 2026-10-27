import './Blogs.css'
import '../Card.css';
import BlogCard from './BlogCard'
import { useBlogs } from '../../../hooks/useBlogs';

function FeaturedBlogs(){
    const { blogs, status } = useBlogs({ featuredOnly: true });

    // nothing to show (no featured blogs yet, or the API is unreachable): hide the whole section
    if (status === "error" || (status === "ready" && blogs.length === 0)) return null;

    return(
        <>
        <section className="centered-section">
            <h2>Featured Blogs</h2>
            <p className="centered-desc">Explore a world of knowledge, innovation, and inspiration with Mindstory's Blogs. Our carefully curated content covers the latest trends, expert insights, and creative ideas to elevate your understanding of the digital landscape. Stay informed and inspired as you delve into a wealth of information that sparks creativity and drives success in the ever-evolving world of digital marketing.</p>
            <div className="blogs-wrapper">
                {status === "loading" && <p role="status">Loading blogs…</p>}
                {blogs.map( item =>(
                   <BlogCard key={item.id} blog={item} />
                ))}
            </div>
        </section>
        </>
    )
}

export default FeaturedBlogs
