import { sectionData, iconList } from "../../../data/services/SocialMedia";
import IconList from "../blocks/IconList";
import ImageLeft from "../blocks/ImageLeft";
import './SocialMediaSection.css';

export default function SocialMediaSection(){
    return(
        <>
        <section>
            <ImageLeft subtitile={""} title={""}  image={sectionData.image} description={sectionData.description} />
            <div className="services-grid-list">
                {iconList.map((list)=>(
                    <IconList key={list.id} icon={list.icon} title={list.title} description={list.description} />
                ))}
            </div>
        </section>
        </>
    )
}