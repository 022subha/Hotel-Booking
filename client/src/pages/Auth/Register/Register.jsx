import { Avatar } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [imagePrev, setImagePrev] = useState();
  const [image, setImage] = useState();
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
          <input type="text" placeholder="Name" />
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
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            accept="image/*"
            placeholder="Choose Your Avatar"
            onChange={changeImageHandler}
          />
        </div>
        <button type="submit" className="btn">
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
