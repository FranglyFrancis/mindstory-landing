import brand from '/images/brand.webp';
import seo from '/images/seoS.webp';
import logo from '/images/logoS.webp';
import email from'/images/emailS.webp';
import web from '/images/social.webp';
import social from '/images/social.webp';
import { Service } from '../../types';

export const services: Service[] = [
            {
                id:1,
                slug:'social-media-marketing',
                title:" SOCIAL MEDIA MARKETING",
                description:'Elevate your online presence with our strategic Social Media Marketing services. We craft plans to maintain your social footprint and engage effectively with your audience.',
                image: social
            },
           
            {
                id:2,
                slug:'seo-optimisation',
                title:'SEO OPTIMIZATION',
                description:'Boost visibility with vital SEO services. Be found when customers search for products/services like yours. We optimize your online presence for search engine prominence.',
                image: seo
            },
            {
                id:3,
                slug:'logo-design',
                title:'LOGO DESIGN',
                description:"Craft a powerful first impression with Mindstory's custom logo designs. Our creative expertise ensures your unique brand identity shines, leaving an enduring mark on the world's visual landscape.",
                image: logo
            },
            {
                id:4,
                slug:'email-marketing',
                title:'EMAIL MARKETING',
                description:'Stand out in crowded inboxes with our Email Marketing campaigns. We help you reach your customers directly, delivering the right content to captivate and engage.',
                image: email
            },
            {
                id:5,
                slug:'brand-identity',
                title:'BRAND IDENTITY ',
                description:'Connect with your audience through unique art and illustrations. Mindstory helps forge strong brand identities with visuals crafted specifically for your website.',
                image: brand
            },
            {
                id:6,
                slug:'web-development',
                title:'WEB DEVELOPMENT ',
                description:'Collaborate with our team for outstanding, high-performing, and secure custom websites. Mindstory works closely with enterprises to bring digital visions to life.',
                image: web
            }
        ];