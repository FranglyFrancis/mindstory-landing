import ServiceCard from "./ServiceCard";
import './ServiceCards.css';
import { services } from "../../data/services/ServiceCard";

export default function ServiceCards(){
    return(
        <>
            <section className="services-list">
                <div className="services-grid">
                    {services.map((service)=>(
                        <ServiceCard key= {service.id} service= {service} />
                    ))}
                </div>
            </section>
        </>
    )
}