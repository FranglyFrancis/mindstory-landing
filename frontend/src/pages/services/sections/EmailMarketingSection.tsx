import { lists, article, iconCards } from "../../../data/services/EmailMarketing"
import IconList from "../blocks/IconList"
import TransparentCard from "../blocks/TransparentCard"
import './EmailMarketingSection.css'

export default function EmailMarketingSection(){
    return(
        <>
        <section className="section-division">
            <div className="paragraph justified-text">
                <h3>{article.title}</h3>
                <p>{article.descriptions[0]}</p>
                <p>{article.descriptions[1]}</p> </div>

            <p className="centered-desc">{article.descriptions[2]}</p>
            <div className="list-item section-division">
                {lists.map((list,index)=>(
                    <IconList key={index} icon={list.icon} title={list.title} description={list.description} />
                ))}
            </div>

            <div className="centered-section section-division">
                <span>
                    <a href="#" className="service-button enquiry-button">Send Your Enquiry </a>
                    <a href="#" className="service-button quote-button"> Request a free quote</a>
                </span>
            </div>
            
             <div className="cards-container">
                {iconCards.map((card,index)=>(
                    <TransparentCard key={index} icon={card.icon} title={card.title} description={card.description} />
                ))}
                    
             </div>
            
        </section>
        </>
    )
}