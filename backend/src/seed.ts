import "dotenv/config";
import mongoose from "mongoose";
import { Service } from "./models/Service.js";

console.log("URI loaded:", Boolean(process.env.MONGODB_URI));
await mongoose.connect(process.env.MONGODB_URI as string);
console.log("connected")

try {
    await Service.deleteMany({});
    console.log("cleared");

    // Social Media Section
    await Service.create([
      {
        slug:'social-media-marketing',
        title:" SOCIAL MEDIA MARKETING",
        description:'Elevate your online presence with our strategic Social Media Marketing services. We craft plans to maintain your social footprint and engage effectively with your audience.',
        image: '/images/social.webp',
        order: 1,
        hero: {
          image: '/images/service/social.webp',
          title: "Your Trusted Social Media Marketing Company in Thrissur",
          description: "Boost your brand’s online presence with Mindstory, the premier social media marketing agency in Thrissur. Our data-driven strategies ensure that your business stands out across social platforms, fostering engagement, building brand loyalty, and driving conversions. Whether you're looking to increase visibility, connect with your audience, or boost sales, we craft campaigns that deliver measurable results."
        },
        imageItem: {
          image: '/images/service/social-media.webp',
          description: "As a leading social media marketing company in Thrissur, we understand that social media can either elevate your brand to new heights or damage its reputation. That’s why we focus on well-planned, high-quality content and engagement strategies that maintain your brand’s integrity while maximizing its impact. Our team ensures every post and campaign reflects your brand’s identity, driving long-term success and audience growth. Partner with Mindstory today to transform your social media presence and take your brand to the next level! We operate 24X7 to drive customer engagement, offering unparalleled support. Tailoring strategies to your brand, our team targets potential customers, increasing awareness and reflecting success in metrics like re-tweets, shares, comments, likes, and views across major platforms. Trust Mindstory to navigate the intricate landscape of social media, amplifying your brand's presence and driving impactful results." 
        },
        iconCards: [
          {
              icon: "bi bi-heart",
              title: "Brand Monitoring",
              description: "Elevate your business reputation with Mindstory's brand monitoring. Discover and influence how your brand is perceived, empowering you to shape a positive and impactful online presence."
          },
          {
              icon: "bi bi-heart",
              title: "Social Media Analytics & Reporting",
              description: "Before diving into social media marketing, gain insights through meticulous competitor tracking. Mindstory provides valuable analytics and reporting, offering a deep understanding of the communities around your brand."
          },
          {
              icon: "bi bi-brightness-high",
              title: "Social Media Contests",
              description: "Transform traffic with strategic social media contests. Our experts analyze your brand to determine the most effective content and platforms across Facebook, Twitter, and Pinterest for rapid traffic growth."
          },
          {
              icon: "bi bi-link",
              title: "Setup & Custom Profile Design",
              description: "Craft a captivating online presence with Mindstory's social media profile creation and customization. We infuse quality content and aesthetics, ensuring resonance with your brand vision and audience."
          },
          {
              icon: "bi bi-gear",
              title: "Social Media Management",
              description: "Entrust your social media presence to Mindstory's expert team. We manage your accounts, engaging with your audience on your behalf to ensure a vibrant and responsive online community."
          },
          {
              icon: "bi bi-brightness-high",
              title: "Reputation Management",
              description: "Stay ahead of the curve with Mindstory's reputation management. Actively engage with customers and online reviews, shaping your online narrative and maintaining control over how your business is perceived."
          }
        ]
      }
    ])

    // Seo Section
    await Service.create([
      {
        slug:'seo-optimisation',
        title:'SEO OPTIMIZATION',
        description:'Boost visibility with vital SEO services. Be found when customers search for products/services like yours. We optimize your online presence for search engine prominence.',
        image: '/images/seoS.webp',
        order: 2,
        hero: {
          image:'/images/service/seo.webp',
          title:"Boost Your Brand with the Best SEO Agency in Thrissur",
          description:"Unlock the full potential of your brand with Mindstory, the best SEO agency in Thrissur, offering bespoke search engine optimization services in Thrissur. Our expert-driven strategies are designed to propel your revenue by maximizing visibility on search engines. At Mindstory, we blend industry-leading expertise with advanced technology to create data-driven solutions that enhance your online presence and deliver measurable results. Whether you’re looking to dominate local search or expand globally, our SEO services in Thrissur are tailored to meet your brand’s unique needs."
         },
         //Shared blocks
         heading:{
           title: "Results-Driven SEO Company in Thrissur",
           description: "Embark on a journey to digital excellence with Mindstory’s SEO services, where customization meets innovation. Our SEO company in Thrissur specializes in bridging gaps in your strategy, leveraging the power of organic search to transform clicks into revenue. From keyword optimization to technical SEO and content marketing, we craft comprehensive strategies that drive sustainable growth. Ready to elevate your online success? Contact us today for a personalized strategy and pricing details! Here's a glimpse of what we offer:"
         },

         titleCards: [
            {
                title:"Keyword Research",
                description:"Maximize precision with Mindstory's local keyword expertise. We analyze how people search, differentiating high-volume generic words from targeted, conversion-driven phrases. Your goals, met."
            },
            {
                title:"On-Page SEO",
                description:"Maximize visibility with Mindstory's On-Page SEO solutions. Ensure your content is easily accessible to search engines, as our team implements strategic solutions to boost rankings and enhance overall performance."
            },
            {
                title:"Off-Page SEO",
                description:"Build a robust internal link profile with Mindstory's essential Off-Page SEO strategies. Adding significance to your page keywords within search engines, we contribute to the overall success of your SEO strategy."
            },
            {
                title:"Link Building",
                description:"Ascend to new SEO heights with Mindstory's link expertise, ensuring high-relevance links for a competitive edge. Our trust-building strategy with search engines makes us your SEO partner for success."
            },
            {
                title:"Blog Posting",
                description:"Optimize your content's accessibility with Mindstory's Blog Posting services. Our team implements solutions to enhance your rankings and overall performance, ensuring your content is well-positioned in search engine results."
            },
            {
                title:"Rank Report",
                description:"Strengthen your SEO strategy with Mindstory's Rank Report offerings. We build your internal link profile, adding significance to page keywords within search engines, contributing to the ongoing success of your SEO efforts."
            }
          ],

          iconCards: [
            {
                id:1,
                icon:"bi bi-bar-chart",
                title:"10-30%",
                description:"Organic Traffic - Increase"
            },
            {
                id:2,
                icon:"bi bi-brightness-high",
                title:"15-25%",
                description:"Bounce Rate - Decrease"
            },
            {
                id:3,
                icon:"bi bi-watch",
                title:"10-50%",
                description:"Average Visit Duration - Increase"
            },
            {
                id:4,
                icon:"bi bi-layers",
                title:"10-25%",
                description:"Pages Per Session - Increase"
            }
          ],

          faqs: [
            {
              "id": 1,
              "question": "1. What is SEO and why is it important for my business?",
              "answer": "SEO stands for Search Engine Optimization. It's a process of optimizing your website to rank higher in search engine results pages (SERPs), which helps increase the quantity and quality of traffic to your site. It's crucial for your business as it enhances visibility, drives organic traffic, and improves user experience, contributing to higher conversions and sales."
            },
            {
              "id": 2,
              "question": "2. How does Mindstory approach SEO?",
              "answer": "At Mindstory, our SEO approach is holistic, combining technical SEO, content strategy, on-page optimization, and off-page SEO techniques. We start with a comprehensive site audit, understand your business goals, research your target audience and competitors, and then craft a customized SEO strategy that aligns with your objectives."
            },
            {
              "id": 3,
              "question": "3. How long does it take to see results from SEO?",
              "answer": "SEO is a long-term strategy. While some improvements can be seen in a few weeks, significant and sustainable results typically take 6 to 12 months. This timeline can vary based on your website's current state, competition in your industry, and the effectiveness of the implemented SEO strategies."
            },
            {
              "id": 4,
              "question": "4. Can Mindstory guarantee my website will rank #1 on Google?",
              "answer": "No reputable SEO agency can guarantee #1 rankings on Google due to the ever-changing nature of search engine algorithms and competitive dynamics. At Mindstory, we focus on implementing best practices and data-driven strategies to significantly improve your website's visibility and ranking potential."
            },
            {
              "id": 5,
              "question": "5. Will Mindstory help with local SEO?",
              "answer": "Yes, Mindstory specializes in local SEO strategies that are crucial for businesses targeting customers in specific geographic areas. We optimize your website and its content for local search queries, manage your Google My Business listing, and ensure your business appears in relevant local directories."
            },
            {
              "id": 6,
              "question": "6. How does Mindstory keep up with the constantly changing SEO landscape?",
              "answer": "Our team at Mindstory is committed to continuous learning and professional development. We stay updated with the latest SEO trends, algorithm updates, and best practices through ongoing training, attending industry conferences, and participating in professional SEO communities."
            },
            {
              "id": 7,
              "question": "7. What kind of SEO reporting does Mindstory provide?",
              "answer": "Mindstory provides detailed monthly SEO reports that include your website's performance metrics, such as organic traffic, ranking improvements, backlink profile, and a summary of the completed and upcoming SEO tasks. We believe in transparency and ensure our clients are informed about the progress and results of our SEO efforts."
            },
            {
              "id": 8,
              "question": "8. How does content play a role in Mindstory's SEO strategy?",
              "answer": "Content is at the heart of our SEO strategy. High-quality, relevant, and engaging content not only attracts and retains users but also signals search engines about the relevance and authority of your website. We focus on creating a comprehensive content strategy that includes keyword research, content creation, optimization, and distribution to improve your site's SEO performance."
            },
            {
              "id": 9,
              "question": "9. Do you provide technical SEO services?",
              "answer": "Yes, technical SEO is a critical component of our SEO services. We ensure that your website is technically sound, with fast loading speeds, mobile optimization, secure connections (HTTPS), and a structured hierarchy, making it easy for search engines to crawl and index your content."
            },
            {
              "id": 10,
              "question": "10. How can I start with Mindstory's SEO services?",
              "answer": "To get started with our SEO services, you can contact us through our website, email, or phone. We'll schedule an initial consultation to understand your business, discuss your SEO goals, and propose a customized SEO strategy tailored to your needs."
            }
          ]
      }
    ])

    // Logo Section
    // await Service.create([
    //   {
    //     image:'/images/service/logo.webp',
    //     slug:'logo-design',
    //     title:"Crafting Distinctive Identities with Mindstory's Logo Design",
    //     description:"At Mindstory, we understand that a logo is more than just an image; it's the heart and soul of your brand's identity. Based in the vibrant landscapes of Kerala, with thriving branches in Thrissur and Kochi, we are committed to crafting logos that not only stand out but also tell your brand's unique story. Whether you're a budding restaurant in Kochi, an innovative educational institution in Thrissur, or a healthcare provider in the serene backwaters of Kerala, we have the expertise to bring your vision to life.",
    //     order: 3,
    //     hero: {
    //       title:'LOGO DESIGN',
    //       description:"Craft a powerful first impression with Mindstory's custom logo designs. Our creative expertise ensures your unique brand identity shines, leaving an enduring mark on the world's visual landscape.",
    //       image: '/images/logoS.webp'
    //     }

    //   }
    // ])


    // Web Development Section
    await Service.create([
    {
        slug:'web-development',
        title:"WEB DEVELOPMENT",
        description:'Collaborate with our team for outstanding, high-performing, and secure custom websites. Mindstory works closely with enterprises to bring digital visions to life.',
        image: '/images/web.webp',
        order: 4,
        hero: {
                image: '/images/service/web.webp',
                title:"Expert Web Development Services in Thrissur",
                description:"Looking for a dynamic and innovative website development company in Thrissur? Mindstory is your go-to partner for comprehensive web development services, covering everything from custom website design to full-stack development. Our holistic approach ensures that every element of your website, from its visual appeal to its technical functionality, is optimized for peak performance. Let us transform your vision into a powerful digital presence—connect with Mindstory today to create a website that truly stands out! Enhance your online presence with Mindstory, the leading web development company in Thrissur, offering cutting-edge web development services tailored to your business needs. Our expertise combines creativity with advanced technology to craft visually stunning, high-performing websites that captivate and engage users. Whether you're looking for seamless front-end development or robust back-end solutions, our team ensures a smooth, user-friendly experience that drives results."
        },
        // Shared blocks
        intro: {
            title: "Top Web Design Company in Thrissur",
            left: "As a premier web designing company in Thrissur, we understand the unique digital landscape and create bespoke designs that resonate with both local and global audiences. Our approach blends modern aesthetics with the latest trends, ensuring your website not only looks exceptional but also performs at its best. At Mindstory, we go beyond basic design to develop intuitive, responsive, and result-oriented websites that set your brand apart.",
            right: "Our team of experienced professionals is dedicated to providing personalized solutions that align with your business goals, ensuring your website not only attracts organic traffic but also converts visitors into loyal customers. <br /> <br /> Let's embark on this digital journey together and create a website that truly represents your brand and drives your business forward. For a website that combines beautiful design with seamless functionality, look no further than Mindstory. Contact us today to discuss your web development needs and discover how we can help you achieve digital excellence."
        },

        // list
        lists: [
          {
            icon:"bi bi-bag",
            title: "E-commerce Solutions",
            description: "Our company has successful solutions to develop ecommerce and shopping cart software for online businesses."
          },
          {
            icon:"bi bi-file-earmark-check",
            title: "CMS - WordPress, Drupal",
            description: "We develop content management systems (CMS) to enable you to manage site content effectively."
          },
          {
            icon:"bi bi-globe",
            title: "Intranets/Extranets",
            description: "Our team develops custom solutions for Intranets & Extranet development, Sharepoint integration and knowledge management."
          },
          {
            icon:"bi bi-flag",
            title: "Facebook Applications",
            description: "We are a leading application development company offering Web, Mobile & Facebook App Development services."
          },
          {
            icon:"bi bi-envelope",
            title: "Email Marketing Solutions",
            description: "We create best-in-class email marketing software to create, send and track email campaigns that will earn results."
          },
          {
            icon:"bi bi-gear",
            title: "PHP and JS Development",
            description: "We provide software development services in: PHP, Drupal, Python, JavaScript/ jQuery and other modern technologies."
          }
     ],
     titleItem: [
            {
            image:"/images/service/web1.webp",
            title:"Cross-platform and responsive web development",
            description:"We provide rigorous testing for all major device types as well as browsers and operating systems before we launch your new website and sign-off the project. Testing is performed both as a user and as an administrator to ensure your site is modern and responsive."
        },
        {
        title: "Secured testing environment for your web project",
        description: "We use complex content gathering tools that allow visualizing content in terms of site architecture, to which we’ll make changes within your team before it goes live. Also, you have access to a secured staging or testing environment of your site which is hosted on our servers during the process of your creation.",
        image: "/images/service/web2.webp"
        }
      ]
    }
     
    ])

    
    console.log("Seeded");
}

catch{
    console.log("Failed")
}

finally{
    await mongoose.disconnect();
    console.log("done");
}

