import ImageLeft from "../blocks/ImageLeft";
import {sections} from '../../../data/services/BrandSection';
import './BrandSection.css';

export default function BrandSection(){
    return(
       <section className="section-division">
            <div>
                <h2>Our Approach</h2>
                <p>We understand that every project is unique, and we tailor our approach to suit your specific needs and goals. Through collaborative brainstorming sessions, we delve deep into your brand ethos, audience preferences, and market trends to develop concepts that resonate with your target demographic. From initial sketches to final execution, we keep you involved every step of the way, ensuring that the end result exceeds your expectations.</p>
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