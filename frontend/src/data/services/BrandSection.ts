import flip from '/images/service/flip.webp';
import question from '/images/service/question.webp';
import { Section } from '../../types';

export const sections: Section[]= [
    {
        title: "Services Offered",
        image: '/images/service/flip.webp',
        content: [
            {
                title: "Brand Identity Design",
                description: "Your brand is more than just a logo; it's the embodiment of your values and aspirations. We specialize in creating cohesive brand identities that reflect the essence of your business, helping you stand out in a crowded marketplace."
            },
            {
                title: "Print Design",
                description: "From business cards and brochures to packaging and signage, we offer a comprehensive range of print design services that elevate your brand presence both online and offline."
            },
            {
                title: "Digital Design",
                description: "In today's digital age, compelling visuals are essential for capturing and retaining audience attention. Whether it's website graphics, social media assets, or email newsletters, our digital design solutions are crafted to enhance user engagement and drive conversions."
            },
            {
                title: "Illustration",
                description: "Illustrations add a unique touch to any project, infusing it with personality and charm. Our team of skilled illustrators creates custom artworks that bring your ideas to life, whether it's for editorial purposes, merchandise, or multimedia content."
            }
            
        ]
    },
    {
        title: "Why Choose Mindstory?",
        image: '/images/service/question.webp',
        content: [
            {
                title: "Creativity Unleashed",
                description: "We thrive on pushing the boundaries of creativity, constantly seeking new inspirations and innovative techniques to deliver unparalleled design solutions."
            },
            {
                title:"Attention to Detail",
                description:"We believe that the devil is in the details, and we meticulously refine every aspect of our designs to ensure they are polished to perfection."
            },
            {
                title:"Client-Centric Approach",
                description:"Your satisfaction is our top priority, and we go above and beyond to exceed your expectations, delivering results that are not just aesthetically pleasing but also strategically aligned with your business objectives."
            }
        ]
    }
]