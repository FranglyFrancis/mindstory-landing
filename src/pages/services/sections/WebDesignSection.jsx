import IconList from '../blocks/IconList.tsx';
import { services } from '../../../data/services/WebDesignSection';
import './WebDesignSection.css';
import imgLeftt from '../../../assets/service/web1.webp';
import imgRight from '../../../assets/service/web2.webp';

export default function WebDesignSection(){
    
    return(
        <section className='section-division'>
            <div className="web-division">
                    <div  className='web-left'>
                        <h2>Top Web Design Company in Thrissur</h2>
                        <p className='justified-text'>As a premier web designing company in Thrissur, we understand the unique digital landscape and create bespoke designs that resonate with both local and global audiences. Our approach blends modern aesthetics with the latest trends, ensuring your website not only looks exceptional but also performs at its best. At Mindstory, we go beyond basic design to develop intuitive, responsive, and result-oriented websites that set your brand apart.
                        </p>
                    </div>
                    <div className='web-right'>
                        <p>Our team of experienced professionals is dedicated to providing personalized solutions that align with your business goals, ensuring your website not only attracts organic traffic but also converts visitors into loyal customers. <br /> <br /> Let's embark on this digital journey together and create a website that truly represents your brand and drives your business forward. For a website that combines beautiful design with seamless functionality, look no further than Mindstory. Contact us today to discuss your web development needs and discover how we can help you achieve digital excellence. </p>
                    </div>
            </div>
            <div className='list-item'>
                {services.map((list)=>(
                    <IconList key={list.id} title={list.title} icon={list.icon} description={list.description} />
                ))}
            </div>
            <div className="web-division">
                <div className='image-wrapper'>
                <img src={imgLeftt} className='left-image' alt="resposive web" />

                </div>
                <div>
                    <h2>Cross-platform and responsive web development</h2>
                    <p className='justified-text'>We provide rigorous testing for all major device types as well as browsers and operating systems before we launch your new website and sign-off the project. Testing is performed both as a user and as an administrator to ensure your site is modern and responsive.</p>
                </div>
            </div>
            <div className="web-division">
                <div>
                    <h2>Secured testing environment for your web project</h2>
                    <p className='justified-text'>
                        We use complex content gathering tools that allow visualizing content in terms of site architecture, to which we’ll make changes within your team before it goes live. Also, you have access to a secured staging or testing environment of your site which is hosted on our servers during the process of your creation.
                    </p>
                </div>
                <div className="image-wrapper">
                    <img src={imgRight} className='right-image' alt="secured testing" />
                </div>
            </div>
        </section>
    )
}