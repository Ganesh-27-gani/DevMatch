import React from "react";
import { FaSquareInstagram, FaYoutube } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import logo from "./assets/images/logo3.png";
import { Link, useNavigate } from "react-router-dom";



const styles = {
  footer: {
    background: "linear-gradient(90deg, #0f0c14, #15111a)",
    color: "#fff",
    padding: "60px 40px 20px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "40px",
  },
  brand: {
    maxWidth: "240px",
  },
  logo: {
    width: "160px",

    marginBottom: "10px",
  },
  textMuted: {
    color: "#ccc",
    fontSize: "14px",
  },
  section: {
    fontSize: "14px",
    color: "#ccc",
  },
  title: {
    marginBottom: "10px",
    color: "#fff",
  },
  listItem: {
    margin: "6px 0",
    cursor: "pointer",
  },
  socialTitle: {
    fontSize: "48px",
    color: "#f4b400",
    marginBottom: "16px",
  },
  icons: {
    display: "flex",
    gap: "12px",
  },
  icon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#1f1b29",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  bottom: {
    marginTop: "30px",
    paddingTop: "12px",
    borderTop: "1px solid #434242",
    textAlign: "center",
    fontSize: "12px",
    color: "#ccc",
  },
};



const links = [
  { label: "Register", path: "/regester" },
  { label: "Our Services", path: "/services" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contactus" },
];


const Powered = () => {

  const navigate = useNavigate();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        <div style={styles.brand}>
          <img src={logo} alt="Digify Logo" style={styles.logo} />
          <p style={styles.textMuted}>
            Digify is a trusted digital platform. Let’s build together.
          </p>
        </div>

        {/* <div style={styles.section}>
          <h3 style={styles.title}>Information</h3>
          {["Register", "Our Services", "About Us", "Contact Us"].map(item => (
            <p key={item} style={styles.listItem}>{item}</p>
          ))}
        </div> */}
        <div style={styles.section}>
          <h3 style={styles.title}>Information</h3>

          {links.map((item) => (
            <p
              key={item.label}
              style={styles.listItem}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </p>
          ))}
        </div>


        <div style={styles.section}>
          <h3 style={styles.title}>Our Info</h3>
          <p style={styles.listItem}>digifywebandmedia@gmail.com</p>
          <p style={styles.listItem}>+91 798-997-2526</p>
        </div>

        <div>
          <h2 style={styles.socialTitle}>Let’s Talk</h2>
          <div style={styles.icons}>
            <span style={styles.icon}><FaLinkedinIn /></span>
            <a
              href="https://www.instagram.com/digifywebandmedia?igsh=MWFtNDUxNnh1N3R4Mg=="
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "white" }}
            >
              <span style={styles.icon}>
                <FaSquareInstagram />
              </span>
            </a>

            <span style={styles.icon}><FaYoutube /></span>
          </div>
        </div>

      </div>

      <div style={styles.bottom}>
        <span style={{ cursor: "pointer" }}>Privacy Policy</span>
        {" | "}
        <span style={{ cursor: "pointer" }}>Terms & Conditions</span>
      </div>
    </footer>
  );
};

export default Powered;
