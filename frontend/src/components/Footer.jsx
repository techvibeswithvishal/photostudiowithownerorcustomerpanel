import React from "react";

const Footer = () => {
  return (
    <footer style={{ padding: "2rem", textAlign: "center", backgroundColor: "#333", color: "#fff" }}>
      <p>&copy; {new Date().getFullYear()} Photo Studio. All rights reserved.</p>
      <p>
        Follow us: 
        <a href="#" style={{ color: "#fff", marginLeft: "0.5rem" }}>Instagram</a> | 
        <a href="#" style={{ color: "#fff", marginLeft: "0.5rem" }}>Facebook</a>
      </p>
    </footer>
  );
};

export default Footer;

