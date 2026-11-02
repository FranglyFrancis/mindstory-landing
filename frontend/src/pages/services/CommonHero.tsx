import "./CommonHero.css";
import WaveDivider, { WAVE_TOP_PATH } from "../../components/home/WaveDivider"; // adjust the path
import { imgSrc } from "../../utils/imgSrc";

type CommonHeroProps = {
  image: string;
  title: string;
  description?: string;
};

export default function CommonHero({ image, title, description }: CommonHeroProps) {
  return (
    <section className="common-hero-section">
      <div className="common-hero">
        <img className="common-hero-image image-slide" src={imgSrc(image)} alt="" fetchPriority="high" />
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>

      <WaveDivider className="hero-wave" path={WAVE_TOP_PATH} />
    </section>
  );
}