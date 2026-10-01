import './TransparentCard.css'

export default function TransparentCard({icon,title,description}){
    console.log(icon)
    return(
        // From About.jsx
            <div className="card1">
                <h3><i className={`${icon} icons`}></i></h3>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
    )
}       