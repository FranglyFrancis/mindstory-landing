import { useEffect, useRef } from 'react';
import { Carousel } from 'bootstrap';
import BrandCard from './BrandCard';
import './Brands.css'
import { imgSrc } from '../../utils/imgSrc';
import { useBrands } from '../../hooks/useBrands';



type BrandProps = {
    title: string;
    description: string;
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
    description
}: BrandProps) {
    const { brands } = useBrands();
    const slides = chunk(brands,6);

    const desktopRef = useRef<HTMLDivElement>(null);
    const mobileRef = useRef<HTMLDivElement>(null);

    // The carousels only exist after the brands have loaded, which is after the page's load event,
    // so Bootstrap's data-bs-ride no longer starts them. Start them here instead.
    useEffect(() => {
        if (brands.length === 0) return;

        const started = [
            { el: desktopRef.current, interval: 3000 },
            { el: mobileRef.current, interval: 2000 },
        ].flatMap(({ el, interval }) => {
            if (!el) return [];
            const carousel = Carousel.getOrCreateInstance(el, { interval, ride: 'carousel' });
            carousel.cycle();
            return [carousel];
        });

        return () => started.forEach((c) => c.dispose());
    }, [brands.length]);

    // nothing added yet, still loading, or the request failed: show nothing instead of an empty carousel
    if (brands.length === 0) return null;

    return(
        <>
         <h2>{title}</h2>
            <p className='centered-desc'>{description}</p>

            {/* Desktop-carousel */}
            <div className="desktop-carousel">
                <div ref={desktopRef} id="brandsDesktopCarousel" className="carousel slide carousel-fade">
                    <div className="carousel-inner">
                        {slides.map((slideGroup,slideIndex)=>(
                            <div key={slideIndex} className= {`carousel-item ${slideIndex === 0 ? 'active' : '' }`}>
                                <div className={`card-wrapper ${slideIndex === 0 ? 'cards-view' : ''}`} >
                                    {slideGroup.map((brand,brandIndex) => (
                                        <BrandCard key={brandIndex} image={imgSrc(brand.image)} brand={brand.brand} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile carousel */}
            <div className="mobile-carousel">
                    <div ref={mobileRef} id="brandsMobileCarousel" className="carousel slide carousel-fade">
                        <div className="carousel-inner">
                            {brands.map((brand,index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <div className="card-wrapper cards-view">
                                        <BrandCard image={imgSrc(brand.image)} brand={brand.brand} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
        </>
    )
}
