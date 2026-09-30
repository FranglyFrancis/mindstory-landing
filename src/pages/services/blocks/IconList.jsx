import './IconList.css';

export default function IconList({icon, title, description}){
    return(
        <>
                {/* 1st column */}
                <div className="service-column">
                    <div className="service-icon-box">
                        <i className={icon}></i>
                    </div>
                    <div className="service-content">
                        <h3>{title}</h3>
                        <p className='justified-text'>{description}</p>
                    </div>
                </div>
                </>
        
    )
    
}
