import "./WhyMindStory.css";
import { useRevealOnScroll } from "../../../hooks/useRevealOnScroll"; // adjust the path to your hooks folder

const IMAGE_SRC = "/images/why.webp"; // served from the public folder

const COPY = {
  eyebrow: "Partner with Our Digital Marketing Agency for Growth!",
  title: "Why Choose Mindstory",
  body:
    "In the vibrant digital marketing landscape, distinguishing your brand requires a partner like Mindstory, particularly for those aiming to lead in Kerala's digital spaces, including Kochi and Thrissur. Mindstory's approach is distinctive, merging cutting-edge strategies and engaging storytelling to ensure your brand's meaningful connection with its audience. Our commitment to your growth and deep understanding of Kerala's digital environment make us your ideal local partner with a global outlook. From customized SEO solutions to targeted advertising, we're dedicated to crafting a digital experience that aligns with your brand's goals. Choosing Mindstory means partnering with a team of digital marketers passionate about your success, ready to elevate your brand's presence across Kerala and beyond. Let's collaborate to create a standout digital identity for your brand.",
};

export default function WhyMindstory() {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="why-choose">
      <div ref={ref} className={`hero-choose image-slide-left ${visible ? "show" : ""}`}>
        <img src={IMAGE_SRC} alt="Why Choose Mindstory" />
      </div>

      <div className="content">
        <h4>{COPY.eyebrow}</h4>
        <h2>{COPY.title}</h2>
        <p className="justified-text">{COPY.body}</p>
      </div>
    </section>
  );
}