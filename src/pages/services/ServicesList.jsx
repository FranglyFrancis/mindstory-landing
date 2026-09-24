import ServiceCard from "./ServiceCards"
import socialMedia from '../../assets/social-media.webp'
import seo from '../../assets/seoS.webp'
import logo from '../../assets/logoS.webp'
import email from'../../assets/emailS.webp'
import web from '../../assets/web.webp'
import social from '../../assets/social.webp'

const services = [
            {
                id:1,
                title:" SOCIAL MEDIA MARKETING",
                description:'Elevate your online presence with our strategic Social Media Marketing services. We craft plans to maintain your social footprint and engage effectively with your audience.',
                image: socialMedia
            },
           
            {
                id:2,
                title:'SEO OPTIMIZATION',
                description:'Boost visibility with vital SEO services. Be found when customers search for products/services like yours. We optimize your online presence for search engine prominence.',
                image: seo
            },
            {
                id:3,
                title:'LOGO DESIGN',
                description:"Craft a powerful first impression with Mindstory's custom logo designs. Our creative expertise ensures your unique brand identity shines, leaving an enduring mark on the world's visual landscape.",
                image: logo
            },
            {
                id:4,
                title:'EMAIL MARKETING',
                description:'Stand out in crowded inboxes with our Email Marketing campaigns. We help you reach your customers directly, delivering the right content to captivate and engage.',
                image: email
            },
            {
                id:5,
                title:'BRAND IDENTITY ',
                description:'Connect with your audience through unique art and illustrations. Mindstory helps forge strong brand identities with visuals crafted specifically for your website.',
                image: web
            },
            {
                id:6,
                title:'WEB DEVELOPMENT ',
                description:'Collaborate with our team for outstanding, high-performing, and secure custom websites. Mindstory works closely with enterprises to bring digital visions to life.',
                image: social
            }
        ];

export default function ServicesList(){
    
    return(
        <>
            <section className="services-list">
                <div className="services-grid">
                    {services.map((service)=>(
                        <ServiceCard 
                            key= {service.id}
                            service= {service}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}