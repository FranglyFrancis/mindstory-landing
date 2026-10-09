import googleIcon from "/images/google-icon.svg";

type TestimonialCardProps = {
    name: string;
    text: String;
}

export default function TestimonialCard({
    name,
    text
}: TestimonialCardProps) {
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
