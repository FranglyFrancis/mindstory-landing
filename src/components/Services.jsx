import '../App.css'
import site from '../assets/SEO (1).png'
import art from '../assets/ART.png'
import boost from '../assets/SOCIAL (1).png'
import ad from '../assets/STRATEGY.png'
import web from '../assets/WEB (1).png'
import campaign from '../assets/EMAIL.png'

function Services(){

    return(
        <>
        <section className='centered-section'>
           <h4 className='centered-section'>Expand Traffic, Boost Revenue: Unleash Business Growth!</h4>
            <h2 className='centered-section'>All-In-One Digital Marketing Hub:Elevate Your Brand!</h2>
                <p className="justified-text centered-desc">Mindstory, the best digital marketing agency in Thrissur, Kerala is your go-to hub for all things digital. From SEO to custom website design, we offer a comprehensive suite of services to elevate your brand and drive business growth.</p>
            <div className="grid-container">
                <div className="grid-item">
                    <img src={site} alt="" className='grid-image'/>
                    <h4>RANKING YOUR SITE #1 ON GOOGLE</h4>
                    <p className="justified-text centered-desc">Master the strategies to dominate Google rankings with our specialized SEO techniques. We dive deep into search algorithms to elevate your site's visibility, driving organic traffic and leading your business to digital prominence.</p>
                </div>
                <div className="grid-item">
                    <img src={art} alt="" className='grid-image'/>
                    <h4>BRAND ENHANCEMENT WITH ART & ILLUSTRATION</h4>
                    <p className="justified-text centered-desc">Elevate your brand's appeal through our captivating art and illustration. Our creative flair ensures your brand makes an unforgettable impact, distinguishing itself in the competitive landscape.</p>
                </div>
                <div className="grid-item">
                    <img src={boost} alt="" className='grid-image'/>
                    <h4>SOCIAL MEDIA BRAND BOOST</h4>
                    <p className="justified-text centered-desc">Boost your brand's social media presence with our targeted strategies. We enhance engagement, increase visibility, and strengthen community ties, ensuring your brand's voice resonates across platforms</p>
                </div>
                <div className="grid-item">
                    <img src={ad} alt="" className='grid-image'/>
                    <h4>DIGITAL AD STRATEGY FOR IMPACT</h4>
                    <p className="justified-text centered-desc">Maximize your digital ad impact with our expert strategies. Our data-driven approach optimizes ad placements, ensuring your message reaches and engages your target audience effectively.</p>
                </div>
                <div className="grid-item">
                    <img src={web} alt="" className='grid-image'/>
                    <h4>CUSTOM WEB DESIGN THAT STANDS OUT</h4>
                    <p className="justified-text centered-desc">Craft a unique online identity with our custom web design. Our blend of creativity and functionality ensures your website captivates visitors and communicates your brand's essence clearly.</p>
                    </div>
                <div className="grid-item">
                    <img src={campaign} alt="" className='grid-image'/>
                    <h4>DRIVING ENGAGEMENT WITH EMAIL CAMPAIGNS</h4>
                    <p className="justified-text centered-desc">Elevate audience engagement with dynamic email campaigns. Our combination of compelling visuals and strategic messaging fosters meaningful interactions, keeping your audience connected and engaged with your brand.</p>
                </div>
            </div>
        </section>
        </>
    )
}

export default Services