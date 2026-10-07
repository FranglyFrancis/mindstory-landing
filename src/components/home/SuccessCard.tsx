export default function SuccessCard({url,image,title,description}){
    return(
        <div className="card project-card" onClick={() => window.location.href = url}>
            <img src={image} className="card-image" alt={title} />
            <div className="project-overlay">
                <small>
                    {description}
                </small>
            </div>
        </div>
    )
}