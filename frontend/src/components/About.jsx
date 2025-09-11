import React from "react";
import "../styles/About.css";



const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Welcome to our Photo Studio! We specialize in capturing
              memorable moments with professional photography services.
            </p>
            <p>
              Our mission is to provide creative, high-quality, and
              timeless photographs that reflect the beauty of every
              occasion. From portraits to events, we ensure every detail
              is captured with perfection.
            </p>
          </div>
          <div className="about-image">
            {/* You can add an image here later */}
           <img src="/assets/gallery/sample.jpg" alt="About our studio" />


          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
