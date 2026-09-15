import { useState } from "react";

import "../App.css";
import logo from "../assets/logo.avif";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
            <div className="nav-dropdown">
              <a className="navbar-brand" href="#about">
                ABOUT
              </a>

              <div className="my-dropdown-menu">
                <div className="dropdown-column">
                    <h4>WHO WE ARE</h4>
                    <h6>Digital Craftsman</h6>
                      <a href="#about-us"><i className="bi bi-briefcase-fill"></i> About Us</a>
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
            

            <a className="navbar-brand" href="#services">
              SERVICES
            </a>

            <a className="navbar-brand" href="#works">
              WORKS
            </a>

            <a className="navbar-brand" href="#learn">
              LEARN
            </a>

            <a className="navbar-brand" href="#careers">
              CAREERS
            </a>

            <a className="navbar-brand" href="#contact">
              CONTACT
            </a>

            <a href="#contact" className="nav-button">
              Get Proposal
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
              Get Proposal
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;