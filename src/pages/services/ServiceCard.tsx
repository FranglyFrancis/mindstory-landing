import { Link } from "react-router-dom";
import { Service } from "../../types";

type ServiceCardProps =  {
        service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
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