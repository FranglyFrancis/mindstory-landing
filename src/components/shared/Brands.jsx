import './Brands.css';
import { brands } from '../../data/home/Brands';
import { brandArray } from '../../data/home/Brands';
import BrandCard from './BrandCard';

function TrustedBrands(){
    const slides = brandArray(brands,6);

    return(
        <>
        <section className='centered-section brands'>
            <h2>Trusted Brands</h2>
            <p className='centered-desc'>
                Our commitment to excellence has made us a preferred digital marketing agency for leading brands. We prioritize client satisfaction and deliver custom solutions tailored to your unique needs and aspirations.
            </p>

            {/* Desktop-carousel */}
            <div className="desktop-carousel">
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
                    <div className="carousel-inner">
                        {/* {Array.from({ length:slides }).map((_,index)=>( */}
                        {slides.map((slideGroup,index)=>(
                            <div key={index} className= {`carousel-item ${index === 0 ? 'active' : '' }`}>
                                <div className={`card-wrapper ${index === 0 ? 'cards-view' : ''}`} >
                                    {slideGroup.map(brand => (
                                        <BrandCard key={brand.id} image={brand.image} alt={brand.brand} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile carousel */}
            <div className="mobile-carousel">
                    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000">
                        <div className="carousel-inner">
                            {brands.map((brand,index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <div className="card-wrapper cards-view">
                                        <BrandCard key={brand.id} image={brand.image} alt={brand.brand} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
        </section>

        <div className="custom-shape-divider-top-1788603399">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
            </svg>
        </div>
        </>
    )
}

export default TrustedBrands