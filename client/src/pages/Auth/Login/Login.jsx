import { message as msg } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../../redux/features/spinnerSlice";
import { setUser } from "../../../redux/features/userSlice.js";
import "./Login.css";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getUser = async (token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/get-user`,
        { token }
      );
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password }
      );
      dispatch(hideLoading());
      const { status, message, token } = response.data;
      if (status) {
        msg.success(message);
        localStorage.setItem("token", token);
        getUser(token);
        navigate("/");
      } else {
        msg.error(message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

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
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span className="icon">
            <ion-icon
              name={showPass ? "eye-off" : "eye"}
              onClick={toggleShowPass}
            ></ion-icon>
          </span>
          <label htmlFor="password">Password</label>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="remember-forget">
          <a href="/forget-password">Forget Password?</a>
        </div>
        <button
          type="submit"
          className="btn"
          onClick={(e) => {
            handleLogin(e);
          }}
        >
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
