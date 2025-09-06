import React from "react";

const Services = () => {
  const services = [
    { name: "Wedding Photography", price: "$500" },
    { name: "Birthday Photography", price: "$200" },
    { name: "Corporate Events", price: "$400" },
  ];

  return (
    <section id="services" style={{ padding: "4rem", backgroundColor: "#f9f9f9" }}>
      <h2>Our Services</h2>
      <ul>
        {services.map((service, index) => (
          <li key={index} style={{ marginBottom: "1rem" }}>
            {service.name} - {service.price}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Services;
