import React from "react";
import { Link } from "react-router-dom";
import "./Error404.css";

export default function Error404() {
  return (
    <div className="error404-container">
      <div className="image">
        <img src="/images/404.png" alt="" />
      </div>
      <div className="details">
        <span>Page Not Found</span>
        <h3>Oh No! Error 404</h3>
        <p>Maybe Bigfoot has broken this page.</p>
        <p>Come back to the home page</p>
        <Link to="/">
          <button>Back to HomePage</button>
        </Link>
      </div>
    </div>
  );
}
