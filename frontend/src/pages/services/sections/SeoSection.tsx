<<<<<<< HEAD
import type { IService } from "../../../api/services";
import TitleCard from "../blocks/TitleCard";
import TransparentCard from "../blocks/TransparentCard";
import FAQ from "../../../components/shared/FAQ";
import "./SeoSection.css";

type Props = {
  heading?: IService["heading"];
  titleCards?: IService["titleCards"];
  iconCards?: IService["iconCards"];
  faqs?: IService["faqs"];
};

export default function SeoSection({
  heading,
  titleCards = [],
  iconCards = [],
  faqs = [],
}: Props) {
  return (
    <>
      <section className="seo-section1">
        <h2 className="centered-section">{heading?.title}</h2>
        <p className="centered-desc">{heading?.description}</p>

        <div className="title-cards-container">
          {titleCards.map((card, index) => (
            <TitleCard key={index} title={card.title} description={card.description} />
          ))}
        </div>
      </section>

      <section className="seo-section2">
        <div className="cards-container">
          {iconCards.map((item, index) => (
            <TransparentCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <FAQ faqs={faqs} />
    </>
  );
=======
import TitleCard from "../blocks/TitleCard";
import { heading, titleCards, iconCards, faqs } from "../../../data/services/Seo";
import TransparentCard from "../blocks/TransparentCard";
import FAQ from '../../../components/shared/FAQ';
import './SeoSection.css';

export default function SeoSection(){
    return(
        <>
        <section className="seo-section1">
            
            <h2 className="centered-section">{heading.title}</h2>
            <p className="centered-desc">{heading.description}</p>
            
            <div className="title-cards-container">
                {titleCards.map((card,index)=>(
                    <TitleCard key={index} title={card.title} description={card.description}/>
                ))}
            </div>
            
        </section>
        
        <section className="seo-section2">
            <div className="cards-container">
                {iconCards.map((item,index)=>(
                    <TransparentCard key={index} icon={item.icon}  title={item.title} description={item.description} />
                ))}
            </div>
        </section>
        
        <FAQ faqs={faqs} />

        </>
    )
>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342
}