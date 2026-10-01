import IconList from '../blocks/IconList';
import { lists, titleLists } from '../../../data/services/LogoDesign'; 
import './LogoDesignSection.css'
import Brands from '../../../components/shared/Brands'
import { brands, brandArray} from '../../../data/home/Brands';
import logoImage from '../../../assets/service/email.webp';
import TitleList from '../blocks/TitleList';
import '../../services/blocks/TitleList.css';

export default function LogoDesignSection(){
    return(
        <>
        <section>
            <div className='section-division'>
                <div className='logo-section'>
                    <div>
                        <h2>Why Choose Mindstory for Your Logo & Branding Needs?</h2>
                        <div className='title-list'>
                            <h3>Tailored Design Solutions</h3>
                            <p>From simple and elegant logos to intricate design ideas, we tailor our solutions to meet the unique needs of your company, ensuring your logo resonates with your brand ethos.</p>
                        </div>
                    </div>
                    <img src={logoImage} className='logo-image' alt="Logo Avatar" />
                    {titleLists.map((list)=>(
                        <TitleList key={list.id} title={list.title} description={list.description} />
                    ))}
                </div>
            </div>
            <div className="list-grid section-division">
                {lists.map((list) => (
                    <IconList key={list.id} icon={list.icon} title={list.title} description={list.description} />
                ))}
            </div>
            <div className='section-division paragraph justified-text'>
                <p>
                    In conclusion, choosing Mindstory for your logo and branding needs means partnering with a digital marketing agency that truly understands the essence of your brand and the dynamics of the market in Kerala. Our bespoke logo designs are not just visually compelling but are strategically crafted to enhance your brand's identity and ensure it resonates with your target audience, whether they're in Kochi, Thrissur, or beyond. Our commitment to excellence, coupled with our deep understanding of the digital landscape, makes us the ideal choice for businesses looking to make a lasting impression. 
                </p> 
                <p>   
                    Furthermore, Mindstory goes beyond logo design to offer a comprehensive suite of digital marketing services designed to elevate your brand's online presence. From SEO and content marketing to social media management and digital advertising, we have the tools and expertise to drive your brand to the top of search engine rankings, ensuring maximum visibility and engagement. Our holistic approach to digital marketing ensures that your brand not only looks great but also ranks high in the digital space. 
                </p>
                <p>   
                    Join the multitude of satisfied clients across Kerala who have transformed their brand identity with Mindstory's innovative logo and branding solutions. Let us be the architects of your brand's success story, crafting a logo that is not only a visual masterpiece but also a strategic tool for growth and recognition in the digital age. Contact Mindstory today, and take the first step towards redefining your brand's identity and achieving unparalleled success in the digital marketplace.
                </p>
            </div>
            <div className='section-division'>
                <Brands title={""} description={""} brands={brands}  brandArray={brandArray} details={""} />
            </div>

        </section>
        </>

    )
}