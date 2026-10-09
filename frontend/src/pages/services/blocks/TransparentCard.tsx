import './TransparentCard.css'

type TransparentCardProps = {
    icon: string;
    title: string;
    description: string;
}
export default function TransparentCard({
    icon,
    title,
    description
}: TransparentCardProps) {
    return(
        // From About.jsx
            <div className="card1">
                <h3><i className={`${icon} icons`}></i></h3>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
    )
}       