import { message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="main-footer-area">
      <div className="footer-container">
        <div className="section1">
          <div className="footer-logo">
            <img src="/images/logo.svg" alt="" />
          </div>

          <h2>+91 9865541789</h2>
          <span>stayeasy@gmail.com</span>
          <span>Botanical Garden Area, Howrah, West Bengal 711103</span>
        </div>
        <div className="section2">
          <h3>Links</h3>
          <ul>
            <li>
              <Link to="/about">
                <ion-icon name="caret-forward"></ion-icon> About Us
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <ion-icon name="caret-forward"></ion-icon>Contact
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service">
                <ion-icon name="caret-forward"></ion-icon>Terms of Services
              </Link>
            </li>
            <li>
              <Link to="/cancellation-policy">
                <ion-icon name="caret-forward"></ion-icon>Cancellation Policy
              </Link>
            </li>
            <li>
              <Link to="/refund-policy">
                <ion-icon name="caret-forward"></ion-icon>Refund Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="section3">
          <h3>Subscribe Newsletter</h3>
          <span>
            Subscribe our newsletter to get notification about new updates.
          </span>
          <form>
            <input type="email" placeholder="Enter your email...." required />
            <button
              onClick={(e) => {
                e.preventDefault();
                message.success("Successfully Subscribed to newsletter !!");
              }}
            >
              <ion-icon name="paper-plane-sharp"></ion-icon>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
