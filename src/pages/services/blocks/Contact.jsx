import TestimonialCard from '../../../components/shared/TestimonialCard';
import './Contact.css'
export default function Contact(){

    return(
          <section className="section-division contact-section">
            <div className='centered-section'>
                <h6 className='subtitle1'>GROW TRAFFIC & INCREASE REVENUE</h6>
                <h2>Tell us about your project</h2>
                <h6 className='subtitle2'>Let us help you get your business online and grow it with passion</h6>
            </div>
            
            <div className="contact-division">
                <div className="contact-testimonials">
                    <p>Our team of professional SEO experts is the perfect partner for a successful business partnership.</p>
                    <h3>Testimonials</h3>

                    <TestimonialCard name={'Pooja ES'} text="Excellent services offered by an extremely talented and enthusiastic team of youngsters. The team offers amazing ideas to capture the essesnce of the business and share it with the online world" />
                
                </div>
                <div className="contact-form">
                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInputEmail1">Name *</label>
                            <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="Name" required/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInputEmail1">Company *</label>
                            <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="Company" required/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInputEmail1">Mobile Number *</label>
                            <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="MobileNo" required/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInputEmail1">Email *</label>
                            <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="email" required/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInputPassword1">What Services are you interested in? *</label>
                            <select className="form-control form-control-lg">
                                <option value='selected'>Digital Marketing</option>
                                <option>SEO</option>
                                <option>Website Development</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleFormControlTextarea1">We’d Love to Hear About Your Requirement!</label>
                            <textarea className="form-control form-control-lg" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2 mb-3">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}