import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/config";

function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("otp_email");

    try {
      await axios.post(`${BASE_URL}/auth/verify-otp`, {
        email,
        otp,
      });

      alert("Email verified successfully 🎉");
      localStorage.removeItem("otp_email");
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid OTP");
    }
  };

  return (
    <form onSubmit={handleVerify} className="register-form">
      <h2>Verify Email OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />

      <button className="register-btn">Verify OTP →</button>
    </form>
  );
}

export default VerifyOtp;
