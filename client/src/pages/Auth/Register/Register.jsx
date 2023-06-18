import { Avatar, message as msg } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../../redux/features/spinnerSlice";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [imagePrev, setImagePrev] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePrev(reader.result);
        setImage(file);
      };
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const bodyContent = new FormData();
      bodyContent.append("name", name);
      bodyContent.append("email", email);
      bodyContent.append("password", password);
      bodyContent.append("avatar", image);
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        bodyContent
      );
      dispatch(hideLoading());
      const { status, message } = response.data;
      if (status) {
        navigate("/login");
        msg.success(message);
      } else {
        msg.error(message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  return (
    <div className="register-container">
      <div className="form-box">
        <h2>Sign Up</h2>

        <div className="input-box">
          <div className="avatar">
            <Avatar
              size={120}
              src={imagePrev}
              icon={<ion-icon name="person"></ion-icon>}
            />
          </div>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            accept="image/*"
            placeholder="Choose Your Avatar"
            onChange={changeImageHandler}
          />
        </div>
        <button
          type="submit"
          className="btn"
          onClick={(e) => {
            handleRegister(e);
          }}
        >
          Register
        </button>
        <div className="login-register">
          <p>
            Already Have an Account?
            <span className="register-link">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
