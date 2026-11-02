import "./Hero.css";
import WaveDivider, { WAVE_BOTTOM_PATH } from "../WaveDivider"; // adjust the path
import heroImage from "/images/hero/hero.png";

const COPY = {
  title: "Top Digital Marketing Agency in Kerala",
  description:
    "At Mindstory, we help businesses in Kerala grow through data-driven digital marketing strategies. From SEO and social media to web development and branding, we provide full-funnel solutions that deliver real results and lasting impact.",
  button: "Get Free Advice",
};

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1 className="title">{COPY.title}</h1>
          <p className="justified-text hero-spacing">{COPY.description}</p>
          <a href="#contact" className="hero-button">
            {COPY.button}
          </a>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Astronaut presenting creative ideas board" className="image-slide-up" />
        </div>
      </section>

      <div className="wave-back">
        <WaveDivider className="custom-shape-divider-bottom-1789459125" path={WAVE_BOTTOM_PATH} />
      </div>
    </>
  );
}