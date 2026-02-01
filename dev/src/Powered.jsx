import React from "react";
import ContactUs from "./ContactUs";

const Powered = () => {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        color: "#fff",
        padding: "50px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "space-between",
        }}
      >
        {/* Contact Us */}
        <div style={{ flex: "1 1 250px", minWidth: "200px" }}>
          <h5 style={{ marginBottom: "12px", fontSize: "16px" }}>Contact Us</h5>
          <ContactUs />
        </div>

        {/* Recent Projects */}
        <div style={{ flex: "1 1 250px", minWidth: "200px" }}>
          <h5 style={{ marginBottom: "12px", fontSize: "16px" }}>Recent Projects</h5>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>Project A</li>
            <li>Project B</li>
            <li>Project C</li>
          </ul>
        </div>

        {/* More About Us */}
        <div style={{ flex: "1 1 200px", minWidth: "200px" }}>
          <h5 style={{ marginBottom: "12px", fontSize: "16px" }}>More About Us</h5>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>Our Story</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Social */}
        <div style={{ flex: "1 1 150px", minWidth: "150px" }}>
          <h5 style={{ marginBottom: "12px", fontSize: "16px" }}>Social</h5>
          <div style={{ display: "flex", gap: "10px" }}>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>FB</a>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>TW</a>
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>IN</a>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "40px", fontSize: "14px", color: "#aaa" }}>
        © 2026 Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Powered;
