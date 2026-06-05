import React from "react";
import "../styles/Portfolio.css";

const Portfolio = () => {
  const photos = [
  {
    src: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg",
    category: "Wedding Photography",
  },
  {
    src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
    category: "Wedding Photography",
  },
  {
    src: "https://images.pexels.com/photos/1184572/pexels-photo-1184572.jpeg",
    category: "Student ID Cards",
  },
  {
    src: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
    category: "Student ID Cards",
  },
  {
    src: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
    category: "Functions & Events",
  },
  {
    src: "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg",
    category: "Functions & Events",
  },
];
  const handleBooking = (category) => {
    localStorage.setItem(
      "selectedService",
      `I am interested in ${category}`
    );

    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <h2 className="section-title">Our Portfolio</h2>

        <p className="portfolio-intro">
          A glimpse of our finest photography work,
          capturing weddings, student IDs, events,
          and unforgettable moments.
        </p>

        <div className="portfolio-grid">
          {photos.map((photo, index) => (
            <div
              className="portfolio-item"
              key={index}
            >
              <img
                src={photo.src}
                alt={photo.category}
              />

              <div className="portfolio-overlay">
                <h3>{photo.category}</h3>

                <button
                  className="portfolio-btn"
                  onClick={() =>
                    handleBooking(photo.category)
                  }
                >
                  Book Similar Shoot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;