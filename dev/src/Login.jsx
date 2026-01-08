import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/config";
 
function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email: form.email,
        password: form.password,
      });

      // 🔐 save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful ✅");
      navigate("/"); // or dashboard
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />

          <button className="register-btn">Login →</button>

          <p style={{ marginTop: "10px" }}>
            New user?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/regester")}
            >
              Create account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
