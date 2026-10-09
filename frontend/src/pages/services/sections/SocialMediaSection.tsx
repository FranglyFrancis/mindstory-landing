import { imageItem, iconCards } from "../../../data/services/SocialMedia";
import IconList from "../blocks/IconList";
import ImageLeft from "../blocks/ImageLeft";
import './SocialMediaSection.css';

export default function SocialMediaSection(){
    return(
        <>
        <section>
            <ImageLeft subtitle={""} title={""}  image={imageItem.image} description={imageItem.description} />
            
            <div className="services-grid-list">
                {iconCards.map((list,index)=>(
                    <IconList key={index} icon={list.icon} title={list.title} description={list.description} />
                ))}
            </div>
        </section>
        </>
    )
}