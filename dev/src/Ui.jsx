import React from "react";
import image from "./assets/images/ui.png";

const Ui = () => {
  return (
    <>
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src={image}
          alt=""
          style={{ width: "100%", height: "500px", objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "50px",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "54px",
              marginBottom: "10px",
              fontFamily: "Segoe UI, Arial, sans-serif",
              fontWeight: "300",
              letterSpacing: "1px",
            }}
          >
            Your digital success starts here
          </h1>

          <p
            style={{
              fontSize: "20px",
              maxWidth: "650px",
              fontFamily: "Segoe UI, Arial, sans-serif",
              fontWeight: "300",
              lineHeight: "28px",
              letterSpacing: "0.5px",
            }}
          >
            We help businesses accelerate online growth through professional
            website development, SEO, and comprehensive digital marketing
            solutions.
          </p>
          <button
            style={{
              position: "relative",
              marginTop: "10px",
              fontSize: "18px",
              padding: "8px 20px",
              background: "transparent",
              border: "2px solid white",
              borderRadius: "30px",
              fontFamily: "Segoe UI, Arial, sans-serif",
              fontWeight: "400",
              letterSpacing: "0.5px",
              color: "white",
              cursor: "pointer",
              display: "inline-block",
              width: "auto",
              alignSelf: "flex-start"
            }}
          >
            Get Started
          </button>

        </div>
      </div>
    </>
  );
};

export default Ui;
