import "../App.css";
import social from '../assets/social.webp'
import seo from '../assets/seo.webp'
import ad from '../assets/ad.webp'
import web from '../assets/web.webp'


function Expertise(){
    
    return(
        <section className="expertise pb-5 px-md-5" >
            <div className="expertise-container">
                <div className="expertise-heading">
                    <h2>
                        Our Expertise in Digital Marketing that drives growth
                    </h2>
                    <p>At Mindstory, a top digital marketing agency in Kerala, we know how to use every type of digital marketing to boost your brand’s online presence.</p>
                </div>

                <div className="card-row">
                    <div className="card-expertise"><img src={social} alt="" className="card-img"/><h4>Social Media Marketing</h4></div>
                    <div className="card-expertise"><img src={seo} alt="" className="card-img"/><h4>Search Engine Optimization</h4></div>
                    <div className="card-expertise"><img src={ad} alt="" className="card-img"/><h4>Digital Advertising</h4></div>
                    <div className="card-expertise"><img src={web} alt="" className="card-img"/><h4>Web Development</h4></div>
                </div>

            </div>

        </section>
    )
}

export default Expertise

