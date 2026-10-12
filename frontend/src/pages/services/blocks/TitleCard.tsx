import './TitleCard.css';

type TitleCardProps = {
    title: string;
    description: String;
}

export default function TitleCard({
    title,
    description
}: TitleCardProps) {
    return(
        <>
            <div className="title-card">
                <h4>{title}</h4>
                <p className='justified-text'>{description}</p>
            </div>
        </>
    )
}