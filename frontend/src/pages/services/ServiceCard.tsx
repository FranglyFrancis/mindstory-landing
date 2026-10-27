import { Link } from "react-router-dom";
import type { ServiceListItem } from "../../hooks/useServices";
import { imgSrc } from "../../utils/imgSrc";

export default function ServiceCard({ service }: { service: ServiceListItem }) {
  const title = service.cardTitle || service.title;
  return (
    <div className="service-card">
      <div className="card-details">
        <img src={imgSrc(service.cardImage || service.image)} alt={title} />
        <h2>{title}</h2>
        <p>{service.description}</p>
        <Link to={`/services/${service.slug}`}>LEARN MORE</Link>
      </div>
    </div>
  );
}