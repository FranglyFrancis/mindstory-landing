import webHero from '../../../assets/service/web.webp';
import socialHero from '../../../assets/service/social.webp';
import seoHero from '../../../assets/service/seo.webp';
import logoHero from '../../../assets/service/logo.webp';
import emailHero from '../../../assets/service/email.webp';
import brandHero from '../../../assets/service/brand.webp'

import BrandSection from '../../../pages/services/sections/BrandSection';
import EmailMarketingSection from '../../../pages/services/sections/EmailMarketingSection';
import LogoDesignSection from '../../../pages/services/sections/LogoDesignSection';
import SeoSection from '../../../pages/services/sections/SeoSection.jsx';
import SocialMediaSection from '../../../pages/services/sections/SocialMediaSection';
import WebDesignSection from '../../../pages/services/sections/WebDesignSection';

export const heroes = [
    {
        id:1,
        Sections: WebDesignSection,
        image:webHero,
        slug:'web-development',
        title:"Expert Web Development Services in Thrissur",
        description:"Looking for a dynamic and innovative website development company in Thrissur? Mindstory is your go-to partner for comprehensive web development services, covering everything from custom website design to full-stack development. Our holistic approach ensures that every element of your website, from its visual appeal to its technical functionality, is optimized for peak performance. Let us transform your vision into a powerful digital presence—connect with Mindstory today to create a website that truly stands out! Enhance your online presence with Mindstory, the leading web development company in Thrissur, offering cutting-edge web development services tailored to your business needs. Our expertise combines creativity with advanced technology to craft visually stunning, high-performing websites that captivate and engage users. Whether you're looking for seamless front-end development or robust back-end solutions, our team ensures a smooth, user-friendly experience that drives results."
    },
    {   
        id:2,
        Sections: SocialMediaSection,
        image:socialHero,
        slug:'social-media-marketing',
        title:"Your Trusted Social Media Marketing Company in Thrissur",
        description:"Boost your brand’s online presence with Mindstory, the premier social media marketing agency in Thrissur. Our data-driven strategies ensure that your business stands out across social platforms, fostering engagement, building brand loyalty, and driving conversions. Whether you're looking to increase visibility, connect with your audience, or boost sales, we craft campaigns that deliver measurable results."
    },
    {
        id:3,
        Sections: SeoSection,
        image:seoHero,
        slug:'seo-optimisation',
        title:"Boost Your Brand with the Best SEO Agency in Thrissur",
        description:"Unlock the full potential of your brand with Mindstory, the best SEO agency in Thrissur, offering bespoke search engine optimization services in Thrissur. Our expert-driven strategies are designed to propel your revenue by maximizing visibility on search engines. At Mindstory, we blend industry-leading expertise with advanced technology to create data-driven solutions that enhance your online presence and deliver measurable results. Whether you’re looking to dominate local search or expand globally, our SEO services in Thrissur are tailored to meet your brand’s unique needs."
    },
    {
        id:4,
        Sections: LogoDesignSection,
        image:logoHero,
        slug:'logo-design',
        title:"Crafting Distinctive Identities with Mindstory's Logo Design",
        description:"At Mindstory, we understand that a logo is more than just an image; it's the heart and soul of your brand's identity. Based in the vibrant landscapes of Kerala, with thriving branches in Thrissur and Kochi, we are committed to crafting logos that not only stand out but also tell your brand's unique story. Whether you're a budding restaurant in Kochi, an innovative educational institution in Thrissur, or a healthcare provider in the serene backwaters of Kerala, we have the expertise to bring your vision to life."
    },
    {
        id:5,
        Sections: EmailMarketingSection,
        image:emailHero,
        slug:'email-marketing',
        title:"Strategic Email Marketing for Enhanced Engagement",
        description:"Amidst crowded inboxes, Mindstory excels in crafting email campaigns that stand out, delivering tailored content directly to your customers. Our advanced SEO strategies ensure enhanced visibility, making your campaigns not only noticeable but also impactful in a competitive digital landscape."
    },
    {
        id:6,
        Sections: BrandSection,
        image:brandHero,
        slug:'brand-identity',
        title:"Unlocking Imagination through Visuals",
        description:"At Mindstory, we believe that creativity knows no bounds. Our Creative Graphic Design services are meticulously crafted to breathe life into your ideas, transforming them into captivating visuals that leave a lasting impression. Whether you're looking to revamp your brand identity, create stunning marketing materials, or craft engaging digital content, our team of talented designers is here to bring your vision to fruition."
    }
]