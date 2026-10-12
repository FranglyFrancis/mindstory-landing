import BrandCard from './BrandCard';
import { Brand } from '../../types';
<<<<<<< HEAD

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

=======
import { brandArray } from '../../data/home/Brands';

type BrandProps = {
    title: String;
    description: String;
    brands: Brand[];
}

>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342
export default function Brands({
    title,
    description,
    brands
}: BrandProps) {
<<<<<<< HEAD
    const slides = chunk(brands,6);
=======
    const slides = brandArray(brands,6);
>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342

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
<<<<<<< HEAD
                                    {slideGroup.map((brand,index) => (
                                        <BrandCard key={index} image={brand.image} brand={brand.brand} />
=======
                                    {slideGroup.map(brand => (
                                        <BrandCard key={brand.id} image={brand.image} brand={brand.brand} />
>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342
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
<<<<<<< HEAD
                                        <BrandCard key={index} image={brand.image} brand={brand.brand} />
=======
                                        <BrandCard key={brand.id} image={brand.image} brand={brand.brand} />
>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
        </>
    )
}