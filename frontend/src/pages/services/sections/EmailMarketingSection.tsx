<<<<<<< HEAD
import type { IService } from "../../../api/services";
import IconList from "../blocks/IconList";
import TransparentCard from "../blocks/TransparentCard";
import "./EmailMarketingSection.css";

type Props = {
  lists?: IService["lists"];
  cards?: IService["iconCards"];
};

export default function EmailMarketingSection({ lists = [], cards = [] }: Props) {
  return (
    <>
      <section className="section-division">
        <div className="paragraph justified-text">
          <h3>Stand out in crowded inboxes with Mindstory's strategic Email Marketing services. Our customer-centric and result-driven campaigns are designed to increase brand awareness, drive engagement, nurture leads, and facilitate sales directly to your customers with tailored content.</h3>
          <p>Partner with us to build and grow your email program. We creatively design email templates, reaching potential customers at optimal times with relevant offers, fostering trustworthy relations. Mindstory ensures the highest conversion rate among marketing channels, delivering unparalleled ROI for your business.</p>
          <p>Our approach involves understanding the goals of your email campaign to achieve tangible results and a positive impact on your bottom line. From welcome emails introducing your brand to newsletters, announcements, seasonal, or engagement mails, we define target audiences based on unique characteristics and needs, segmenting for conversion-focused emails and optimizing for better conversions.</p>
        </div>

        <p className="centered-desc">Mindstory's specialized team ensures efficiency and effectiveness in every element of your email campaign, maximizing the potential of this powerful marketing channel.</p>

        <div className="list-item section-division">
          {lists.map((list, i) => (
            <IconList key={i} icon={list.icon} title={list.title} description={list.description} />
          ))}
        </div>

        <div className="centered-section section-division">
          <span>
            <a href="#" className="service-button enquiry-button">Send Your Enquiry </a>
            <a href="#" className="service-button quote-button"> Request a free quote</a>
          </span>
        </div>

        <div className="cards-container">
          {cards.map((card, i) => (
            <TransparentCard key={i} icon={card.icon} title={card.title} description={card.description} />
          ))}
        </div>
      </section>
    </>
  );
=======
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
>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342
}