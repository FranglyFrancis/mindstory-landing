import { Link } from "react-router-dom";

type ExpertiseItemProps = {
    list: {
        image: string;
        title: string;
        url: string;
    };
};

export default function ExpertiseItem({ list }: ExpertiseItemProps){
    return(
        <div className="card-expertise">
            <img src={list.image} alt={list.title} className="card-img" />
            <Link className="expertise-title" to={`/services/${list.url}`}><h4>{list.title}</h4></Link>
        </div>
    )
}