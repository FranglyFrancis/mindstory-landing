import { Link, useParams } from "react-router-dom"
import { services } from "../../data/services/ServiceCard";
import Contact from "./blocks/Contact";
import { heroes } from "../../data/services/hero/CommonHero";
import CommonHero from "./CommonHero";
import Test from "./sections/Test";

export default function ServiceDetail(){

    // Reading slug from URL
    const {slug} = useParams();
    const service = services.find((s)=> s.slug === slug)
    const hero = heroes.find((s)=> s.slug === slug)
    const Sections = heroes.Section

    // Wrong URL
    if(!service) {
        return (
            <section>
                <p>Service not found</p>
                <Link to='/services' >Back to Services</Link>
            </section>
         )
    }

    return(
        <>
        <CommonHero image={hero.image} title={hero.title} description={hero.description} />
        {/* <Sections /> */}
        {/* <Test /> */}
        <Contact />
        </>
    )
}