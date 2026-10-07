import TitleCard from "../blocks/TitleCard";
import { seoList,cards,seoFAQ } from "../../../data/services/Seo";
import TransparentCard from "../../services/blocks/TransparentCard";
import FAQ from '../../../components/shared/FAQ';
import './SeoSection.css';

export default function SeoSection(){
    console.log(cards)
    return(
        <>
        <section className="seo-section1">
            <h2 className="centered-section">Results-Driven SEO Company in Thrissur</h2>
            <p className="centered-desc">Embark on a journey to digital excellence with Mindstory’s SEO services, where customization meets innovation. Our SEO company in Thrissur specializes in bridging gaps in your strategy, leveraging the power of organic search to transform clicks into revenue. From keyword optimization to technical SEO and content marketing, we craft comprehensive strategies that drive sustainable growth. Ready to elevate your online success? Contact us today for a personalized strategy and pricing details! Here's a glimpse of what we offer:</p>
            <div className="title-cards-container">
                {seoList.map((card)=>(
                    <TitleCard key={card.id} title={card.title} description={card.description}/>
                ))}
            </div>
        </section>
        
        <section className="seo-section2">
            <div className="cards-container">
                {cards.map((item)=>(
                    <TransparentCard key={item.id} icon={item.icon}  title={item.title} description={item.description} />
                ))}
            </div>
        </section>
        
        <FAQ faqs={seoFAQ} />

        </>
    )
}