import React from "react";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#333", color: "#fff" }}>
      <h1>Photo Studio</h1>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li><a href="#about" style={{ color: "#fff" }}>About</a></li>
        <li><a href="#services" style={{ color: "#fff" }}>Services</a></li>
        <li><a href="#portfolio" style={{ color: "#fff" }}>Portfolio</a></li>
        <li><a href="#contact" style={{ color: "#fff" }}>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
