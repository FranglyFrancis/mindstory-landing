import { useParams } from "react-router-dom"
import { services } from "../../data/services/ServiceCard";
import Contact from "./blocks/Contact";
import { heroes } from "../../data/services/hero/CommonHero";
import CommonHero from "./CommonHero";
import { NotFound } from "../NotFound";

export default function ServiceDetail(){

    // Reading slug from URL
    const { slug } = useParams<{ slug: string }>();
    const service = services.find((s)=> s.slug === slug)
    const hero = heroes.find((s)=> s.slug === slug)

    if(!service || !hero) return <NotFound /> 
    const { Section } = hero


    return(
        <>
            <CommonHero image={hero.image} title={hero.title} description={hero.description} />
            <Section />
            <Contact />
        </>
    )
}