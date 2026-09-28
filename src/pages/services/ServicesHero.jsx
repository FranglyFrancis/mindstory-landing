import { serviceHero } from '../../data/services/hero/ServiceHero';
import './ServicesHero.css';

export default function ServicesHero (){
   
    return (
        <>
            <section className='services-hero'>
                <div>
                    <img src={serviceHero.image} alt="Services Hero" className='hero-img hero-image-slide' />
                </div>
                <div>
                    <h1>{serviceHero.title}</h1>
                    <p className='justified-text'>{serviceHero.description}</p>
                </div>
            </section>
        </>
    )
 }
 