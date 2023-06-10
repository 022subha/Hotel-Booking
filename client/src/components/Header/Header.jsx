import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
const Header = () => {
    return (
        <>
            <div className="header-area">
                <div className="top-header-area">
                    <div className="phemail">
                        <div className="phone-no">
                            📞 +91-98655 41789
                        </div>
                        <div className="e-mail">
                            ✉️ stayeasy@gmail.com
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
                        <img src="/images/logo.svg" alt="logo"/>
                    </div>
                    <div className="nav-sec">
                        <ul>
                            <li><NavLink to="/home">Home</NavLink></li>
                            <li><NavLink to="/rooms">Rooms</NavLink></li>
                            <li><NavLink to="/contacts">Contact</NavLink></li>
                            <li><NavLink to="/about">About Us</NavLink></li>
                        </ul>
                    </div>
                    <div className="register-login-sec">
                        <ul>
                            <li><NavLink to="/register">Register → </NavLink></li>
                            <li><NavLink to="/login">Login → </NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Header;
