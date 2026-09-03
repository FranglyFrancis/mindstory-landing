import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import allen from '../assets/allen.png'
import chaai from '../assets/chaai.jpeg'
import hyundai from '../assets/hyundai.png'
import orgo from '../assets/orgo.png'
import priis from '../assets/priis.png'
import royal from '../assets/royal.png'
import lp from '../assets/lp.jpeg'

function TrustedBrands(){
    return(

        <section className='centered-section brands'>
            <h2>Trusted Brands</h2>
            <p className='centered-desc'>
                Our commitment to excellence has made us a preferred digital marketing agency for leading brands. We prioritize client satisfaction and deliver custom solutions tailored to your unique needs and aspirations.
            </p>
             <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner">
                        <div className='carousel-item active'>
                            <div className="card-wrapper">
                                <div className="card">
                                    <img src={allen} className="card-img-top w-50 mx-auto" alt="" />
                                </div>
                                 <div className="card">
                                    <img src={chaai} className="card-img-top w-50 mx-auto" alt="" />
                                </div>
                                 <div className="card">
                                    <img src={hyundai} className="card-img-top w-50 mx-auto" alt="" />
                                </div>
                                 <div className="card">
                                    <img src={orgo} className="card-img-top w-50 mx-auto" alt="" />
                                </div>
                                 <div className="card">
                                    <img src={priis} className="card-img-top w-50 mx-auto" alt="" />
                                </div>
                                 <div className="card">
                                    <img src={royal} className="card-img-top w-50 mx-auto" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='carousel-item'>
                            <div className="card-wrapper">
                                <div className="card">
                                    <img src={lp} className="card-img-top w-50 mx-auto" alt="" />
                                </div>
                                <div className="card">
                                    <img src={royal} className="card-img-top w-50 mx-auto" alt="" />
                                </div>
                                <div className="card">
                                    <img src={priis} className="card-img-top w-50 mx-auto" alt="" />
                                </div>
                                <div className="card">
                                    <img src={orgo} className="card-img-top w-50 mx-auto" alt="" />
                                </div>
                                <div className="card">
                                    <img src={chaai} className="card-img-top w-50 mx-auto" alt="" />
                                </div>
                                <div className="card">
                                    <img src={hyundai} className="card-img-top w-50 mx-auto" alt="" />
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
           
    )
}

export default TrustedBrands