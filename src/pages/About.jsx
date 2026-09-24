import './About.css';
import aboutHero from "../assets/about-mindstory.webp"

function About(){
    return(
        <>
            <section className="about-intro">
                <div>
                    <h1>Your Online Marketing Agency in Kerala</h1>
                    <p className='justified-text'>
                        Mindstory, your trusted partner in navigating the dynamic realm of digital marketing. As the best digital marketing agency in Thrissur and Kochi, we take pride in being your go-to team for all things digital. At Mindstory, we don't just provide services; we curate experiences, shaping your brand's digital journey with passion and expertise.
                    </p>
                </div>
                <div className='about-hero-image'>
                    <img src={aboutHero} alt="team meeting around a table" className='about-image-slide' />
                </div>
            </section>

            {/* about-intro-divider */}
            <div className="custom-shape-divider-top-1789556561">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>

            {/* Cards section */}
            <section className="about-goals">
                <div className="cards-container">
                    <div className="card1">
                        <h2><i className="bi bi-clock icons"></i></h2>
                        <h2>10</h2>
                        <p>Years</p>
                    </div>

                    <div className="card2">
                        <h2><i className="bi bi-bar-chart icons"></i></h2>
                        <h2>400+</h2>
                        <p>Clients</p>
                    </div>
                    <div className="card3">
                        <h2><i className="bi bi-envelope icons"></i></h2>
                        <h2>500+</h2>
                        <p>Million Reach</p>
                    </div>
                    <div className="card1">
                        <h2><i className="bi bi-link icons"></i></h2>
                        <h2>G</h2>
                        <p>Google Partner</p>
                    </div>
                    <div className="card2">
                        <h2><i className="bi bi-person icons"></i></h2>
                        <h2>30+</h2>
                        <p>Team Members</p>
                    </div>
                    <div className="card3">
                        <h2><i className="bi bi-brightness-high icons"></i></h2>
                        <h2>1500+</h2>
                        <p>Digital Campaigns</p>
                    </div>
                </div>
            </section>
            
            {/* about-us divider */}
            <div className="custom-shape-divider-bottom-1789558199">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
            
            <section className="about-us">
                <div className='about-us-3col'>
                    <div>
                        <h3>Who We Are: Your Digital Growth Partner</h3>
                        <p className='justified-text'>
                            In a fast-paced digital era, having a reliable partner is crucial for sustained growth. At Mindstory, we are more than just a digital marketing agency; we are your digital growth partner. Our dynamic team is driven by the vision of crafting digital experiences and elevating brand aesthetics. With a blend of creativity and technical prowess, we are committed to propelling your brand to new heights.
                        </p>
                    </div>
                    <div>
                        <h3>What We Do: Turning Ideas into Digital Realities</h3>
                        <p className='justified-text'>
                            At Mindstory, we understand the power of ideas. We specialize in turning these ideas into digital realities that resonate with your target audience. From web design to SEO, our services are meticulously crafted to amplify your brand's online presence. We embrace the latest trends and technologies, ensuring that your brand not only stands out but thrives in the competitive digital landscape.
                        </p>
                    </div>
                    <div>
                        <h3>Digital Excellence: Best Digital Marketing Agency in Thrissur and Kochi</h3>
                        <p className='justified-text'>
                            Mindstory stands out as the best digital marketing agency in both Thrissur and Kochi. Our commitment to excellence, coupled with a client-centric approach, sets us apart in the industry. As your digital growth partner, we tailor strategies that align with your business objectives, ensuring measurable and impactful results.
                        </p>
                    </div>
                </div>
                <div className="about-us-2col">
                    <div>
                        <h3>Why Choose Mindstory: Elevate Your Digital Presence</h3>
                        <p className='justified-text'>
                            Choosing Mindstory means choosing a team dedicated to your brand's success. We go beyond conventional service delivery, focusing on creating meaningful connections between your brand and your audience. Our goal is to not just meet expectations but to exceed them, making us the preferred digital marketing agency in Thrissur and Kochi.
                        </p>
                    </div>
                     <div>
                        <h3>Innovation, Strategy, Success</h3>
                        <p className='justified-text'>
                            Embark on a journey of innovation and strategy with Mindstory. As your digital growth partner, we bring together innovation and strategy to guarantee success. Your brand deserves the best, and at Mindstory, we are committed to delivering unparalleled digital experiences that leave a lasting impact.
                        </p>
                    </div>
                </div>
            </section>

            {/* mindified-top-divider*/}
            <div className="custom-shape-divider-bottom-1789626360">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>
                <p className="wave-text">
                    <span><i className="bi bi-briefcase wave-icon"></i> 400+ Clients Served</span>
                    <span><i className="bi bi-check-circle wave-icon"></i> 100+ Events Organized</span>
                    <span><i className="bi bi-mic wave-icon"></i> 10+ Movie Promotions</span>
                    <span><i className="bi bi-heart wave-icon"></i> Unlimited Coffee Cups</span>
                </p>
            </div>

            {/* mindified divider */}
            <div className="custom-shape-divider-top-1789626613">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                
                    </svg>
                <div  className='wave-text1 '>
                <p>
                    <span className='mindified'>
                        #Getmindified
                    </span>
                    <span className='mindified-desc'>
                        We propel clients toward success by ensuring their websites rank at the pinnacle of search engines, achieving their goals and objectives seamlessly.
                    </span>
                </p>
                </div>
            </div>
            

        <section className='milestones'>
            <h2>Our Milestones</h2>
            <p>Some remarkable events our digital marketing agency went through.</p>
             <div className="timeline">
                
                <div className="timeline-item">

                    <div className="timeline-year">
                    2016
                    </div>

                    <div className="timeline-content">

                        {/* <div className="timeline-line"></div> */}

                        <div className="timeline-icon">
                           <i class="bi bi-flag"></i>
                        </div>

                        <div className="timeline-card">

                            <p className="timeline-date">
                            January, 2016
                            </p>

                            <h3>Inception of Excellence</h3>

                            <p>
                            Mindstory embarked on its journey of digital excellence,
                            laying the foundation for a dynamic digital marketing agency.
                            </p>

                        </div>

                    </div>

                </div>


                <div className="timeline-item">
                    <div className="timeline-year">
                        2017
                    </div>

                        <div className="timeline-content">

                            <div className="timeline-line"></div>

                            <div className="timeline-icon">
                                <i class="bi bi-tablet"></i>
                            </div>

                            <div className="timeline-card">

                                <p className="timeline-date">
                                October, 2017
                                </p>

                                <h3>Cinematic Ventures Begin</h3>

                                <p>
                                Venturing into the world of digital movie promotion, Mindstory expanded its horizons to engage audiences through captivating visual narratives.
                                </p>
                            </div>
                        </div>
                </div>
                    
                {/* Joined card- 2017 */}
                <div className="timeline-item">
                    <div className="timeline-connect"></div>
                    <div className="timeline-contents">

                        <div className="timeline-line"></div>

                        <div className="timeline-icon">
                           <i class="bi bi-key"></i>
                        </div>

                        <div className="timeline-card">

                            <p className="timeline-date">
                            December, 2017
                            </p>

                            <h3>Pioneering Media Production</h3>

                            <p>
                                Recognizing the power of storytelling, Mindstory ventured into media production, creating compelling content that resonates with diverse audiences.
                            </p>
                        </div>
                    </div>
                </div>


                 <div className="timeline-item">

                    <div className="timeline-year">
                    2018
                    </div>

                    <div className="timeline-content">

                    <div className="timeline-line"></div>

                    <div className="timeline-icon">
                       <i class="bi bi-briefcase"></i>
                    </div>

                    <div className="timeline-card">

                        <p className="timeline-date">
                        February, 2018
                        </p>

                        <h3>Harmonious Expanion</h3>

                        <p>
                        The launch of Mindstory's own music production marked a harmonious milestone, adding a melodious dimension to our creative endeavors.
                        </p>

                    </div>

                    </div>

                </div>

                 <div className="timeline-item">

                    <div className="timeline-connect"></div>

                    <div className="timeline-contents">

                        <div className="timeline-line"></div>

                        <div className="timeline-icon">
                           <i class="bi bi-arrow-up-right"></i>
                        </div>

                        <div className="timeline-card">

                            <p className="timeline-date">
                            April, 2018
                            </p>

                            <h3>Global Operations Unleashed</h3>

                            <p>
                                Mindstory extended its operations to the GCC region, bringing our digital prowess to a global stage.
                            </p>

                        </div>

                    </div>

                </div>

                 <div className="timeline-item">

                    <div className="timeline-connect"></div>

                    <div className="timeline-content">

                    <div className="timeline-line"></div>

                    <div className="timeline-icon">
                        <i class="bi bi-cart"></i>
                    </div>

                    <div className="timeline-card">

                        <p className="timeline-date">
                            June, 2018
                        </p>

                        <h3>E-Commerce Eminence</h3>

                        <p>
                            A specialized e-commerce marketing wing was initiated, addressing the unique challenges and opportunities in the digital retail landscape.
                        </p>

                    </div>

                    </div>

                </div>

                 <div className="timeline-item">

                    <div className="timeline-year">
                    2019
                    </div>

                    <div className="timeline-content">

                    <div className="timeline-line"></div>

                    <div className="timeline-icon">
                        <i class="bi bi-google"></i>
                    </div>

                    <div className="timeline-card">

                        <p className="timeline-date">
                        May, 2019
                        </p>

                        <h3>Google Ads Dominance</h3>

                        <p>
                        Demonstrating commitment to digital advertising, Mindstory managed INR 10 Million exclusively for Google Ads for our clients.
                        </p>

                    </div>

                    </div>

                </div>

                <div className="timeline-item">

                    <div className="timeline-year">
                    2020
                    </div>

                    <div className="timeline-content">

                    <div className="timeline-line"></div>

                    <div className="timeline-icon">
                        <i class="bi bi-gear-wide-connected"></i>
                    </div>

                    <div className="timeline-card">

                        <p className="timeline-date">
                        August, 2020
                        </p>

                        <h3>Agile Workspces</h3>

                        <p>
                        Adapting to changing landscapes, Mindstory systematically transitioned to a work-from-home model, fostering agility and continuity.
                        </p>

                    </div>

                    </div>

                </div>

                <div className="timeline-item">

                    <div className="timeline-year">
                    2021
                    </div>

                    <div className="timeline-content">

                    <div className="timeline-line"></div>

                    <div className="timeline-icon">
                        <i class="bi bi-bar-chart"></i>
                    </div>

                    <div className="timeline-card">

                        <p className="timeline-date">
                        October, 2021
                        </p>

                        <h3>Financial Triumph</h3>

                        <p>
                            Successfully orchestrating the complete digital marketing for Indel Money Limited's public issue of NCDs.
                        </p>

                    </div>
                    </div>
                </div>
                  <div className="timeline-item">

                    <div className="timeline-year">
                    2023
                    </div>

                    <div className="timeline-content">

                    <div className="timeline-line"></div>

                    <div className="timeline-icon">
                       <i class="bi bi-graph-up-arrow"></i>
                    </div>

                    <div className="timeline-card">

                        <p className="timeline-date">
                        December,2023
                        </p>

                        <h3>Triple Triumph</h3>

                        <p>
                            Carrying the momentum forward, Mindstory orchestrated three impactful digital marketing campaigns for the public issuance of NCDs, solidifying its position as a trusted partner for financial institutions.
                        </p>

                    </div>
                    </div>
                </div>


            </div>
        </section>
           
        </>
    )
}

export default About