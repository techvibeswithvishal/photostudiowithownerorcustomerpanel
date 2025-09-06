import React from "react";
import "../styles/Services.css";

const Services = () => {
  const services = [
    { name: "Wedding Photography", description: "Elegant and timeless coverage of your special day.", price: "$500" },
    { name: "Birthday Celebrations", description: "Fun-filled shoots that capture every joyful moment.", price: "$200" },
    { name: "Corporate Events", description: "Professional documentation of conferences, seminars, and office events.", price: "$400" },
    { name: "Portrait Sessions", description: "Stylish individual, couple, or family portraits.", price: "$150" },
    { name: "Creative Shoots", description: "Unique, artistic concepts tailored to your personality.", price: "Custom" },
    { name: "Photo Editing & Retouching", description: "High-quality editing to make your photos truly shine.", price: "Custom" },
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3 className="service-name">{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <span className="service-price">{service.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
