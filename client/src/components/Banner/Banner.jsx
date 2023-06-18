import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

export default function Banner() {
  return (
    <div className="banner-main-area">
      <div className="banner-container">
        <h3>HOTEL & RESORT</h3>
        <h1>Welcome To Stay Easy</h1>
        <Link to="/rooms">
          <button>Discover Now</button>
        </Link>
      </div>
    </div>
  );
}
