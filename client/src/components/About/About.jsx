import React from "react";
import "./About.css";
export default function About() {
  return (
    <div className="about-container">
      <div className="main-container">
        <div className="about">
          <div className="desc">
            <h2>About Us</h2>
            <h1>Welcome To Stay Ease</h1>
            <p>
              With over 340 hotels worldwide, Stay Easy offers a wide
              variety of hotels catering for a perfect stay no matter where your
              destination.
            </p>
          </div>

          <div className="img">
            <div className="img-part1">
              <div className="first">
                <img src="/images/About/about1.webp"></img>
              </div>
              <div className="second">
                <img src="/images/About/about2.webp"></img>
              </div>
            </div>
            <div className="img-part2">
              <div className="third">
                <img src="/images/About/about3.webp"></img>
              </div>
            </div>
          </div>
        </div>
        <div className="icon"></div>
      </div>
    </div>
  );
}
