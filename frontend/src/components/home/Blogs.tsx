import './Blogs.css'
import './Card.css';
import { blogsList } from '../../data/home/BlogsList';
import BlogCard from './BlogCard'

function FeaturedBlogs(){
    return(
        <>
        <section className="centered-section">
            <h2>Featured Blogs</h2>
            <p className="centered-desc">Explore a world of knowledge, innovation, and inspiration with Mindstory's Blogs. Our carefully curated content covers the latest trends, expert insights, and creative ideas to elevate your understanding of the digital landscape. Stay informed and inspired as you delve into a wealth of information that sparks creativity and drives success in the ever-evolving world of digital marketing.</p>
            <div className="blogs-wrapper">
                {blogsList.map( item =>(
                   <BlogCard key={item.id} blog={item} />
                ))}
            </div>
        </section>
        </>
    )
}

export default FeaturedBlogs