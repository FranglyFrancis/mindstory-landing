import { useEffect, useMemo, useState } from 'react';
import './SuccessStories.css';
import '../Card.css';
import { API_URL } from '../../../config';
import { imgSrc } from '../../../utils/imgSrc';
import { Blog } from '../../../types';
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
const MOBILE_QUERY = '(max-width: 768px)';

function SuccessStories() {
    const [stories, setStories] = useState<Blog[]>([]);
    const [paused, setPaused] = useState(false);
    const [perView, setPerView] = useState(() =>
        window.matchMedia(MOBILE_QUERY).matches ? 1 : 3
    );
    const [index, setIndex] = useState(0);
    const [touchX, setTouchX] = useState<number | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/api/success-stories`)
            .then((r) => (r.ok ? r.json() : Promise.reject()))
            .then((list: ApiStory[]) => setStories(list.map(toCard)))
            .catch(() => setStories([]));
    }, []);

    // 3 cards per slide on desktop, 1 on mobile
    useEffect(() => {
        const mq = window.matchMedia(MOBILE_QUERY);
        const onChange = () => setPerView(mq.matches ? 1 : 3);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);



    const slides = useMemo(() => storyArray(stories, perView), [stories, perView]);

    // auto advance every 4 seconds; restarts after a manual click
    useEffect(() => {
        if (slides.length < 2 || paused) return;
        const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 4000);
        return () => clearTimeout(t);
    }, [index, slides.length, paused]);

    // keep the index valid when the slide count changes (resize / data load)
    useEffect(() => {
        if (index >= slides.length) setIndex(0);
    }, [slides.length, index]);

    const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
    const next = () => setIndex((i) => (i + 1) % slides.length);

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchX === null) return;
        const diff = e.changedTouches[0].clientX - touchX;
        if (Math.abs(diff) > 50) (diff < 0 ? next : prev)();
        setTouchX(null);
    };

    if (stories.length === 0) return null;

    return (
        <section>
            <div className="section-heading">
                <span><h1>The Work That Speaks </h1> <a href=""> | View Projects</a></span>
            </div>
            <p>From bold ideas to meaningful impact, explore the brands we've helped shape and the stories we've brought to life.</p>

            {/* {slides.length > 1 && (
                <div
                    className="stories-viewport"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onTouchStart={(e) => { setPaused(true); setTouchX(e.touches[0].clientX); }}
                    onTouchEnd={(e) => { onTouchEnd(e); setPaused(false); }}
                >
                    <button className="carousel-contr
                    ol-prev" type="button" onClick={prev}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" onClick={next}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            )} */}

            <div
                className="stories-viewport"
                onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="stories-track"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {slides.map((group, i) => (
                        <div className="stories-slide" key={i}>
                            <div className="cards-wrapper">
                                {group.map((story) => (
                                    <SuccessCard key={story.id} card={story} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {slides.length > 1 && (
                <div className="stories-dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            className={i === index ? 'active' : ''}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default SuccessStories;