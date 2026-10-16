import { useEffect, useState } from 'react';
import './SuccessStories.css';
import './Card.css';
// import { storyArray } from '../../data/home/SuccessStories';
import { API_URL } from '../../config';
import { imgSrc } from '../../utils/imgSrc';
import { Blog } from '../../types';
import SuccessCard from './SuccessCard';

type ApiStory = { slug: string; projectName: string; projectDescription: string; projectImage: string };

const short = (s: string, max = 140) =>
    s.length > max ? s.slice(0, max).replace(/\s+\S*$/, '') + '…' : s;

// dashboard story -> the card shape your SuccessCard already expects.
// If your Blog type has other required fields (or a numeric id), adjust this one function.
const toCard = (s: ApiStory) =>
    ({
        id: s.slug,
        title: s.projectName,
        description: short(s.projectDescription),
        image: imgSrc(s.projectImage),
        url: `/project-view/${s.slug}`,
    }) as unknown as Blog;

export function storyArray<T>(array: T[],size: number): T[][]{
    const stories: T[][] = [];
    for(let i = 0; i < array.length; i += size){
        stories.push(array.slice(i, i + size))
    }
    return stories;
} 

function SuccessStories(){

const [stories, setStories] = useState<Blog[]>([]);

useEffect(() => {
    fetch(`${API_URL}/api/success-stories`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((list: ApiStory[]) => setStories(list.map(toCard)))
        .catch(() => setStories([]));
}, []);

// same helper as before: any number of projects becomes as many slides as needed
const slides = storyArray(stories,3);
const mobSlides = storyArray(stories,1);

// nothing created yet (or still loading): don't render an empty carousel
if (stories.length === 0) return null;

    return(
        <>
        <section>
            <div className='section-heading'>
                <h1>The Work That Speaks </h1> 
                <a href=""> | View Projects</a>
            </div>
            <p>From bold ideas to meaningful impact, explore the brands we've helped shape and the stories we've brought to life.</p>
            
            {/* Desktop arrow (only needed when there is more than one slide) */}
            {slides.length > 1 && (
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
            )}
                
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
            {mobSlides.length > 1 && (
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
            )}

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
