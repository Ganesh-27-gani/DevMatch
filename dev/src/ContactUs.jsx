import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utils/config";

const ContactUs = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/contact/contactus`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Message sent successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "85vh",
        backgroundColor: "#0b0b0b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "40px",
          display: "flex",
          gap: "50px",
          width: "900px",
        }}
      >
         <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#111",
            padding: "25px",
            width: "320px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="What's your name?"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            style={{ ...inputStyle, resize: "none" }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#f4b400",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Send Message
          </button>
        </form>

         <div style={{ color: "#fff", maxWidth: "400px",  marginTop:"150px"}}>
          <p style={{ color: "#ccc", fontSize: "14px" }}>
            Have any queries?
          </p>

          <h1
            style={{
              color: "#f4b400",
              fontSize: "36px",
              margin: "10px 0",
            }}
          >
            CONTACT US
          </h1>

          <p style={{ color: "#aaa", fontSize: "14px", lineHeight: "1.6" }}>
           Contact us and tell us what you need. Our team will carefully understand your requirements and provide the right solution with continuous support.
          </p>
        </div>
      </div>
    </div>
  );
};

 const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  backgroundColor: "#1f1f1f",
  border: "none",
  color: "#fff",
  fontSize: "14px",
};

export default ContactUs;
