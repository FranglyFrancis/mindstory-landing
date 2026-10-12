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
}