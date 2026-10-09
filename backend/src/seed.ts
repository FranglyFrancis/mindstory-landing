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
    await Service.create([
      {
        image:'/images/service/logo.webp',
        slug:'logo-design',
        title:"Crafting Distinctive Identities with Mindstory's Logo Design",
        description:"At Mindstory, we understand that a logo is more than just an image; it's the heart and soul of your brand's identity. Based in the vibrant landscapes of Kerala, with thriving branches in Thrissur and Kochi, we are committed to crafting logos that not only stand out but also tell your brand's unique story. Whether you're a budding restaurant in Kochi, an innovative educational institution in Thrissur, or a healthcare provider in the serene backwaters of Kerala, we have the expertise to bring your vision to life.",
        order: 3,
        hero: {
          title:'LOGO DESIGN',
          description:"Craft a powerful first impression with Mindstory's custom logo designs. Our creative expertise ensures your unique brand identity shines, leaving an enduring mark on the world's visual landscape.",
          image: '/images/logoS.webp'
        },
        article: {
          title:'Why Choose Mindstory for Your Logo & Branding Needs?',
          descriptions:[
            "Tailored Design Solutions",
            "From simple and elegant logos to intricate design ideas, we tailor our solutions to meet the unique needs of your company, ensuring your logo resonates with your brand ethos."
          ]
        },
        titleCards:  [
          {
            id:1,
            title:"Diverse Industry Expertise",
            description:"Whether it's a logo design for food brands, educational institutions, hospitals, or clothing lines, our diverse portfolio across various industries in Kerala showcases our versatility and creativity."
          },
          {
            id:2,
            title:"Digital Excellence",
            description:"As the premier digital marketing agency in Kerala, we ensure your logo thrives not only offline but also in the digital realm, enhancing your brand's online presence."
          },
          {
            id:3,
            title:"Creative Collaboration",
            description:"Our approach is collaborative and inclusive, involving you in every step of the design process to ensure the final logo design aligns with your vision and business goals."
          },
          {
            id:4,
            title:"Sustainable Branding",
            description:"We believe in creating logos that stand the test of time, ensuring your brand continues to grow and evolve without losing its core identity."
          }
        ],
        lists: [
        {
          "id": 1,
          icon:"bi bi-award",
          "title": "Understanding Your Story",
          "description": "We begin by diving deep into your brand's story, ethos, and objectives, ensuring your logo reflects the essence of your brand."
        },
        {
          "id": 2,
          icon: "bi bi-stars",
          "title": "Creative Conceptualization",
          "description": "Our team of creative experts brainstorm and present logo design ideas that are not only innovative but also aligned with your brand's vision."
        },
        {
          "id": 3,
          icon:"bi bi-arrow-repeat",
          "title": "Iterative Design",
          "description": "Our branding strategies ensure that your logo complements your overall brand identity, creating a cohesive and recognizable brand experience."
        },
        {
          "id": 4,
          icon:"bi bi-cloud",
          "title": "Digital Integration",
          "description": "In today's digital age, a logo needs to shine across various platforms. We ensure your logo is optimized for digital use, enhancing your brand's digital footprint."
        },
        {
          "id": 5,
          icon:"bi bi-chat-left",
          "title": "Brand Consistency",
          "description": "We refine and iterate based on your feedback, ensuring the logo design for your company, whether it's a restaurant, a hospital, or a fashion label, is perfect."
        }
      ],
      paraItem: [
        {
          description:
            "In conclusion, choosing Mindstory for your logo and branding needs means partnering with a digital marketing agency that truly understands the essence of your brand and the dynamics of the market in Kerala. Our bespoke logo designs are not just visually compelling but are strategically crafted to enhance your brand's identity and ensure it resonates with your target audience, whether they're in Kochi, Thrissur, or beyond. Our commitment to excellence, coupled with our deep understanding of the digital landscape, makes us the ideal choice for businesses looking to make a lasting impression."
        },
        {
          description:
            "Furthermore, Mindstory goes beyond logo design to offer a comprehensive suite of digital marketing services designed to elevate your brand's online presence. From SEO and content marketing to social media management and digital advertising, we have the tools and expertise to drive your brand to the top of search engine rankings, ensuring maximum visibility and engagement. Our holistic approach to digital marketing ensures that your brand not only looks great but also ranks high in the digital space."
        },
        {
          description:
            "Join the multitude of satisfied clients across Kerala who have transformed their brand identity with Mindstory's innovative logo and branding solutions. Let us be the architects of your brand's success story, crafting a logo that is not only a visual masterpiece but also a strategic tool for growth and recognition in the digital age. Contact Mindstory today, and take the first step towards redefining your brand's identity and achieving unparalleled success in the digital marketplace."
        } 
      ],
      brands: [
        {
            id:1,
            image:'/images/brands/allen.png',
            brand:"Allen Solly"
        },
        {
            id:2,
            image:'/images/brands/chaai.jpeg',
            brand:"Chai Peedika"
        },
        {
            id:3,
            image:'/images/brands/hyundai.png',
            brand:"Hyundai"
        },
        {
            id:4,
            image:'/images/brands/orgo.png',
            brand:"Orgo Yolks"
        },
        {
            id:5,
            image:'/images/brands/priis.png',
            brand:"Priis"
        },
        {
            id:6,
            image:'/images/brands/royal.png',
            brand:"Royal Enfield"
        },
        {
            id:7,
            image:'/images/brands/LP.jpeg',
            brand:"Louis Philippe"
        },
        {
            id:8,
            image:'/images/brands/orgo.png',
            brand:"Orgo Yolks"
        },
        {
            id:9,
            image:'/images/brands/priis.png',
            brand:"Priis"
        },
        {
            id:10,
            image:'/images/brands/royal.png',
            brand:"Royal Enfield"
        },
        {
            id:11,
            image:'/images/brands/LP.jpeg',
            brand:"Louis Philippe"
        },
        {
            id:12,
            image:'/images/brands/chaai.jpeg',
            brand:"Chai Peedika"
        }
    ]
    }

    ])

    // Email Section
    await Service.create([
      {
        slug:'email-marketing',
        title:"Strategic Email Marketing for Enhanced Engagement",
        description:"Amidst crowded inboxes, Mindstory excels in crafting email campaigns that stand out, delivering tailored content directly to your customers. Our advanced SEO strategies ensure enhanced visibility, making your campaigns not only noticeable but also impactful in a competitive digital landscape.",
        image:"/images/service/email.webp",
        order: 4,
        article: {
          title: "Stand out in crowded inboxes with Mindstory's strategic Email Marketing services. Our customer-centric and result-driven campaigns are designed to increase brand awareness, drive engagement, nurture leads, and facilitate sales directly to your customers with tailored content.",
          descriptions: [
            "Partner with us to build and grow your email program. We creatively design email templates, reaching potential customers at optimal times with relevant offers, fostering trustworthy relations. Mindstory ensures the highest conversion rate among marketing channels, delivering unparalleled ROI for your business.",
            "Our approach involves understanding the goals of your email campaign to achieve tangible results and a positive impact on your bottom line. From welcome emails introducing your brand to newsletters, announcements, seasonal, or engagement mails, we define target audiences based on unique characteristics and needs, segmenting for conversion-focused emails and optimizing for better conversions.",
            "Mindstory's specialized team ensures efficiency and effectiveness in every element of your email campaign, maximizing the potential of this powerful marketing channel."
          ]
        },
        lists:[
          {
              icon: "bi bi-envelope",
              title: "Mail Designing",
              description: "Craft visually compelling emails with Mindstory's Mail Designing expertise. Aligning your branding seamlessly, we infuse valuable and insightful content, ensuring a clean, professional, and informative layout. Leveraging white space and attention-grabbing images, our designs are not just emails; they are responsive, engaging experiences."
          },
          {
              icon: "bi bi-star",
              title: "Personalize",
              description:"Connect on a personal level with Mindstory's email personalization. We address subscribers by their individual identities and needs, tailoring subject lines, content, and design. Our personalized approach creates a unified profile, ensuring emails are not just sent but resonate personally and remain relevant."
          },
          {
              icon: "bi bi-journals",
              title: "Relevance",
              description: "Maximize impact with ethically targeted emails. Mindstory ensures your emails reach the right audience by inviting website visitors to subscribe in exchange for valuable resources like newsletters, tips, eBooks, white papers, or checklists. We prioritize relevance, ensuring every communication adds value."
          },
          {
              icon: "bi bi-envelope",
              title: "Follow ups",
              description: "Nurture leads seamlessly with Mindstory's strategic follow-up emails. From reminding subscribers of pending purchases to sending discount coupons, our email workflows are designed with triggers, guiding subscribers through the conversion journey."
          },
          {
              icon: "bi bi-people",
              title: "Conversation",
              description: "Foster genuine engagement with Mindstory's conversational approach to emails. Our friendly and approachable content builds relationships rather than bombarding with marketing messages. Emails are strategically sent based on every customer interaction across online and offline channels, creating meaningful connections."
          },
          {
              icon: "bi bi-graph-up-arrow",
              title: "Tracking the success",
              description: "Ensure the success of your email campaigns with Mindstory's continuous tracking and improvement. Our in-depth analytics delve into metrics like open rates, click-through rates, bounce rates, unsubscribes, conversion rates, and more. Aligning these metrics with your email marketing goals, we refine strategies for optimal performance."
          }
        ],
        
        iconCards: [
          {
              icon: "bi bi-recycle",
              title: "30",
              description: "Active Email Campaigns"
          },
          {
              icon: "bi bi-box",
              title: "99",
              description: "Email Template Design"
          },
          { 
              icon: "bi bi-person",
              title: "18",
              description: "Email Marketing Clients"
          },
          {
              icon: "bi bi-brightness-high",
              title: "14",
              description: "Tracking & Reporting Parameters"
          }
        ]
      }
    ])

    // Brand Section
    await Service.create([
      {
        slug:'brand-identity',
        title:"Unlocking Imagination through Visuals",
        description:"At Mindstory, we believe that creativity knows no bounds. Our Creative Graphic Design services are meticulously crafted to breathe life into your ideas, transforming them into captivating visuals that leave a lasting impression. Whether you're looking to revamp your brand identity, create stunning marketing materials, or craft engaging digital content, our team of talented designers is here to bring your vision to fruition.",
        image:"/images/service/brand.webp",
        order: 5,
        heading: {
          title:"Our Approach",
          description:"We understand that every project is unique, and we tailor our approach to suit your specific needs and goals. Through collaborative brainstorming sessions, we delve deep into your brand ethos, audience preferences, and market trends to develop concepts that resonate with your target demographic. From initial sketches to final execution, we keep you involved every step of the way, ensuring that the end result exceeds your expectations."
        },
        sections:  [
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

      }
    ])

    // Web Development Section
    await Service.create([
    {
        slug:'web-development',
        title:"WEB DEVELOPMENT",
        description:'Collaborate with our team for outstanding, high-performing, and secure custom websites. Mindstory works closely with enterprises to bring digital visions to life.',
        image: '/images/web.webp',
        order: 6,
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

