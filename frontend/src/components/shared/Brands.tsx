import BrandCard from './BrandCard';
import { Brand } from '../../types';

type BrandProps = {
    title: string;
    description: string;
    brands: Brand[];
}

// Split the list into groups of `size` for the desktop carousel
function chunk<T>(items: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}

export default function Brands({
    title,
    description,
    brands
}: BrandProps) {
    const slides = chunk(brands,6);

    return(
        <>
         <h2>{title}</h2>
            <p className='centered-desc'>{description}</p>

            {/* Desktop-carousel */}
            <div className="desktop-carousel">
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
                    <div className="carousel-inner">
                        {/* {Array.from({ length:slides }).map((_,index)=>( */}
                        {slides.map((slideGroup,index)=>(
                            <div key={index} className= {`carousel-item ${index === 0 ? 'active' : '' }`}>
                                <div className={`card-wrapper ${index === 0 ? 'cards-view' : ''}`} >
                                    {slideGroup.map((brand,index) => (
                                        <BrandCard key={index} image={brand.image} brand={brand.brand} />
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
                                        <BrandCard key={index} image={brand.image} brand={brand.brand} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
        </>
    )
}