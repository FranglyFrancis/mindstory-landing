import './Expertise.css';
import './Card.css';
import { expertiseList } from '../../data/home/ExpertiseList';

import { useEffect, useRef, useState } from "react";

function Expertise() {
  const [showCards, setShowCards] = useState(false);

  const cardsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCards(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="custom-shape-divider-bottom-1788602044">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          />
        </svg>
      </div>

      <section className="expertise">
        <div className="expertise-container">

          <div>
            <h2 className="expertise-heading">
              Our Expertise in Digital Marketing
            </h2>

            <p className='expertise-desc'>
              At Mindstory, a top digital marketing agency in Kerala, we know how to use every type of digital marketing to boost your brand’s online presence.
            </p>
          </div>

          <div
            ref={cardsRef}
            className={`card-row cards-view ${
              showCards ? "cards-slide-up show" : "cards-slide-up"
            }`}
          >
            {expertiseList.map(item => (
                <div className="card-expertise" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="card-img"
                  />
                  <h4>{item.title}</h4>
                </div>
            ))}
          </div>
        </div>
      </section>

      <div className="custom-shape-divider-top-1788603175">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          />
        </svg>
      </div>
    </>
  );
}

export default Expertise;