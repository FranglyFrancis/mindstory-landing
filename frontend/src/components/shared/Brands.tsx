import { useState } from 'react';
import type { CSSProperties } from 'react';
import BrandCard from './BrandCard';
import './Brands.css'
import './BrandsMarquee.css';  
import { imgSrc } from '../../utils/imgSrc';
import { useBrands } from '../../hooks/useBrands';

type BrandProps = {
    title: string;
    description: string;
}

// The logos scroll sideways by themselves, in a loop with no gap or jump.
// One "set" is repeated until it is long enough to fill a wide screen; the set is drawn twice and
// the track slides left by exactly one set, which is what makes the loop seamless.
const MIN_ITEMS_PER_SET = 12;
const SECONDS_PER_LOGO = 4;   // bigger number = slower scrolling

export default function Brands({
    title,
    description
}: BrandProps) {
    const { brands } = useBrands();
    const [paused, setPaused] = useState(false);

    // nothing added yet, still loading
    if (brands.length === 0) return null;

    const copies = Math.ceil(MIN_ITEMS_PER_SET / brands.length);
    const set = Array.from({ length: copies }, () => brands).flat();
    const seconds = set.length * SECONDS_PER_LOGO;

    const renderSet = () =>
        set.map((brand, i) => (
            <li key={i} className="brands-item">
                <BrandCard image={imgSrc(brand.image)} brand={brand.brand} />
            </li>
        ));

    return(
        <>
            <h2>{title}</h2>
            <p className='centered-desc'>{description}</p>

            <div
                className={`brands-marquee ${paused ? 'is-paused' : ''}`}
                role="region"
                aria-label="Brands we have worked with"
            >
                <div className="brands-track" style={{ '--duration': `${seconds}s` } as CSSProperties}>
                    <ul className="brands-set">{renderSet()}</ul>
                    {/* the second copy only exists to make the loop seamless, so screen readers skip it */}
                    <ul className="brands-set brands-dup" aria-hidden="true">{renderSet()}</ul>
                </div>
            </div>

            {/* <button
                type="button"
                className="brands-toggle"
                aria-pressed={paused}
                onClick={() => setPaused((p) => !p)}
            >
                {paused ? 'Play scrolling' : 'Pause scrolling'}
            </button> */}
        </>
    )
}
