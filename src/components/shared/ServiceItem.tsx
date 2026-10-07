function ServiceItem({image,title,description}){
    return(
            <div className="grid-item">
                <img src={image} alt={title} className='grid-image'/>
                <h4>{title}</h4>
                <p className="justified-text centered-desc">{description}</p>
            </div>
    )
}

export default ServiceItem