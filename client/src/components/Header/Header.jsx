import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
const Profile_Pic_dtl = () => {
  const [dropDown, setDropDown] = useState(false);
  const handleProfileClick = () => {
    setDropDown(!dropDown);
  }
  return (
    <>
      <div className="profile-pic-dtls-in-resp-nav-side-bar" onClick={handleProfileClick} >
        <div className="img-profile">
          <img src="/images/Testimonials/Testimonials1.webp" alt="profile"></img>
        </div>
        <div className="name-profile">
          <span>NAME</span>
        </div>
        <div className="icon-profile">
          {dropDown ? <ion-icon name="chevron-down"></ion-icon> : <ion-icon name="chevron-up"></ion-icon>}
        </div>
      </div>
      {dropDown && (
        <div className="dashboard-logout-in-nav">
          <NavLink to="/dashboard-user" className="dash-user">
            Dashboard
          </NavLink>
          <NavLink to="/logout" className="logout-user">
            Logout
          </NavLink>
        </div>
      )}
    </>
  );
}
const Profile_Pic_dtl2 = () => {
  const [dropDown, setDropDown] = useState(false);
  const handleProfileClick = () => {
    setDropDown(!dropDown);
  }
  return (
    <>
      <div className="profile-pic-dtl-2">
        <div className="profile-pic-dtls-in-nav-bar-2" onClick={handleProfileClick} >
          <div className="name-profile">
            <span>NAME</span>
          </div>
          <div className="img-profile">
            <img src="/images/Testimonials/Testimonials1.webp" alt="profile"></img>
          </div>

          <div className="icon-profile">
            {dropDown ? <ion-icon name="chevron-down"></ion-icon> : <ion-icon name="chevron-up"></ion-icon>}
          </div>
        </div>
        {dropDown && (
          <div className="dashboard-logout-in-nav">
            <NavLink to="/dashboard-user" className="dash-user">
              Dashboard
            </NavLink>
            <NavLink to="/logout" className="logout-user">
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}
const Header = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <>
      <div className="header-area">
        <div className="top-header-area">
          <div className="phemail">
            <div className="phone-no">
              <ion-icon name="call"></ion-icon> <div className="txtphno">+91-98655 41789</div>
            </div>
            <div className="e-mail">
              <ion-icon name="mail-open"></ion-icon> <div className="txtmail">stayeasy@gmail.com</div>
            </div>
          </div>
          <div className="socialmedia">
            <ul>
              <li><NavLink to="/home">
                <img src="" alt="" srcset="" />
              </NavLink></li>
              <li><NavLink to="/home">
                <img src="" alt="" srcset="" />
              </NavLink></li>
              <li><NavLink to="/home">
                <img src="" alt="" srcset="" />
              </NavLink></li>
              <li><NavLink to="/home">
                <img src="" alt="" srcset="" />
              </NavLink></li>
            </ul>
          </div>

        </div>
        <div className="main-header-area">
          <div className="logo-sec">
            <img src="/images/logo.svg" alt="logo" />
          </div>
          <div className="nav-sec">
            <ul>
              <li><NavLink to="/home">Home</NavLink></li>
              <li><NavLink to="/rooms">Rooms</NavLink></li>
              <li><NavLink to="/contacts">Contact</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
            </ul>
          </div>
          {loggedIn ? <><div className="just-take-space-here"/> <Profile_Pic_dtl2 /> </> :
          <div className="register-login-sec">
            <NavLink to="/register" className="register-sec-normal">Register → </NavLink>
            <NavLink to="/login" className="login-sec-normal">Login → </NavLink>
          </div>
          }
          <div className="responsive-toggle">
            <input type="checkbox" id="check" className="toggle-input" />
            <label htmlFor="check" className="checkbtn">
              <ion-icon name="reorder-three-outline"></ion-icon>
            </label>
            <div className="resp-nav-sec">
              {loggedIn ? <Profile_Pic_dtl /> :
                <ul className="register-login-sec-2">
                  <li><NavLink to="/register">Register</NavLink></li>
                  <li><NavLink to="/login">Login</NavLink></li>
                </ul>
              }
              <ul>
                <li><img src="/images/logo.svg" alt="logo" /></li>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/rooms">Rooms</NavLink></li>
                <li><NavLink to="/contacts">Contact</NavLink></li>
                <li><NavLink to="/about">About Us</NavLink></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
export default Header;
