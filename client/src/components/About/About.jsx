import React from "react";
import "./About.css";
export default function About() {
  return (
    <div className="about-container">
      <div className="main-container">
        <div className="about">
          <div className="desc">
            <h1>About Us</h1>
            <h2>Welcome To Stay Easy</h2>
            <p>
              Your premier destination for exceptional hotel stays. Experience
              warm hospitality, comfort, and a memorable stay at our
              well-appointed rooms.
            </p>
          </div>

          <div className="img">
            <div className="img-part1">
              <div className="first">
                <img src="/images/About/about1.avif" alt=""></img>
              </div>
              <div className="second">
                <img src="/images/About/about2.avif" alt=""></img>
              </div>
            </div>
            <div className="img-part2">
              <div className="third">
                <img src="/images/About/about3.jpeg" alt=""></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
