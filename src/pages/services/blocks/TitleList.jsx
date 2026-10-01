import './TitleList.css';

export default function TitleList({title,description}){
    return(
        <div className='title-list'>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}