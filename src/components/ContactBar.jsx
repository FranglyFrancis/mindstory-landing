import React from "react";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ContactBar = () => {
  return (
    <div className="sticky-contact-bar">
        
        {/* enquire */}
        <a href="#enquire" className="enquire-btn">
            Enquire
        </a>

        {/* Bottom contact buttons */}
        <div className="contact-buttons">

            <a href="tel:918281001410" className="contact-btn call-btn">
            <i className="bi bi-telephone-fill"></i>
            </a>

            <a
            href="https://wa.me/918281001410"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn whatsapp-btn"
            >
            <i className="bi bi-whatsapp"></i>
            </a>
        </div>
    </div>
  );
};

export default ContactBar;