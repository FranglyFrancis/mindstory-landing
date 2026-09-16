import { useState } from "react";

import "../App.css";
import logo from "../assets/logo.avif";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Link } from "react-router-dom";

function Navbar() {

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
              {/* <a className="navbar-brand" href="#about">
                ABOUT
              </a> */}
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
               <a className="navbar-brand" href="#services">
                  SERVICES
               </a>
               <div className="my-dropdown-menu-3col">
                  <div className="dropdown-column">
                    <h4>WEB DEVELOPMENT</h4>
                    <h6>Innovative Solutions, Cutting-Edge Tech</h6>
                    <a href="#web-design"><i className="bi bi-globe2"></i> Web Design</a>
                    <a href="#e-commerce"><i className="bi bi-cart-fill"></i> E-Commerce</a>
                  </div>
                  <div className="dropdown-column">
                    <h4>ONLINE MARKETING</h4>
                    <h6>Strategies That Drive Results</h6>
                    <a href="#digital-marketing"><i className="bi bi-megaphone-fill"></i> Digital Marketing</a>
                    <a href="#performance-marketing"><i className="bi bi-bullseye"></i> Performance Marketing</a>
                    <a href="#seo"><i className="bi bi-graph-up-arrow"></i> Search Engine Optimization</a>
                    <a href="#emaill-marketing"><i className="bi bi-chat-right-text-fill"></i> Email Marketing</a>
                    <a href="#social-media-marketing"><i className="bi bi-envelope-paper-fill"></i> Social Media Marketing</a>
                    <a href="#visual-production"><i className="bi bi-youtube"></i> Visual Production</a>
                  </div>
                  <div className="dropdown-column">
                    <h4>BRAND IDENTITY</h4>
                    <h6>Crafting Unique, Memorable Brands</h6>
                    <a href="#logo"><i className="bi bi-laptop"></i> Logo & Identity</a>
                    <a href="#creative-design"><i className="bi bi-lightbulb-fill"></i> Creative Design</a>
                    <a href="#art"><i className="bi bi-brush"></i> Art & Illustration</a>
                    <a href="#business"><i className="bi bi-briefcase"></i> Business Advertising</a>
                  </div>
                </div>
             </div>

            {/* Wroks section */}
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
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#about">ABOUT</a>
            <a href="#services">SERVICES</a>
            <a href="#works">WORKS</a>
            <a href="#learn">LEARN</a>
            <a href="#careers">CAREERS</a>
            <a href="#contact">CONTACT</a>
            <a href="#contact" className="nav-button">
              Get a Proposal
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;