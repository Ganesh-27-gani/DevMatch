import React from "react";
import ContactUs from "./ContactUs";

const Powered = () => {
  return (
    <footer
      style={{
        background:"#15111aec",
        color: "#fff",
        padding: "45px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{display: "flex", flexWrap: "wrap",justifyContent: "flex-start",  }}>
        <div className="me-5"style={{flex: "1 1 900px", maxWidth: "1000px",  position: "relative", right: "150px" }}>
          <h5 style={{marginBottom: "20px",fontSize: "20px",fontWeight: "600",textAlign: "center",color: "#fff" }} >
            Contact Us
          </h5>

          <ContactUs />
        </div>
         <div style={{display:"flex",gap:"180px", position:"relative",right:"27%"}}>
          <div>
            <h5>Recent Project</h5>
            <ul>
            
            </ul>
          </div>
          <div>
            <h5>About US</h5>
            <ul>
            
            </ul>
          </div>
          <div>
            <h5>Social Media</h5>
            <ul>
            
            </ul>
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
