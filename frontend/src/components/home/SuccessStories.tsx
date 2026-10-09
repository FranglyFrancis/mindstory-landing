import './SuccessStories.css';
import './Card.css';
import { stories } from '../../data/home/SuccessStories';
import { storyArray } from '../../data/home/SuccessStories';
import SuccessCard from './SuccessCard';

function SuccessStories(){

const slides = storyArray(stories,3);
const mobSlides = storyArray(stories,1);

    return(
        <>
        <section>
            <div className='section-heading'>
                <h1>Success Stories </h1> 
                <a href=""> | View Projects</a>
            </div>
            
            {/* Desktop arrow */}
            <div className="desktop-arrow">
                <div className="carousel-arrows">
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
                
            <div className="desktop-carousel">
                <div id="carouselExampleFade" className="carousel slide carousel-fade">
                    <div className="carousel-inner">
                            {slides.map((slideGroup,index)=>(
                                <div key={index} className= {`carousel-item ${index === 0 ? 'active' : ''}`} >
                                <div className={`cards-wrapper ${index === 0 ? 'cards-view' : ''}`}>
                                    {slideGroup.map(story => (
                                        <SuccessCard key={story.id} card={story} />
                                    ))}
                                </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

          {/*Mobile arrow */}
            <div className="mobile-arrow">
                <div className="carousel-arrows">
                    <button className="carousel-control-prev" type="button" data-bs-target="#mobileCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>

                    <button className="carousel-control-next" type="button"data-bs-target="#mobileCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon"aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile carousel */}
            <div className="mobile-carousel">
                <div id="mobileCarousel" className="carousel slide carousel-fade">
                    <div className="carousel-inner">
                    {mobSlides.map((slide,index)=>(
                        <div key={index} className={`carousel-item ${index === 0 ?  'active' : ''}`}>
                            <div className="mobile-card-wrapper">
                                {slide.map(story=>(
                                    <SuccessCard key={story.id} card={story} />
                                ))}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default SuccessStories