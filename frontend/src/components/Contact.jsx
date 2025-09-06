import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save to Firebase Firestore or send via backend
    console.log("Contact submitted:", { name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <p className="contact-intro">
          Have a question or want to book a session? Fill out the form below
          and we’ll get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            required
          />
          <button type="submit" className="btn-submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
