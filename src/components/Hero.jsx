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
      {/* <div className="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="none" viewBox="0 0 1440 320"><path fill="#f3f4f5" fill-opacity="1" d="M0,128L60,106.7C120,85,240,43,360,32C480,21,600,43,720,48C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      </div> */}
    </section>
    </>
  );
}

export default Hero;