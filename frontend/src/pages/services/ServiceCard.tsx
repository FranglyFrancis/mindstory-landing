import { Link } from "react-router-dom";
import type { ServiceListItem } from "../../hooks/useServices";
import { imgSrc } from "../../utils/imgSrc";

type ServiceCardProps = {
  service: ServiceListItem;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const title = service.cardTitle || service.title;
  const image = service.cardImage || service.image;

  return (
    <div className="service-card">
      <div className="card-details">
        <img src={imgSrc(image)} alt={title} loading="lazy" />
        <h2>{title}</h2>
        <p>{service.description}</p>
        <Link to={`/services/${service.slug}`} aria-label={`Learn more about ${title}`}>
          LEARN MORE
        </Link>
      </div>
    </div>
  );
}