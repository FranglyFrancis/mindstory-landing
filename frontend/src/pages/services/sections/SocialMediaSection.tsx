<<<<<<< HEAD
import type { IService } from "../../../api/services";
import IconList from "../blocks/IconList";
import ImageLeft from "../blocks/ImageLeft";
import "./SocialMediaSection.css";

type Props = {
  imageItem?: IService["imageItem"];
  iconCards?: IService["iconCards"];
};

export default function SocialMediaSection({ imageItem, iconCards = [] }: Props) {
  return (
    <>
      <section>
        {imageItem && (
          <ImageLeft
            subtitle={""}
            title={""}
            image={imageItem.image}
            description={imageItem.description}
          />
        )}

        <div className="services-grid-list">
          {iconCards.map((list, index) => (
            <IconList
              key={index}
              icon={list.icon}
              title={list.title}
              description={list.description}
            />
          ))}
        </div>
      </section>
    </>
  );
=======
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
>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342
}