import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
export default function Card({price,size,capacity}) {

  return (
    <div className="card-container">
      <div className="main-container">
        <div className="img">
          <img src="/images/Rooms/Rooms1.webp" alt="" />
        </div>
        <div className="description">
          <div className="header">
            <h2>
              <span>Room </span>
              <span>View </span>
              <span>sea</span>
            </h2>
          </div>
          <div className="paisa">
            <h4>{price}</h4>
          </div>
          <div className="middle">
            <div className="size">
              <h3>
                Size:
                <span>{size}</span>
              </h3>
              <h3>
                capacity:
                <span>Max Person {capacity}</span>
              </h3>
            </div>
            <div className="bed">
              <h3>
                Bed:
                <span>kings bed</span>
              </h3>
              <h3>
                Services:
                <span>Wifi,Television</span>
              </h3>
            </div>
          </div>
          <div className="footer">
            <Link to="/singlerooms">View details--</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
