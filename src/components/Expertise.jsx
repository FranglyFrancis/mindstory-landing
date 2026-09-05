import "../App.css";
import social from '../assets/social.webp'
import seo from '../assets/seo.webp'
import ad from '../assets/ad.webp'
import web from '../assets/web.webp'


function Expertise(){
    
    return( 
        <>
      <div className="custom-shape-divider-bottom-1788602044">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
    </svg>
        </div>
        <section className="expertise">
            <div className="expertise-container">
                <div className="expertise-heading">
                    <h2>
                        Our Expertise in Digital Marketing that drives growth
                    </h2>
                    <p>At Mindstory, a top digital marketing agency in Kerala, we know how to use every type of digital marketing to boost your brand’s online presence.</p>
                </div>

                <div className="card-row cards-view">
                    <div className="card-expertise "><img src={social} alt="" className="card-img"/><h4>Social Media Marketing</h4></div>
                    <div className="card-expertise"><img src={seo} alt="" className="card-img"/><h4>Search Engine Optimization</h4></div>
                    <div className="card-expertise"><img src={ad} alt="" className="card-img"/><h4>Digital Advertising</h4></div>
                    <div className="card-expertise"><img src={web} alt="" className="card-img"/><h4>Web Development</h4></div>
                </div>
            </div>
        </section>
        <div className="custom-shape-divider-top-1788603175">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
        </div>
    </>

    )
}

export default Expertise

