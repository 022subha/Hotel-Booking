import React from "react";
import "./Testimonials.css";
export default function Testimonials() {
  return (
    <div className="testimonial-container">
      <div className="main-container">
        <div className="image-section">
          <div className="img1">
            <img src="/images/Testimonials/Testimonials1.webp"></img>
          </div>
        </div>

        <div className="description">
          <div className="desc1">
            <div className="header">
              <h6>Testimonials</h6>
              <h2>Our Guests Love Us</h2>
            </div>
            <div className="tail">
              <div className="outer">
                <h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam necessitatibus eum fuga repudiandae exercitationem
                  numquam ab autem beatae esse natus. Architecto sapiente quis
                  numquam exercitationem at ipsum nobis? Laudantium, inventore!
                </h5>
              </div>
              <div className="dots">
                <div className="dot">
                  <span></span>
                </div>
                <div className="dot">
                  <span></span>
                </div>
                <div className="dot">
                  <span></span>
                </div>
                <div className="dot">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
