import './IconList.css';

type IconListProps = {
    icon: string;
    title: string;
    description: string;
}

export default function IconList({
    icon,
    title,
    description
}: IconListProps) {
    return(
        <>
                {/* 1st column */}
                <div className="service-column">
                    <div className="service-icon-box">
                        <i className={icon}></i>
                    </div>
                    <div className="service-content">
                        <h3>{title}</h3>
                        <p className='justified-text'>{description}</p>
                    </div>
                </div>
                </>
    )
    
}
