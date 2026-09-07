import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import kairali from '../assets/kairali.png'
import inker from '../assets/inker.png'
import gold from '../assets/gold.png'
import motory from '../assets/motory.png'
import spais from '../assets/spais.png'
import wincentre from '../assets/wincentre.png'
import boche from '../assets/boche.png'
import indel from '../assets/indel.png'

function SuccessStories(){


    return(
        <>
        <div className="custom-shape-divider-top-1788603728">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
            </svg>
        </div>
        <section>
            <div className='section-heading'>
                <h1>Success Stories </h1> 
                <a href="">| View Projects</a>
            </div>
            
            {/* Desktop arrow */}
            <div className="desktop-arrow">
                <div className="carousel-arrows">
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleFade"
                        data-bs-slide="prev"
                    >
                        <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                        ></span>

                        <span className="visually-hidden">
                        Previous
                        </span>
                    </button>

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleFade"
                        data-bs-slide="next"
                    >
                        <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                        ></span>

                        <span className="visually-hidden">
                        Next
                        </span>
                    </button>
                </div>
            </div>
                
        <div className="desktop-carousel">
            <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="cards-wrapper cards-view">
                                <div 
                                    className="card project-card"
                                    onClick={() => window.location.href = "https://mindstory.in/project-view/kairali-ford/"}
                                >
                                    <img src={kairali} className="card-image" alt="" />
                                    <div className="project-overlay">
                                        <small>
                                            The collaboration between Kairali Ford and the digital marketing team emphasized enhancing Kairali's service division through effective online strategies. The focus on showcasing service excellence, educating customers, and sharing positive experiences led to increased engagement and inquiries... 
                                        </small>
                                    </div>
                                </div>
                                 <div 
                                    className="card project-card"
                                    onClick={() => window.location.href = "https://mindstory.in/project-view/inker-robotics/"}
                                >
                                    <img src={inker} className="card-image" alt="" />
                                    <div className="project-overlay">
                                        <small>
                                            The Inker Robotics Exhibition, with Mindstory's design and digital marketing expertise, showcased a fusion of innovation and technology, achieving increased visibility...
                                        </small>
                                    </div>
                                </div>

                                <div 
                                    className="card project-card"
                                    onClick={() => window.location.href = "https://mindstory.in/project-view/golds-gym/"}
                                >
                                    <img src={gold} className="card-image" alt="" />
                                    <div className="project-overlay">
                                        <small>
                                            The Gold's Gym Kuriachira case study highlights Mindstory's strategic digital marketing efforts, which significantly enhanced the gym's online visibility...
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="cards-wrapper">
                                <div className="card project-card"
                                    onClick={() => window.location.href = "https://mindstory.in/project-view/motory/"}
                                >
                                    <img src={motory} className="card-image" alt="" />
                                    <div className="project-overlay">
                                        <small>
                                            "Leveraging Mindstory's expertise, Motory amplified its digital presence through strategic social media management, targeted paid ad campaigns...
                                        </small>
                                    </div>
                                </div>
                                <div 
                                    className="card project-card"
                                    onClick={() => window.location.href = "https://mindstory.in/project-view/spais/"}
                                >
                                    <img src={spais} className="card-image" alt="" />
                                    <div className="project-overlay">
                                        <small>
                                             The case study highlights the fruitful partnership between Spais, an authentic spice brand, and Mindstory, a top digital marketing agency...
                                        </small>
                                    </div>
                                </div>
                                <div 
                                    className="card project-card"
                                    onClick={() => window.location.href = "https://mindstory.in/project-view/wincentre/"}
                                >
                                    <img src={wincentre} className="card-image" alt="" />
                                    <div className="project-overlay">
                                        <small>
                                            The Wincentre case study showcases the impact of Mindstory's digital marketing strategies, which significantly improved Wincentre's online visibility and student engagement...
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="cards-wrapper">
                                <div 
                                    className="card project-card"
                                    onClick={() => window.location.href = "https://mindstory.in/project-view/chemmanur-credits-and-investments-limited//"}
                                >
                                    <img src={boche} className="card-image" alt="" />
                                    <div className="project-overlay">
                                        <small>
                                            In partnership with Mindstory, Chemmanur Credits and Investments Limited successfully expanded its digital presence through targeted marketing for NCD public issues...
                                        </small>
                                    </div>
                                </div>
                                <div 
                                    className="card project-card"
                                    onClick={() => window.location.href = "https://mindstory.in/project-view/indel-money-limited/"}
                                >
                                    <img src={indel} className="card-image" alt="" />
                                    <div className="project-overlay">
                                        <small>
                                            Mindstory's strategic digital marketing efforts for Indel Money led to significant enhancements in the company's online visibility and SEO rankings...
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
               
            </div>
        </div>

          {/*Mobile arrow */}
            <div className="mobile-arrow">
                <div className="carousel-arrows">
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#mobileCarousel"
                        data-bs-slide="prev"
                    >
                        <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                        ></span>

                        <span className="visually-hidden">
                        Previous
                        </span>
                    </button>

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#mobileCarousel"
                        data-bs-slide="next"
                    >
                        <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                        ></span>

                        <span className="visually-hidden">
                        Next
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile carousel */}
            <div className="mobile-carousel">
            <div id="mobileCarousel" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="mobile-card-wrapper">
                    <div className="card">
                        <img src={kairali} className="card-image" alt="" />
                    </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <div className="mobile-card-wrapper">
                    <div className="card">
                        <img src={inker} className="card-image" alt="" />
                    </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <div className="mobile-card-wrapper">
                    <div className="card">
                        <img src={gold} className="card-image" alt="" />
                    </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <div className="mobile-card-wrapper">
                    <div className="card">
                        <img src={motory} className="card-image" alt="" />
                    </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <div className="mobile-card-wrapper">
                    <div className="card">
                        <img src={spais} className="card-image" alt="" />
                    </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <div className="mobile-card-wrapper">
                    <div className="card">
                        <img src={wincentre} className="card-image" alt="" />
                    </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <div className="mobile-card-wrapper">
                    <div className="card">
                        <img src={boche} className="card-image" alt="" />
                    </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <div className="mobile-card-wrapper">
                    <div className="card">
                        <img src={indel} className="card-image" alt="" />
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </section>
       
        </>
        
    )
}

export default SuccessStories