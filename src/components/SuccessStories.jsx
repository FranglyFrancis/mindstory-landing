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
        <div class="custom-shape-divider-top-1788603728">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
            </svg>
        </div>
        <section>
            <h1>Success Stories</h1>
            <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="cards-wrapper">
                                <div className="card">
                                    <img src={kairali} className="card-image" alt="" />
                                </div>
                                 <div className="card">
                                    <img src={inker} className="card-image" alt="" />
                                </div>
                                 <div className="card">
                                    <img src={gold} className="card-image" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="cards-wrapper">
                                <div className="card">
                                    <img src={motory} className="card-image" alt="" />
                                </div>
                                <div className="card">
                                    <img src={spais} className="card-image" alt="" />
                                </div>
                                <div className="card">
                                    <img src={wincentre} className="card-image" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="cards-wrapper">
                                <div className="card">
                                    <img src={boche} className="card-image" alt="" />
                                </div>
                                 <div className="card">
                                    <img src={indel} className="card-image" alt="" />
                                </div>
                            </div>
                        </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span style={{backgroundColor:'black'}} className="carousel-control-prev-icon arrow" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span style={{backgroundColor:'black'}} className="carousel-control-next-icon arrow" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </section>
       
        </>
        
    )
}

export default SuccessStories