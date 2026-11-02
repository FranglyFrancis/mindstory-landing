import "./Expertise.css";
import "../Card.css";
import "./ExpertiseCarousel.css";
import ExpertiseItem from "./ExpertiseItem";
import ServiceCarousel from "./ServiceCarousel";
import type { ExpertiseListItem } from "./ExpertiseItem";
import { useServices } from "../../../hooks/useServices";
import type { ServiceListItem } from "../../../hooks/useServices";
import { useRevealOnScroll } from "../../../hooks/useRevealOnScroll";
import { imgSrc } from "../../../utils/imgSrc";
import WaveDivider, { WAVE_BOTTOM_PATH, WAVE_TOP_PATH } from "../WaveDivider";

// Up to this many services stay in the normal row; one more and they become a carousel.
const MAX_IN_ROW = 4;

const COPY = {
  title: "Our Expertise in Digital Marketing",
  description:
    "At Mindstory, a top digital marketing agency in Kerala, we know how to use every type of digital marketing to boost your brand’s online presence.",
};

const TOP_WAVE_PATH =
  "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z";
const BOTTOM_WAVE_PATH =
  "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z";

// A service from the database -> a card. If ExpertiseItem reads other fields, add them here.
const toCardItem = (service: ServiceListItem): ExpertiseListItem => ({
  title: service.title,
  image: imgSrc(service.image),
  url: service.slug,
});


/* ---------- decorative wave between sections ---------- */
type WaveDividerProps = {
  className: string;
  path: string;
};

/* ---------- section ---------- */
export default function Expertise() {
  const { services } = useServices();
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  const asCarousel = services.length > MAX_IN_ROW;

  const cards = services.map((service) => <ExpertiseItem key={service.slug} list={toCardItem(service)} />);

  // The same element either way (so the scroll-in animation keeps working); only its classes change.
  const layoutClass = asCarousel ? "expertise-carousel" : "card-row cards-view";
  const revealClass = visible ? "cards-slide-up show" : "cards-slide-up";
  

  return (
    <>
    <WaveDivider className="custom-shape-divider-bottom-1788602044" path={WAVE_BOTTOM_PATH} />
      <section className="expertise">
        <div className="expertise-container">
          <div>
            <h2 className="expertise-heading">{COPY.title}</h2>
            <p className="expertise-desc">{COPY.description}</p>
          </div>

          <div ref={ref} className={`${layoutClass} ${revealClass}`}>
            {asCarousel ? <ServiceCarousel label="Our services">{cards}</ServiceCarousel> : cards}
          </div>
        </div>
      </section>
      <WaveDivider className="custom-shape-divider-top-1788603175" path={WAVE_TOP_PATH} />
    </>
  );
}