import React from "react";
import { FaSquareInstagram, FaYoutube } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import image from "./assets/images/logo3.png"
 
const Powered = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(90deg, #0f0c14, #15111a)",
        color: "#fff",
        padding: "60px 80px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <img src={image} alt="" style={{width:"20%", height:"80px", position:"relative",bottom:"60px"}}/>
         <div>
          <h1
            style={{
              fontSize: "56px",
              color: "#f4b400",
              marginBottom: "20px",
            }}
          >
            Let’s talk
          </h1>

          <div style={{ display: "flex", gap: "12px" }}>
            <span style={iconStyle}><FaLinkedinIn /></span>
            <span style={iconStyle}><FaSquareInstagram /></span>
            <span style={iconStyle}><FaYoutube /></span>
          </div>
        </div>

         <div style={{ textAlign: "right", fontSize: "14px", color: "#ccc" }}>
          <h1 style={{ margin: "6px 0" }}>
            Our info
          </h1>

          <p style={{ margin: "6px 0" }}>
            digifywebandmedia@gmail.com
          </p>

          <p style={{ margin: "6px 0" }}>
            +19 798-997-2526
          </p>

          <div style={{ marginTop: "15px", fontSize: "12px" }}>
            <span style={{ marginRight: "10px", cursor: "pointer" }}>
              Privacy Policy
            </span>
            |
            <span style={{ marginLeft: "10px", cursor: "pointer" }}>
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
};

const iconStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  background: "#1f1b29",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export default Powered;
