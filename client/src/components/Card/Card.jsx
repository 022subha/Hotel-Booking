import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
export default function Card({
  price,
  size,
  capacity,
  image,
  services,
  id,
  checkInDate,
  checkOutDate,
}) {
  const navigate = useNavigate();

  const handleDetails = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      checkInDate,
      checkOutDate,
    });
    navigate(`/singlerooms/${id}?${queryParams.toString()}`);
  };
  return (
    <div className="card-area">
      <div className="img">
        <img src={image[0]} alt="" />
      </div>
      <div className="description">
        <h1>Room View Sea</h1>
        <div className="bed-capacity">
          <h3>
            Bed-Size:
            <span>{size}</span>
          </h3>
          <h3>
            Capacity:
            <span>Max Person {capacity}</span>
          </h3>
        </div>
        <div className="services">
          <h3>Services:</h3>
          <div className="services-item">
            {services.map((service, index) => (
              <div className="item" key={index}>
                <ion-icon
                  name={
                    service === "Wifi"
                      ? "wifi"
                      : service === "Food Service"
                      ? "fast-food"
                      : service === "Geyser"
                      ? "fish"
                      : service === "AC"
                      ? "cube"
                      : service === "TV"
                      ? "tv"
                      : ""
                  }
                ></ion-icon>
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="price-button">
          <div className="price">
            <h4>₹{price}</h4>
            <span>per room per night</span>
          </div>

          <div className="btn">
            <button
              onClick={(e) => {
                handleDetails(e);
              }}
            >
              View Details
            </button>
            <button>Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
