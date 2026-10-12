import type { IService } from "../../../api/services";
import IconList from "../blocks/IconList.js";
import "./WebDesignSection.css";

type Props = {
  intro?: IService["intro"];
  services?: IService["lists"];
  titleItem?: IService["titleItem"];
};

export default function WebDesignSection({
  intro,
  services = [],
  titleItem = [],
}: Props) {
  const first = titleItem[0];
  const second = titleItem[1];

  return (
    <section className="section-division">
      {/* 1st */}
      {intro && (
        <div className="web-division">
          <div className="web-left">
            <h2>{intro.title}</h2>
            <p className="justified-text">{intro.left}</p>
          </div>
          <div className="web-right">
            <p>{intro.right}</p>
          </div>
        </div>
      )}

      {/* 2nd */}
      <div className="list-item">
        {services.map((list, i) => (
          <IconList
            key={i}
            title={list.title}
            icon={list.icon}
            description={list.description}
          />
        ))}
      </div>

      {/* 3rd */}
      {first && (
        <div className="web-division">
          <div className="image-wrapper">
            <img src={first.image} className="left-image" alt={first.title} />
          </div>
          <div>
            <h2>{first.title}</h2>
            <p className="justified-text">{first.description}</p>
          </div>
        </div>
      )}

      {/* 4th */}
      {second && (
        <div className="web-division">
          <div>
            <h2>{second.title}</h2>
            <p className="justified-text">{second.description}</p>
          </div>
          <div className="image-wrapper">
            <img src={second.image} className="right-image" alt={second.title} />
          </div>
        </div>
      )}
    </section>
  );
}