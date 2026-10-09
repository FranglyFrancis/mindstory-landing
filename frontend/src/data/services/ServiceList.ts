import target from '/images/service/target.webp'
import globe from '/images/service/globe.webp'
import coin from '/images/service/coin.webp'
import cogs from '/images/service/cogs.webp'
import mail from '/images/service/mail.webp'
import notebook from '/images/service/notebook.webp'
import { HomeList } from '../../types'

export const services: HomeList[] = [
    {
        id:1,
        title:"Local Search Strategy",
        description:"Unlock top rankings with Mindstory's Local Search Strategy. We optimize your content for search engines, ensuring accessibility and a prominent presence in your area. Elevate your digital visibility.",
        image: target
    },
    {
        id:2,
        title:"Digital Advertising",
        description:"Dominate platforms with Mindstory's Digital Advertising prowess. We leverage internet platforms strategically to deliver impactful promotional ads, expanding your reach and influence.",
        image: globe
    },
    {
        id:3,
        title:"Web Design Services",
        description:"Immerse in a digital experience with Mindstory's Web Design Services. In a world where first impressions matter, our designs are the key to leaving a lasting impact online.",
        image: cogs
    },
    {
        id:4,
        title:"Paid Advertising",
        description:"Catapult your business with Mindstory's Paid Advertising solutions. From paid ads to Pay-per-click, we strategically position your brand for accelerated growth and success.",
        image: coin
    },
    {
        id:5,
        title:"Custom Website Design",
        description:"Revolutionize online presence with Mindstory's Custom Website Design. Our developer team employs the latest web technologies, offering a spectrum of services for diverse online experiences.",
        image: notebook
    },
    {
        id:6,
        title:"Business & Advertising",
        description:"Optimize with Mindstory's Business Advertising solutions. It's the premier method to channel targeted traffic to your web businesses, ensuring prominence and success in the digital realm.",
        image: mail
    }
]