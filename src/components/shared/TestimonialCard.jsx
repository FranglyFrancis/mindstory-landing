import googleIcon from "../../assets/google-icon.svg";

export default function TestimonialCard({name,text}){
    return(
        <div className="review-card">
            <div className="review-top">
                        <div>
                            <h4>{name}</h4>
                            <div className="review-stars">
                                ★ ★ ★ ★ ★
                            </div>
                        </div>
                        <img src={googleIcon} alt="Google icon" className="google-icon" />
            </div>
            <p className="review-text">
                {text}
            </p>
        </div>
    )
}
