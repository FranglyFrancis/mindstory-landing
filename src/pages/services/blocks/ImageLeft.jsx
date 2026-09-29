import './ImageLeft.css'

export default function ImageLeft({content}){
    return(
        <section className="left-image-section">
            <div>
                <img className="image-left image-slide-left" src={content.image} alt={content.title} />
            </div>
            <div className="content">
                <h4>{content.subtitle}!</h4>
                <h2>{content.title}</h2>
                <p className="justified-text">{content.description}</p>
            </div>
        </section>
    )
}