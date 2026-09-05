import { useState } from "react";
import "../App.css";
import logo from "../assets/logo.avif"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
    
            {/* Right side ---Desktop view*/}
            <div className="nav-right ms-auto d-flex align-items-center gap-4">

              <a className="navbar-brand" href="#about">ABOUT</a>
              <a className="navbar-brand" href="#services">SERVICES</a>
              <a className="navbar-brand" href="#works">WORKS</a>
              <a className="navbar-brand" href="#learn">LEARN</a>
              <a className="navbar-brand" href="#careers">CAREERS</a>
              <a className="navbar-brand" href="#contact">CONTACT</a>

              {/* Button */}
              <a href="#contact" className="nav-button">
                Get Proposal
              </a>
            </div>
          </div>
        </div>
        {/* Menu humburger */}
        <button
          className = "menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        > ☰
        </button>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#about">ABOUT</a>
            <a href="#services">SERVICES</a>
            <a href="#services">WORKS</a>
            <a href="#services">LEARN</a>
            <a href="#services">CAREERS</a>

              <a className="navbar-brand" href="#works">WORKS</a>
              <a className="navbar-brand" href="#learn">LEARN</a>
              <a className="navbar-brand" href="#careers">CAREERS</a>
              <a className="navbar-brand" href="#contact">CONTACT</a>
            </div>
        )}
      </nav>
  );
}

export default Navbar;