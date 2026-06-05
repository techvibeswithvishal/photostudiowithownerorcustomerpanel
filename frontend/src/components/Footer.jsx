import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <h3 className="footer-brand">
          Vishal Singh
        </h3>

        

        <div className="footer-links">

          <a
            href="https://www.linkedin.com/in/techvibeswithvishal/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaLinkedin /> LinkedIn
          </a>

          <a
            href="https://github.com/techvibeswithvishal"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaGithub /> GitHub
          </a>

          

          <a
            href="https://vishalsingh.yokonix.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaGlobe /> Portfolio
          </a>

        </div>

        <p className="copyright">
  © 2025 Vishal Singh. All Rights Reserved.
</p>

      </div>
    </footer>
  );
};

export default Footer;