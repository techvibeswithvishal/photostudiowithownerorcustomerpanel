import React from "react";
import "../styles/Services.css";

const Services = () => {
  const services = [
    {
      name: "Wedding Photography",
      description: "Elegant and timeless coverage of your special day.",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
      price: "$500",
    },
    {
      name: "Birthday Celebrations",
      description: "Fun-filled shoots that capture every joyful moment.",
      image:
        "https://images.unsplash.com/photo-1464349153735-7db50ed83c84",
      price: "$200",
    },
    {
      name: "Corporate Events",
      description: "Professional event coverage and branding shoots.",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865",
      price: "$400",
    },
    {
      name: "Portrait Sessions",
      description: "Individual, couple and family portraits.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      price: "$150",
    },
    {
      name: "Creative Shoots",
      description: "Unique artistic concepts tailored to your personality.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      price: "Custom",
    },
    {
      name: "Photo Editing & Retouching",
      description: "High-quality editing and retouching services.",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      price: "Custom",
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <img
                src={service.image}
                alt={service.name}
                className="service-image"
              />

              <div className="service-content">
                <h3>{service.name}</h3>
                <p>{service.description}</p>

                <div className="service-footer">
                  <span className="service-price">
                    {service.price}
                  </span>

                  <button
  className="book-btn"
  onClick={() => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
>
  Book Now
</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;