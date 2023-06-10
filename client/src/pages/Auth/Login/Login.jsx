import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const toggleShowPass = () => {
    setShowPass(!showPass);
  };
  return (
    <div className="login-container">
      <div className="form-box">
        <h2>Sign In</h2>
        <div className="passport">
          <div className="log">
            <img src="/images/gl.svg" alt="" />
            <h5>Continue With Google</h5>
          </div>
          <div className="log">
            <img src="/images/fb.svg" alt="" />
            <h5>Continue With Facebook</h5>
          </div>
        </div>
        <div className="horizontal-line">
          <div className="line1"></div>
          <span>OR</span>
          <div className="line2"></div>
        </div>

        <div className="input-box">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" />
          <span className="icon">
            <ion-icon
              name={showPass ? "eye-off" : "eye"}
              onClick={toggleShowPass}
            ></ion-icon>
          </span>
          <label htmlFor="password">Password</label>
          <input type={showPass ? "text" : "password"} placeholder="Password" />
        </div>
        <div className="remember-forget">
          <a href="/forget-password">Forget Password?</a>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <div className="login-register">
          <p>
            Don't Have an Account?
            <span className="register-link">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
