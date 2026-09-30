import './TransparentCard.css'

export default function TransparentCard({icon,title,description}){
    console.log(icon)
    return(
        // From About.jsx
            <div className="card1">
                <h2><i className={`${icon} icons`}></i></h2>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
    )
}       