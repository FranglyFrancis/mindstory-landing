import { Blog } from "../../types"

type SuccessCardProps = {
    card : Blog
}

export default function SuccessCard({ card }: SuccessCardProps){
    return(
        <div className="card project-card" onClick={() => window.location.href = card.url}>
            <img src={card.image} className="card-image" alt={card.title} />
            <div className="project-overlay">
                <small>
                    {card.description}
                </small>
            </div>
        </div>
    )
}