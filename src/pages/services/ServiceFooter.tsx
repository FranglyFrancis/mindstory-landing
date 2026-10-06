import 'bootstrap-icons/font/bootstrap-icons.css';
import './ServiceFooter.css';

function ServicesFooter(){
    return(
        <>
        <section>
            <h1 className="centered-section footer-title">Generating Outcomes through Expertise and Strategy</h1>
            <p className="centered-desc footer-desc">At Mindstory, we blend strategy and expertise to deliver tangible outcomes. Our professionals excel in on-page and off-page SEO, ensuring your website rises to the top of search engine rankings.</p>
            <div className="services-grid">
                    {/* 1st column */}
                <div className="service-column">
                   <div className="service-icon-box" style={{background:'#c77fe9'}} >
                        <i className="bi bi-brightness-high"></i>
                    </div>
                        <div className="service-content">
                            <h3>Call To Action</h3>
                            <p>Drive results with Mindstory's call to action. We draw potential customers from social media to your websites, converting engagement into meaningful interactions and measurable outcomes.</p>
                        </div>
                </div>
                <div className="service-column">
                    <div className="service-icon-box" style={{background:'#faba60'}}>
                        <i className="bi bi-chat-left"></i>
                    </div>
                    <div className='service-content'>
                        <h3>Engage</h3>
                        <p>Unlock engagement with Mindstory's captivating content. We go beyond creating content; we craft narratives that create value and generate impressive ROI for our clients.</p>
                    </div>
                </div>
                <div className="service-column">
                    <div className="service-icon-box" style={{background:'#64d1a7'}} >
                        <i className="bi bi-heart"></i>
                    </div>
                    <div className='service-content'>
                        <h3>Inspire</h3>
                        <p>Inspire brand recognition with Mindstory. We ensure customers not only notice you but also gain new insights about your brand, creating lasting impressions in the digital landscape.</p>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default ServicesFooter