import '../shared/ServiceItem.css';
import { servicesList } from '../../data/home/HomeServiceList';
import ServiceItem from '../shared/ServiceItem';

function Services(){

    return(
        <section className='centered-section'>
           <h4 className='centered-section'>Expand Traffic, Boost Revenue: Unleash Business Growth!</h4>
            <h2 className='centered-section'>All-In-One Digital Marketing Hub:Elevate Your Brand!</h2>
            <p className="justified-text centered-desc">Mindstory, the best digital marketing agency in Thrissur, Kerala is your go-to hub for all things digital. From SEO to custom website design, we offer a comprehensive suite of services to elevate your brand and drive business growth.</p>
            <div className="grid-container">
                {servicesList.map(service => (
                    <ServiceItem key={service.id} item={service} />
                ))}
            </div>
        </section>
    )
}

export default Services