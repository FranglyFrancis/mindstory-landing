import './Testimonials.css'

import { useState } from "react";
import google from "../../assets/googleR.svg"
import googleIcon from "../../assets/google-icon.svg"

const reviews = [
    {
        name: "Marketing Cochin",
        image: "",
        text: "Exceptional experience with Mindstory! Their team delivered outstanding results for our business, increasing our online visibility and driving significant growth in leads and sales.",
    },
    {
        name: "Jerin K S",
        image: "",
        text: "If you are looking for a digital marketing, branding, or creative consultancy, Mindstory is the place you want to go. They're quick and provide great designs for my business.",
    },
    {
        name: "Nivedhya C A",
        image: "",
        text: "Mindstory's creative design is just top-notch. They brought my vision to reality.",
    },
    {
        name: "Ayna Praharshan",
        image: "",
        text: "Mindstory provides creative solutions that align beautifully with the brand.",
    },
];

function Testimonials() {

    const [current, setCurrent] = useState(0);

    const nextReview = () => {
        setCurrent((current + 1) % reviews.length);
    };

    const previousReview = () => {
        setCurrent(
            (current - 1 + reviews.length) % reviews.length
        );
    };

    return (
        <section className="testimonials">

            <div className="testimonial-heading">
                <h2>Experiences of our delighted customers</h2>
            </div>

            {/* Google rating summary */}

            <div className="google-rating">

                <h3>EXCELLENT</h3>

                <div className="google-stars">
                    ★ ★ ★ ★ ★
                </div>

                <p>Based on 109 reviews</p>

                <div className="google-logos">
                    <img src={google} alt="Posted on Google" className="google-logo"/>
                </div>

            </div>


            {/* Reviews */}

            <div className="reviews-wrapper">
                <div
                    className="reviews-container"
                    style={{
                        transform: `translateX(-${current * 33.333}%)`
                    }}
                >

                    {reviews.map((review, index) => (

                        <div className="review-card" key={index}>
                             
                            <div className="review-top">
                                
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="reviewer-image"
                                />
                               
                                <div>
                                    <h4>{review.name}</h4>

                                    <div className="review-stars">
                                        ★ ★ ★ ★ ★
                                    </div>
                                </div>
                                <img src={googleIcon} alt="Google icon" className="google-icon" />

                            </div>

                            <p className="review-text">
                                {review.text}
                            </p>

                        </div>

                    ))}

                </div>

            </div>


            {/* Navigation */}

            <div className="testimonial-navigation">

                <button onClick={previousReview}>
                    ←
                </button>

                <button onClick={nextReview}>
                    →
                </button>

            </div>

        </section>
    );
}

export default Testimonials;
