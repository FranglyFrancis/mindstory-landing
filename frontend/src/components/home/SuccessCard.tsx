import { Blog } from "../../types"

type SuccessCardProps = {
    card: Blog
}

export default function SuccessCard({ card }: SuccessCardProps) {
    return (
        <a href={card.url} className="card project-card">
            <img src={card.image} className="card-image" alt={card.title} />
            <div className="project-overlay">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
            </div>
        </a>
    )
}