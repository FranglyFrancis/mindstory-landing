import './Services.css'
import servicesHero from "../../assets/services-hero.webp"

export default function ServicesHero (){
    const hero = {
        title: "Our Services",
        description : "Experience exceptional, tailored services at Mindstory. Regardless of your business size, our commitment to delivering top-notch solutions resonates with clients, reflecting their preferences and desires.",
        image: servicesHero
    }
    return (
        <>
            <section className='services-hero'>
                <div>
                    <img src={hero.image} alt="Services Hero" className='hero-img hero-image-slide' />
                </div>
                <div>
                    <h1>{hero.title}</h1>
                    <p className='justified-text'>{hero.description}</p>
                </div>
            </section>
        </>
    )
 }
 