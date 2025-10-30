import React from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa"; // real icons
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="brand"></span>. All rights
          reserved.
        </p>

        <p className="designer">
          Website designed by{" "}
          <a
            href="https://www.linkedin.com/in/techvibeswithvishal/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaLinkedin style={{ marginRight: "6px" }} />
            Vishal Singh (@techvibeswithvishal)
          </a>{" "}
          ||{" "}
          <a
            href="mailto:4848vishalsingh@gmail.com"
            className="footer-link"
          >
            <FaEnvelope style={{ marginRight: "6px" }} />
            4848vishalsingh@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
