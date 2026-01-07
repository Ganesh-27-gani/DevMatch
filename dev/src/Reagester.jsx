import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/config";

function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  // get phone/email from localStorage
  const phone = localStorage.getItem("otp_phone");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/auth/verify-otp`, {
        phone, // for mobile OTP
        otp,
      });

      alert("OTP verified successfully ✅");
      localStorage.removeItem("otp_phone"); // cleanup
      navigate("/login"); // redirect to login
    } catch (err) {
      alert(err.response?.data?.msg || "OTP verification failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <form className="register-form" onSubmit={handleVerify}>
          <h2>Verify OTP</h2>
          <p>Enter the OTP sent to your phone/email</p>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button className="register-btn">Verify →</button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
