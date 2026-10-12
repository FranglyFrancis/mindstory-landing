<<<<<<< HEAD
import type { IService } from "../../../api/services"; // adjust the path to where you created api/services.ts
import "./BrandSection.css";

type Props = {
  sections?: IService["sections"];
};

export default function BrandSection({ sections = [] }: Props) {
  return (
    <section className="section-division">
      <div>
        <h2>Our Approach</h2>
        <p>
          We understand that every project is unique, and we tailor our approach to suit your specific needs and goals. Through collaborative brainstorming sessions, we delve deep into your brand ethos, audience preferences, and market trends to develop concepts that resonate with your target demographic. From initial sketches to final execution, we keep you involved every step of the way, ensuring that the end result exceeds your expectations.
        </p>
      </div>

      {sections.map((section, i) => (
        <div key={i} className="info-row section-division">
          <div className="info-image">
            <img src={section.image} alt={section.title} />
          </div>

          <div className="info-content">
            <h2 className="title">{section.title}</h2>

            <div className="info-grid">
              {section.content.map((item, j) => (
                <div key={j} className="info-item">
                  <span>
                    <p className="subtitle">
                      <strong>{item.title}:</strong>
                    </p>
                    <p className="paragraph">{item.description}</p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
=======
import ImageLeft from "../blocks/ImageLeft";
import {sections} from '../../../data/services/BrandSection';
import './BrandSection.css';
import { heading } from "../../../data/services/Seo";

export default function BrandSection(){
    return(
       <section className="section-division">
            <div>
                <h2>{heading.title}</h2>
                <p>{heading.description}</p>
            </div>
            
            {sections.map((section,index) => (
                <div key={index} className="info-row section-division">
                    <div className="info-image">
                        <img src={section.image} alt={section.title} />
                    </div>

                    <div className="info-content">
                        <h2 className="title">{section.title}</h2>

                        <div className="info-grid">
                            {section.content.map((item,index) => (
                            <div key={index} className="info-item">
                                <span>
                                    <p className="subtitle"><strong>{item.title}:</strong></p> 
                                    <p className="paragraph">{item.description}</p>
                                </span>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
       </section>
    )
>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342
}