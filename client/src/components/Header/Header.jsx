import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <>
      <div className="header-area">
        <div className="top-header-area">
          <div className="phemail">
            <div className="phone-no">
              <ion-icon name="call"></ion-icon> <div>+91-98655 41789</div>
            </div>
            <div className="e-mail">
              <ion-icon name="mail-open"></ion-icon>{" "}
              <div>stayeasy@gmail.com</div>
            </div>
          </div>
          <div className="socialmedia">
            <ul>
              <li>
                <NavLink to="/home">
                  <img src="" alt="" srcSet="" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/home">
                  <img src="" alt="" srcSet="" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/home">
                  <img src="" alt="" srcSet="" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/home">
                  <img src="" alt="" srcSet="" />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-header-area">
          <div className="logo-sec">
            <img src="/images/logo.svg" alt="logo" />
          </div>
          <div className="nav-sec">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/rooms">Rooms</NavLink>
              </li>
              <li>
                <NavLink to="/contacts">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
            </ul>
          </div>
          <div className="register-login-sec">
            <ul>
              <li>
                <NavLink to="/register">Register → </NavLink>
              </li>
              <li>
                <NavLink to="/login">Login → </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
