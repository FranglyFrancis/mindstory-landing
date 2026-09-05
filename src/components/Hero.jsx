import "../App.css";
import heroImage from "../assets/hero.png";

function Hero() {
  return (
    <>
    <section className="hero">
      <div className="hero-content">
        <h1 className="title">
          Top Digital Marketing Agency in Kerala 
        </h1>
        <p className="justified-text hero-spacing">
          At Mindstory, we help businesses in Kerala grow through data-driven digital marketing strategies. From SEO and social media to web development and branding, we provide full-funnel solutions that deliver real results and lasting impact.
        </p>
        <a href="#contact" className="hero-button">
          Get Free Advice
        </a>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Digital marketing" />
      </div>
    </section>
    </>
  );
}

export default Hero;