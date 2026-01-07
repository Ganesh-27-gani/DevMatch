import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/config";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("otp_email");

  const handleVerify = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/verify-otp`, {
        email,
        otp,
      });

      alert("Registration successful ✅");
      localStorage.removeItem("otp_email");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.msg || "OTP verification failed");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}

export default VerifyOtp;
