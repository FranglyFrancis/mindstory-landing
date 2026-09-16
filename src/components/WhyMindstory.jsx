import "../App.css";
import avatar from "../assets/why.webp"

import { useEffect, useRef, useState } from "react";

function WhyMindstory(){
    const [showHero, setShowHero] = useState(false)

    const heroRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting) {
                    setShowHero(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.2,
            }
        );

        if(heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return(
        <>
        <section className="why-choose">
            <div 
                ref={heroRef}
                className={`hero-choose ${
                    showHero ? "image-slide-left show" : "image-slide-left"
                            }`}
            >
                <img src={avatar} alt="Why Choose Mindstory"/>
            </div>
            <div className="content">
                <h4>Partner with Our Digital Marketing Agency for Growth!</h4>
                <h2>Why Choose Mindstory</h2>
                <p className="justified-text">In the vibrant digital marketing landscape, distinguishing your brand requires a partner like Mindstory, particularly for those aiming to lead in Kerala's digital spaces, including Kochi and Thrissur. Mindstory's approach is distinctive, merging cutting-edge strategies and engaging storytelling to ensure your brand's meaningful connection with its audience. Our commitment to your growth and deep understanding of Kerala's digital environment make us your ideal local partner with a global outlook. From customized SEO solutions to targeted advertising, we're dedicated to crafting a digital experience that aligns with your brand's goals. Choosing Mindstory means partnering with a team of digital marketers passionate about your success, ready to elevate your brand's presence across Kerala and beyond. Let's collaborate to create a standout digital identity for your brand.</p>
            </div>
        </section>
        </>
    )
}

export default WhyMindstory