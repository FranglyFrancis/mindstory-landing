import './TitleCard.css';

export default function TitleCard({title,description}){
    return(
        <>
            <div className="title-card">
                <h4>{title}</h4>
                <p className='justified-text'>{description}</p>
            </div>
        </>
    )
}