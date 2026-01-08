import React, { useState } from "react";
import registerImg from "./assets/images/register1.png";
import "./Register.css";
import { BASE_URL } from "./utils/config";
import { useNavigate } from "react-router-dom";

function Register() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

 const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        role: "user",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("OTP sent to your email 📩");
      setStep(2);

      localStorage.setItem("verify_email", form.email);
    } else {
      alert(data.msg || "Registration failed");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("verify_email");

    const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful ✅");
      localStorage.removeItem("verify_email");
      setStep(1);
    } else {
      alert(data.msg || "OTP verification failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">

        {step === 1 && (
          <form className="register-form" onSubmit={sendOtp}>
            <h2>Create account</h2>

            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <button className="register-btn">Send OTP →</button>
            <p style={{ marginTop: "10px" }}>
             Already have an account?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
  
          </form>
        )}

        {step === 2 && (
          <form className="register-form" onSubmit={verifyOtp}>
            <h2>Verify Email OTP</h2>

            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button className="register-btn">Verify OTP →</button>
            
          </form>
          
        )}

        <div className="register-image">
          <img src={registerImg} alt="register" />
        </div>



      </div>
    </div>
  );
}

export default Register;
