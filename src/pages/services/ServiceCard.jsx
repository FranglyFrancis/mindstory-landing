import { Link } from "react-router-dom";
export default function ServiceCard({ service }){
        return(
                <div className='service-card'>
                        <div className="card-details">
                                <img src={service.image} alt={service.title} />
                                <h2>{service.title}</h2>
                                <p>{service.description}</p>
                                <Link to={`/services/${service.slug}`}>LEARN MORE</Link>
                        </div>
                    
                </div>
        )
}