import React, { useEffect, useState } from "react";
import "./Testimonials.css";

export default function Testimonials() {
  const [activeDot, setActiveDot] = useState(0);
  const testimonials = [
    {
      avatar:
        "https://res.cloudinary.com/dysicl49j/image/upload/v1687065531/userAvatars/j4pr6jooaj4iupgz9jmx.jpg",
      title: "Amazing Experience",
      review:
        "I had an amazing experience staying at this hotel. The staff was incredibly friendly and attentive. The room was clean, comfortable, and beautifully decorated. I would highly recommend this hotel to anyone looking for a memorable stay.",
    },

    {
      avatar:
        "https://res.cloudinary.com/dysicl49j/image/upload/v1689154587/userAvatars/vijay_gvtcd5.jpg",
      title: "Excellent Service",
      review:
        "I cannot speak highly enough about the excellent service I received during my stay at this hotel.  The staff was attentive, accommodating, and always ready to assist with any requests. The room was impeccable, and the amenities provided were outstanding. ",
    },
    {
      avatar:
        "https://res.cloudinary.com/dysicl49j/image/upload/v1689154385/userAvatars/vicky_ltt3pp.jpg",
      title: "Amazing Experience",
      review:
        "I had an amazing experience staying at this hotel. The staff was incredibly friendly and attentive. The room was clean, comfortable, and beautifully decorated. I would highly recommend this hotel to anyone looking for a memorable stay.",
    },
    {
      avatar:
        "https://res.cloudinary.com/dysicl49j/image/upload/v1689153801/userAvatars/anubhav_fk2bkn.jpg",
      title: "Wonderful Stay",
      review:
        "I had a wonderful stay at this hotel. The ambiance was delightful, and the service exceeded my expectations. The room was spacious, well-maintained, and had a stunning view. I thoroughly enjoyed my time here and would definitely choose this hotel again for future visits.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prevDot) =>
        prevDot === testimonials.length - 1 ? 0 : prevDot + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setActiveDot(index);
  };

  return (
    <div className="testimonial-container">
      <div className="main-container">
        <div className="image-section">
          <div className="img1">
            <img src={testimonials[activeDot].avatar} alt=""></img>
          </div>
        </div>

        <div className="description">
          <div className="desc1">
            <div className="header">
              <h2>Reviews</h2>
              <h1>{testimonials[activeDot].title}</h1>
            </div>
            <div className="tail">
              <div className="outer">
                <p>{testimonials[activeDot].review}</p>
              </div>
              <div className="dots">
                {testimonials.map((testimonial, index) => (
                  <div
                    className={`dot ${index === activeDot ? "active" : ""}`}
                    key={index}
                    onClick={() => handleDotClick(index)}
                  >
                    <span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
