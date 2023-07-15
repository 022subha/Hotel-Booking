import React from "react";
import "./Aboutus.css";

export default function Aboutus() {
  return (
    <div className="about-us-1">
      <div className="header-1">About us</div>
      <div className="dev">
        <img src="/images/About/about4.jpg" alt="" srcset="" />
        <div className="dev-dtls">
          <h2 className="sub-head">About Us</h2>
          <p>Hello! Welcome to Stay Easy! Really happy to see you here.</p>
          <span>
            Welcome to Stay Easy, where booking a room is a breeze. With our
            user-friendly interface, finding the perfect stay is a tease. Our
            trusted platform ensures peace of mind with each click. For
            hassle-free bookings and unforgettable trips, pick Stay Easy, quick!
            Experience convenience and comfort like never before, come and
            explore!
          </span>
        </div>
      </div>
      <div className="developers">
        <h1>Our Developers</h1>
        <div className="developer-card">
          <img src="/images/Subhajit.jpg" alt="" />
          <div className="developer-details">
            <h3 className="name">Subhajit Samanta</h3>
            <p className="description">
              Meet Subhajit Samanta, a fourth year B. Tech student in Computer
              Science and Technology in Indian Institute of Engineering Science
              & Technology, Shibpur.
            </p>
          </div>
        </div>
        <div className="developer-card">
          <div className="developer-details">
            <h3 className="name">Anubhav Anand</h3>
            <p className="description">
              Meet Anubhav Anand, a fourth year B. Tech student in Computer
              Science and Technology in Indian Institute of Engineering Science
              & Technology, Shibpur.
            </p>
          </div>
          <img src="/images/Subhajit.jpg" alt="" />
        </div>
        <div className="developer-card">
          <img src="/images/Subhajit.jpg" alt="" />
          <div className="developer-details">
            <h3 className="name">Bijay Kumar Sah</h3>
            <p className="description">
              Meet Bijay Kumar Sah, a fourth year B. Tech student in Computer
              Science and Technology in Indian Institute of Engineering Science
              & Technology, Shibpur.
            </p>
          </div>
        </div>
        <div className="developer-card">
          <div className="developer-details">
            <h3 className="name">Vicky Kumar Shaw</h3>
            <p className="description">
              Meet Vicky Kumar Shaw, a fourth year B. Tech student in Computer
              Science and Technology in Indian Institute of Engineering Science
              & Technology, Shibpur.
            </p>
          </div>
          <img src="/images/Subhajit.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}
