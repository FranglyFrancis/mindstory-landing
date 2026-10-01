import ImageLeft from "../blocks/ImageLeft";
import {services} from '../../../data/services/BrandSection'

export default function BrandSection(){
    return(
       <section>
            {/* <div>
                <h2>Our Approach</h2>
                <p>We understand that every project is unique, and we tailor our approach to suit your specific needs and goals. Through collaborative brainstorming sessions, we delve deep into your brand ethos, audience preferences, and market trends to develop concepts that resonate with your target demographic. From initial sketches to final execution, we keep you involved every step of the way, ensuring that the end result exceeds your expectations.</p>
            </div>
            
            {services.map((list)=>(
               <ImageLeft key={list.id} image={list.image} title={list.title} subtitle={""} description={""}/>
               {list.content.map()}
            ))}
             */}
       </section>
    )
}