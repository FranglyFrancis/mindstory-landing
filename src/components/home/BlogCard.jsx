function BlogCard({image,alt,description,link}){
    return(
        <div className="card blog-card" style={{width: '18rem'}}>
            <img src={image} className="card-img-top w-80 mx-auto" alt={alt} />
            <div className="card-body">
                <p className="cards-text">{description}</p>
            </div>
            <a href={link} className="read-more" ><i className="bi bi-chat-left-text"></i> CONTINUE READING</a>
            <div className="card-footer"></div>
        </div>
    )
}

export default BlogCard