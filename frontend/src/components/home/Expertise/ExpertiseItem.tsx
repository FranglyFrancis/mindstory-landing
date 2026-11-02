import { Link } from "react-router-dom";

export type ExpertiseListItem = {
  image: string;
  title: string;
  url: string; // the service slug
};

type ExpertiseItemProps = {
  list: ExpertiseListItem;
};

export default function ExpertiseItem({ list }: ExpertiseItemProps) {
  return (
    <div className="card-expertise">
      <img src={list.image} alt={list.title} className="card-img" loading="lazy" />
      <Link className="expertise-title" to={`/services/${list.url}`}>
        <h4>{list.title}</h4>
      </Link>
    </div>
  );
}