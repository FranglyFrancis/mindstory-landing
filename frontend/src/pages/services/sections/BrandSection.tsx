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
            
            {sections.map((section) => (
                <div key={section.id} className="info-row section-division">
                    <div className="info-image">
                        <img src={section.image} alt={section.title} />
                    </div>

                    <div className="info-content">
                        <h2 className="title">{section.title}</h2>

                        <div className="info-grid">
                            {section.content.map((item) => (
                            <div key={item.id} className="info-item">
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
}