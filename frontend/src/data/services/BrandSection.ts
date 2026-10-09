import flip from '/images/service/flip.webp';
import question from '/images/service/question.webp';
import { Section } from '../../types';

export const heading = {
          title:"Our Approach",
          description:"We understand that every project is unique, and we tailor our approach to suit your specific needs and goals. Through collaborative brainstorming sessions, we delve deep into your brand ethos, audience preferences, and market trends to develop concepts that resonate with your target demographic. From initial sketches to final execution, we keep you involved every step of the way, ensuring that the end result exceeds your expectations."
        }

export const sections: Section[]= [
    {
        id: 1,
        title: "Services Offered",
        image: flip,
        content: [
            {
                id: 1,
                title: "Brand Identity Design",
                description: "Your brand is more than just a logo; it's the embodiment of your values and aspirations. We specialize in creating cohesive brand identities that reflect the essence of your business, helping you stand out in a crowded marketplace."
            },
            {
                id: 2,
                title: "Print Design",
                description: "From business cards and brochures to packaging and signage, we offer a comprehensive range of print design services that elevate your brand presence both online and offline."
            },
            {
                id: 3,
                title: "Digital Design",
                description: "In today's digital age, compelling visuals are essential for capturing and retaining audience attention. Whether it's website graphics, social media assets, or email newsletters, our digital design solutions are crafted to enhance user engagement and drive conversions."
            },
            {
                id: 4,
                title: "Illustration",
                description: "Illustrations add a unique touch to any project, infusing it with personality and charm. Our team of skilled illustrators creates custom artworks that bring your ideas to life, whether it's for editorial purposes, merchandise, or multimedia content."
            }
            
        ]
    },
    {
        id: 2,
        title: "Why Choose Mindstory?",
        image: question,
        content: [
            {
                id: 1,
                title: "Creativity Unleashed",
                description: "We thrive on pushing the boundaries of creativity, constantly seeking new inspirations and innovative techniques to deliver unparalleled design solutions."
            },
            {
                id: 2,
                title:"Attention to Detail",
                description:"We believe that the devil is in the details, and we meticulously refine every aspect of our designs to ensure they are polished to perfection."
            },
            {
                id:3,
                title:"Client-Centric Approach",
                description:"Your satisfaction is our top priority, and we go above and beyond to exceed your expectations, delivering results that are not just aesthetically pleasing but also strategically aligned with your business objectives."
            }
        ]
    }
]