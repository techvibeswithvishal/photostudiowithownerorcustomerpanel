import { useState, useEffect } from "react";
import SchoolLogin from "./SchoolLogin";
import "../styles/Navbar.css";

function Navbar() {
  const [theme, setTheme] = useState("light");

  // Apply theme to <body>
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <h1 className="logo">Yadav Photo Studio</h1>
      <nav className="nav-links">
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === "light" ? "🌙  dark" : "☀️ light"}
            </button>
          </li>
        </ul>
      </nav>

      {/* School Panel Login */}
      <div className="right-section">
        <SchoolLogin />
      </div>
     
    </div>
  );
}

export default Navbar;
