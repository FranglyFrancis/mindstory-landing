import "../App.css";
import social from '../assets/social.webp'
import seo from '../assets/seo.webp'
import ad from '../assets/ad.webp'
import web from '../assets/web.webp'


function Expertise(){
    
    return(
        <section className="expertise" id="services">

            <div className="expertise-container">

                <div className="expertise-heading">

                    <h2>
                        Our Expertise in Digital Marketing
                        that drives growth
                    </h2>
                    <p>At Mindstory, a top digital marketing agency in Kerala, we know how to use every type of digital marketing to boost your brand’s online presence.</p>
                </div>

                <div class="card-row">
                    <div class="card"><img src={social} alt="" className="card-img"/><h3>Social Media Marketing</h3></div>
                    <div class="card"><img src={seo} alt="" className="card-img"/><h3>Search Engine Optimization</h3></div>
                    <div class="card"><img src={ad} alt="" className="card-img"/><h3>Digital Advertising</h3></div>
                    <div class="card"><img src={web} alt="" className="card-img"/><h3>Web Development</h3></div>
                </div>

            </div>

        </section>
    )
}

export default Expertise

