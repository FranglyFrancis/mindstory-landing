import { Card } from "../../types";

type ExpertiseItemProps = {
    list : Card
}

export default function ExpertiseItem({list}: ExpertiseItemProps){
    return(
        <div className="card-expertise">
            <img src={list.image} alt={list.title} className="card-img" />
            <h4>{list.title}</h4>
        </div>
    )

}