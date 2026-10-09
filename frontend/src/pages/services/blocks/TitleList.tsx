import './TitleList.css';

type TitleListProps = {
    title: string;
    description: string;
}

export default function TitleList({
    title,
    description
}: TitleListProps) {
    return(
        <div className='title-list'>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}