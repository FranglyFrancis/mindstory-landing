import './ImageLeft.css';

export default function ImageLeft({image,subtitle,title,description}){

    return(
        <>
         <div className='left-image-section'>
            <div>
                <img className="image-left image-slide-left" src={image} alt={title} />
            </div>
            <div className="content">
                <h4>{subtitle}</h4>
                <h2>{title}</h2>
                <p className="justified-text">{description}</p>
            </div>
         </div>

        </>
    )
}