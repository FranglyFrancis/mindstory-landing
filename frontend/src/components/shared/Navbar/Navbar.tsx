import './Navbar.css';
import { SERVICE_PATH, useServices } from "../../../hooks/useServices";
import { SERVICE_CATEGORIES } from "../../../utils/serviceCategories";
import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "/images/logo.avif";


function Navbar() {

  const { services } = useServices();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav>

      <div className="navbar navbar-container fixed-top navbar-light bg-light">
        <div className="container-fluid navbar-fluid">

          {/* Logo */}
          <a href="/" className="logo-wrapper">
            <img
              src={logo}
              alt="Mindstory"
              className="navbar-logo"
            />
          </a>


          {/* Desktop Navigation */}
          <div className="nav-right ">

            {/* About section */}
            <div className="nav-dropdown">
              <Link to="/about" className="navbar-brand">ABOUT</Link>

              <div className="my-dropdown-menu-2col">
                <div className="dropdown-column">
                    <h4>WHO WE ARE</h4>
                    <h6>Digital Craftsman</h6>
                      <Link to="/about"><i className="bi bi-briefcase-fill"></i> About Us</Link>
                      <a href="#our-approach"><i className="bi bi-compass-fill"></i> Our Approach</a>
                      <a href="#pricing-options"><i className="bi bi-piggy-bank-fill"></i> Pricing Options</a>
                </div>
                <div className="dropdown-column">
                      <h4>EXPERIENCE</h4>
                      <h6>Proven Expertise</h6>
                        <a href="#our-clients"><i className="bi bi-people-fill"></i> Our Clients</a>
                        <a href="#success-stories"><i className="bi bi-journals"></i> Success Stories</a>
                        <a href="#client-feedback"><i className="bi bi-chat-right-text-fill"></i> Client Feedback</a>
                </div>
              </div>
            </div>
            
            {/* Services Section */}
            <div className="nav-dropdown">
              <Link to="/services" className='navbar-brand'>SERVICES</Link>
               <div className="my-dropdown-menu-3col">
                {SERVICE_CATEGORIES.map((cat) => (
                  <div className="dropdown-column" key={cat.key}>
                    <h4>{cat.title}</h4>
                    <h6>{cat.tagline}</h6>
                    {services
                      .filter((s) => s.category === cat.key)
                      .map((s) => (
                        <Link key={s.slug} to={`${SERVICE_PATH}/${s.slug}`}>
                          <i className={`bi ${cat.icon}`}></i> {s.title}
                        </Link>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Works section */}
            <div className="nav-dropdown">
              <a className="navbar-brand" href="#works">
                WORKS
              </a>
              <div className="my-dropdown-menu-1col">
                <div className="dropdown-column">
                  <h4>EXPLORING EXCELLENCE</h4>
                  <h6>Success. Innovation. Impact.</h6>
                  <a href="#web-portfolio"><i className="bi bi-globe"></i> Web Portfolio</a>
                </div>
              </div>
            </div>
            

            {/* Learn section */}
             <div className="nav-dropdown">
              <a className="navbar-brand" href="#learn">
                LEARN
              </a>
              <div className="my-dropdown-menu-1col">
                <div className="dropdown-column">
                  <h4>EXPLORE</h4>
                  <a href="#our-blogs"><i className="bi bi-chat-right-text"></i> Our Blogs</a>
                </div>
              </div>
            </div>
            

            {/* Careers section */}
            <a className="navbar-brand" href="#careers">
              CAREERS
            </a>

            {/* Contact's section */}
            <div className="nav-dropdown">
              <a className="navbar-brand" href="#contact">
                CONTACT
              </a>
              <div className="my-dropdown-menu-1col">
                <div className="dropdown-column">
                  <h4>CONTACT US</h4>
                  <a href="#get-in-touch"><i className="bi bi-telephone"></i> Get in touch</a>
                  <h6>Free Quote</h6>
                  <a href="#request-a-free-quote"><i className="bi bi-search"></i> Request a free quote</a>
                </div>
              </div>
            </div>
            
            <a href="#contact" className="nav-button">
              GET A PROPOSAL
            </a>
          </div>


          {/* Hamburger Button */}
          <button
            className="menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>

        </div>


        {/* Mobile Navigation */}
          <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
             <button
              className="close-menu"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <i className="bi bi-x-lg"></i>
            </button>

              <a href="/about" onClick={() => setMobileMenuOpen(false)}>
                About
              </a>

              <a href="/services" onClick={() => setMobileMenuOpen(false)}>
                Services
              </a>

              <a href="/works" onClick={() => setMobileMenuOpen(false)}>
                Works
              </a>

              <a href="/learn" onClick={() => setMobileMenuOpen(false)}>
                Learn
              </a>

              <a href="/careers" onClick={() => setMobileMenuOpen(false)}>
                Careers
              </a>

              <a href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
          </div>
      </div>
    </nav>
  );
}

export default Navbar;