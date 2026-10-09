import { Blog } from "../../types";

type BlogCardProps = {
    blog: Blog
}
function BlogCard({blog}: BlogCardProps){
    return(
        <div className="card blog-card" style={{width: '18rem'}}>
            <img src={blog.image} className="card-img-top w-80 mx-auto" alt={blog.title} />
            <div className="card-body">
                <p className="cards-text">{blog.description}</p>
            </div>
            <a href={blog.url} className="read-more" ><i className="bi bi-chat-left-text"></i> CONTINUE READING</a>
            <div className="card-footer"></div>
        </div>
    )
}

export default BlogCard