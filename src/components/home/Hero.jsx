import heroImage from "../../assets/hero.png";
import './Hero.css'

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
        <img src={heroImage} alt="Astronaut presenting creative ideas board" className="image-slide-up" />
      </div>
    </section>
    <div className="wave-back">
          <div className="custom-shape-divider-bottom-1789459125">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
              </svg>
          </div>
      </div>
   
    </>
  );
}

export default Hero;