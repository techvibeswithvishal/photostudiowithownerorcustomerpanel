import React from "react";

const Portfolio = () => {
  const photos = [
    "/assets/gallery/photo1.jpg",
    "/assets/gallery/photo2.jpg",
    "/assets/gallery/photo3.jpg",
  ];

  return (
    <section id="portfolio" style={{ padding: "4rem", backgroundColor: "#fff" }}>
      <h2>Portfolio</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {photos.map((src, index) => (
          <img key={index} src={src} alt={`Portfolio ${index + 1}`} style={{ width: "200px", height: "150px", objectFit: "cover" }} />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
