import React from "react";
import "../styles/Portfolio.css";

const Portfolio = () => {
  const photos = [
    { src: "/assets/gallery/wedding1.jpg", category: "Wedding" },
    { src: "/assets/gallery/wedding2.jpg", category: "Wedding" },
    { src: "/assets/gallery/student1.jpg", category: "Student ID" },
    { src: "/assets/gallery/student2.jpg", category: "Student ID" },
    { src: "/assets/gallery/function1.jpg", category: "Functions" },
    { src: "/assets/gallery/function2.jpg", category: "Functions" },
  ];

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <h2 className="section-title">Our Portfolio</h2>
        <p className="portfolio-intro">
          A glimpse of our best works – from weddings and student ID cards to
          grand events and special functions.
        </p>
        <div className="portfolio-grid">
          {photos.map((photo, index) => (
            <div key={index} className="portfolio-item">
              <img src={photo.src} alt={photo.category} />
              <span className="portfolio-category">{photo.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
