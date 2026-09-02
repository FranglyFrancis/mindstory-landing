import "../App.css";
import logo from "../assets/logo.avif"

function Navbar() {
  return (
  
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="logo-wrapper">
          <img
            src={logo}
            alt="Mindstory"
            className="navbar-logo"
          />
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#works">Works</a>
          <a href="#learn">Learn</a>
          <a href="#careers">Careers</a>
          <a href="#contact">Contact</a>
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;