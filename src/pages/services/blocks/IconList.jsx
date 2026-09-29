import './IconList.css';

export default function IconList(){
    return(
        <div className="services-grid">
            {/* 1st column */}
            <div className="service-column">
                <div className="service-icon-box" >
                    <i className="bi bi-brightness-high"></i>
                </div>
            <div className="service-content">
                <h3>Call To Action</h3>
                <p>Drive results with Mindstory's call to action. We draw potential customers from social media to your websites, converting engagement into meaningful interactions and measurable outcomes.</p>
                </div>
            </div>
        </div>
    )
    
}
