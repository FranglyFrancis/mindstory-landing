import './CommonHero.css'

export default function CommonHero({image,title,description}){
    return(
        <section className="common-hero-section">
            <div className='common-hero'>
                <img className='common-hero-image image-slide' src={image} alt={title} />
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            
        </section>
    )
}