import React, { useState, useEffect } from "react";
import registerImg from "./assets/images/register1.png";
import "./Register.css";
import { BASE_URL } from "./utils/config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TiLockOpenOutline, TiLockClosedOutline } from "react-icons/ti";

function Register() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  // OTP Resend Timer
  useEffect(() => {
    let t;
    if (step === 2 && timer > 0) {
      t = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(t);
  }, [step, timer]);

  // Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password.trim()) newErrors.password = "Password is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email))
      newErrors.email = "Enter valid email";

    const strongPassword =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
    if (form.password && !strongPassword.test(form.password))
      newErrors.password =
        "Min 6 chars, 1 capital, 1 number, 1 symbol required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Details",
        text: "Please fill all fields correctly",
      });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "user" }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: "Check your email inbox 📩",
          timer: 2000,
          showConfirmButton: false,
        });
        localStorage.setItem("verify_email", form.email);
        setStep(2);
        setTimer(30);
        setCanResend(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.msg || "Email already in use",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Could not send OTP",
      });
    }
  };

  // Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      Swal.fire({ icon: "error", title: "Invalid OTP", text: "Enter 6-digit OTP" });
      return;
    }

    const email = localStorage.getItem("verify_email");

    try {
      const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You can now login 🎉",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          localStorage.removeItem("verify_email");
          navigate("/login");
        });
      } else {
        Swal.fire({ icon: "error", title: "Invalid OTP", text: data.msg || "Try again" });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Server Error", text: "Could not verify OTP" });
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    const email = localStorage.getItem("verify_email");
    if (!email) {
      Swal.fire({ icon: "error", title: "Email not found", text: "Please register first" });
      return;
    }

    setTimer(30);
    setCanResend(false);

    try {
      const res = await fetch(`${BASE_URL}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({ icon: "info", title: "OTP Resent", text: "Check your email 📩", timer: 1500, showConfirmButton: false });
      } else {
        Swal.fire({ icon: "error", title: "Failed to resend OTP", text: data.msg || "Try again" });
        setCanResend(true);
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Server Error", text: "Could not resend OTP" });
      setCanResend(true);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        {/* STEP 1 : REGISTER */}
        {step === 1 && (
          <form className="register-form" onSubmit={sendOtp}>
            <h2>Create account</h2>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            <div style={{ position: "relative" }}>
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={form.password} onChange={handleChange} />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: 12, cursor: "pointer", fontSize: "30px" }}
              >
                {showPassword ? <TiLockOpenOutline /> : <TiLockClosedOutline />}
              </span>
            </div>
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            <button className="register-btn">Send OTP →</button>
            <p>
              Already have an account?{" "}
              <span style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>Sign in</span>
            </p>
          </form>
        )}

        {/* STEP 2 : VERIFY OTP */}
        {step === 2 && (
          <form className="register-form" onSubmit={verifyOtp}>
            <h2>Verify Email OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
              style={{ textAlign: "center", fontSize: "18px", padding: "8px" }}
            />
            <button className="register-btn" style={{ marginTop: "15px" }}>Verify OTP →</button>
            <p style={{ marginTop: "10px" }}>
              {canResend ? (
                <span onClick={resendOtp} style={{ color: "blue", cursor: "pointer" }}>Resend OTP</span>
              ) : (
                <>Resend OTP in {timer}s</>
              )}
            </p>
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
