import { services } from "../../data/services/ServiceList";
import ServiceItem from "../../components/shared/ServiceItem";
import './ServiceList.css';

export default function ServiceList(){
    return(
        <section className='centered-section service-list'>
            <div className="grid-container">
                {services.map(service=>(
                    <ServiceItem key={service.id} image={service.image} title={service.title} description={service.description} />
                ))}
            </div>
            <div>
                <span>
                    <a href="#" className="service-button enquiry-button">Send Your Enquiry </a>
                    <a href="#" className="service-button quote-button"> Request a free quote</a>
                </span>
            </div>
        </section>

    )
}