import { services } from "../../data/services/ServiceList";
import ServiceItem from "../../components/shared/ServiceItem";
import './ServiceList.css';

export default function ServiceList(){
    return(
        <section className='centered-section service-list'>
            <div className="grid-container">
                {services.map((service,index)=>(
                    <ServiceItem key={index} item={service} />
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