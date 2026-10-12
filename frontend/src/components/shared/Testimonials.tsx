import './Testimonials.css';
import { useState } from "react";
import google from "/images/googleR.svg";
import { testimonials } from '../../data/home/TestimonialsList';
import TestimonialCard from './TestimonialCard';

function Testimonials() {

    const [current, setCurrent] = useState(0);
    const nextReview = () => {
        setCurrent((current + 1) % testimonials.length);
    };
    const previousReview = () => {
        setCurrent(
            (current - 1 + testimonials.length) % testimonials.length
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
                <div className="reviews-container" style={{ transform: `translateX(-${current * 33.333}%)`}}>
                    {testimonials.map((review) => (
                        <TestimonialCard key={review.id} name={review.name} text={review.text} />
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
