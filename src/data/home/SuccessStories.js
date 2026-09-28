import kairali from '../../assets/stories/kairali.webp'
import inker from '../../assets/stories/inker.webp'
import gold from '../../assets/stories/gold.webp'
import motory from '../../assets/stories/motory.webp'
import spais from '../../assets/stories/spais.webp'
import wincentre from '../../assets/stories/wincentre.webp'
import boche from '../../assets/stories/boche.webp'
import indel from '../../assets/stories/indel.webp'

export const stories = [
        {
            id:1,
            image: kairali,
            title: 'Kairali-Ford',
            url: "https://mindstory.in/project-view/kairali-ford/",
            description: "The collaboration between Kairali Ford and the digital marketing team emphasized enhancing Kairali's service division through effective online strategies. The focus on showcasing service excellence, educating customers, and sharing positive experiences led to increased engagement and inquiries..."
            
        },
        {   
            id:2,
            image: inker,
            title: "Inker Robotics",
            url: "https://mindstory.in/project-view/inker-robotics/",
            description: "The Inker Robotics Exhibition, with Mindstory's design and digital marketing expertise, showcased a fusion of innovation and technology, achieving increased visibility..."
        },
        {
            id:3,
            image: gold,
            title: "Gold's Gym",
            url: "https://mindstory.in/project-view/golds-gym/",
            description:"The Gold's Gym Kuriachira case study highlights Mindstory's strategic digital marketing efforts, which significantly enhanced the gym's online visibility..."
        },
        {
            id:4,
            image: motory,
            title:"Motory",
            url: "https://mindstory.in/project-view/motory/",
            description: "Leveraging Mindstory's expertise, Motory amplified its digital presence through strategic social media management, targeted paid ad campaigns..."
        },
        {
            id:5,
            image: spais,
            title:"Spais",
            url: "https://mindstory.in/project-view/spais/",
            description:"The case study highlights the fruitful partnership between Spais, an authentic spice brand, and Mindstory, a top digital marketing agency..."
        },
        {
            id:6,
            image: wincentre,
            title: "Wincentre",
            url: "https://mindstory.in/project-view/wincentre/",
            description: "The Wincentre case study showcases the impact of Mindstory's digital marketing strategies, which significantly improved Wincentre's online visibility and student engagement..."
        },
        {
            id:7,
            image: boche,
            title: "Chemmanur Credits",
            url: "https://mindstory.in/project-view/chemmanur-credits-and-investments-limited/",
            description: "In partnership with Mindstory, Chemmanur Credits and Investments Limited successfully expanded its digital presence through targeted marketing for NCD public issues..."
        },
        {
            id:8,
            image: indel,
            title: "Indel Money Limited",
            url: "https://mindstory.in/project-view/indel-money-limited/",
            description: "Mindstory's strategic digital marketing efforts for Indel Money led to significant enhancements in the company's online visibility and SEO rankings..."
        }
]

export function storyArray(array,size){
    const stories = [];
    for(let i = 0; i < array.length; i += size){
        stories.push(array.slice(i, i + size))
    }
    return stories;
}
