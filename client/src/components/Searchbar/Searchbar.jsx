import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

export default function Searchbar() {
  const navigate = useNavigate();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [checkIn, setCheckIn] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [checkOut, setCheckOut] = useState(
    tomorrow.toISOString().substring(0, 10)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      checkIn,
      checkOut,
    });
    navigate(`/rooms?${queryParams.toString()}`);
  };

  return (
    <div className="searchbar-main-area">
      <div className="searchbar-container">
        <form onSubmit={handleSubmit}>
          <div className="form-item checkin">
            <label>Check In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="form-item checkout">
            <label>Check out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}
