import { useState, useEffect } from "react";
import SchoolLogin from "./SchoolLogin";
import "../styles/Navbar.css";
import OwnerModal from "./OwnerModal";


function Navbar() {
  const [theme, setTheme] = useState("light");
  const [showOwnerLogin, setShowOwnerLogin] = useState(false); // 👈 new state

  // Apply theme to <body>
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="navbar">
      {/* Logo (clickable for owner login) */}
      <h1 
        className="logo" 
        onClick={() => setShowOwnerLogin(true)} // 👈 open owner login
        style={{ cursor: "pointer" }}
      >
      FrameZone
      </h1>

      <nav className="nav-links">
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === "light" ? "🌙 dark" : "☀ light"}
            </button>
          </li>
        </ul>
      </nav>

      {/* School Panel Login (UNCHANGED) */}
      <div className="right-section">
        <SchoolLogin />
      </div>

      {/* Owner Login Popup */}
      {showOwnerLogin && (
  <OwnerModal onClose={() => setShowOwnerLogin(false)} />
)}


    </div>
  );
}

export default Navbar;
