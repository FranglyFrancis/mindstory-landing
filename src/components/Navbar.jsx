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

            <a className="navbar-brand" href="#about">
              ABOUT
            </a>

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