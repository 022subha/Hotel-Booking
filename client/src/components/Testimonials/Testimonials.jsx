import React, { useState } from "react";
import "./Testimonials.css";
export default function Testimonials() {
  const [activeDot, setActiveDot] = useState(0);

  const handledotHover = (index) => {
    setActiveDot(index);
  };

  const testimonials = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam necessitatibus eum fuga repudiandae exercitationem numquam ab autem beatae esse natus. Architecto sapiente quis numquam exercitationem at ipsum nobis? Laudantium, inventore!",
    "hi. Laboriosam necessitatibus eum fuga repudiandae exercitationem numquam ab autem beatae esse natus. Architecto sapiente quis numquam exercitationem at ipsum nobis? Laudantium, inventore Yes you are the one of the most and wordt plane in the worls!",
    "Yellow Color is most frustrating one. Laboriosam necessitatibus eum fuga repudiandae exercitationem numquam ab autem beatae esse natus. Architecto sapiente quis numquam exercitationem at ipsum nobis? Laudantium, inventore!",
    "You are just a piece of paper whom i use and throw Laboriosam necessitatibus eum fuga repudiandae exercitationem numquam ab autem beatae esse natus. Architecto sapiente quis numquam exercitationem at ipsum nobis? Laudantium, inventore!",
  ];

  return (
    <div className="testimonial-container">
      <div className="main-container">
        <div className="image-section">
          <div className="img1">
            <img src="/images/Testimonials/Testimonials1.webp" alt=""></img>
          </div>
        </div>

        <div className="description">
          <div className="desc1">
            <div className="header">
              <h2>Reviews</h2>
              <h1>Our Guests Love Us</h1>
            </div>
            <div className="tail">
              <div className="outer">
                <p>{testimonials[activeDot]}</p>
              </div>
              <div className="dots">
                {testimonials.map((testimonial, index) => {
                  return (
                    <div
                      className={`dot ${index === activeDot ? "active" : ""}`}
                      key={index}
                      onMouseEnter={() => {
                        handledotHover(index);
                      }}
                    >
                      <span></span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
