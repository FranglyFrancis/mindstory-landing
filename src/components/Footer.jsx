import '../App.css'
import logo from "../assets/logo.avif"

function Footer(){
    return(
        <>
        <section className='footer-section'>
            <div className="footer">
                <div>
                    <h3>Services</h3>
                    <small>Digital Marketing <br />

                    Social Media Management <br />

                    Website Development <br />

                    Logo & Branding <br />

                    Creative Design <br />

                    SEO <br />
                    </small>
                </div>
                <div>
                <p className='justified-text'>Mindstory – A trusted digital marketing agency Kerala with 10+ years of expertise, delivering creative strategies, measurable results, and lasting brand growth for businesses across industries. Your success story starts here.</p>
                </div>
                <div className='footer-column'>
                    <address className='footer-address'>
                        <div className="address-contact">
                            {/* <a href="tel:+918281001410 ">+91-8281001410</a>
                            <a href="mailto:hello@mindstory.in">hello@mindstory.in</a> */}
                            <p>+91-8281001410</p>
                            <p>hello@mindstory.in</p>
                            <p>Working Hours - MON–FRI | 10AM to 6PM</p>
                        </div>
                    </address>
                </div>
                <div className="footer-bottom">
                <p className="copyright-text">&copy; 2026 Mindstory. All rights reserved.</p>
                </div>
                <div className="footer-bottom">
                    <a href="/" className="logo-wrapper">
                                  <img
                                    src={logo}
                                    alt="Mindstory"
                                    className="navbar-logo"
                                  />
                                </a>
                </div>
                <div className="footer-legal-links footer-bottom">
                    <a href="/privacy-policy">Privacy Policy | Terms & Conditions</a>
                </div>
                </div>
        </section>
        </>
    )
}

export default Footer