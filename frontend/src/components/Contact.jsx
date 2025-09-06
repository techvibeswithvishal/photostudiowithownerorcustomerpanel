import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save to Firebase Firestore
    console.log("Contact submitted:", { name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" style={{ padding: "4rem", backgroundColor: "#f9f9f9" }}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={{ marginBottom: "1rem", padding: "0.5rem" }} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ marginBottom: "1rem", padding: "0.5rem" }} 
        />
        <textarea 
          placeholder="Message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          style={{ marginBottom: "1rem", padding: "0.5rem" }} 
        />
        <button type="submit" style={{ padding: "0.5rem", backgroundColor: "#333", color: "#fff", cursor: "pointer" }}>
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
