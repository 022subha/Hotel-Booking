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
  const [room, setRoom] = useState(1);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      checkIn,
      checkOut,
      room,
      adult,
      children,
    });
    navigate(`/rooms?${queryParams.toString()}`);
  };

  return (
    <div className="searchbar-main-area">
      <div className="searchbar-container">
        <form onSubmit={handleSubmit}>
          {/* Check In */}
          <div className="form-item checkin">
            <label>Check In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          {/* Check Out */}
          <div className="form-item checkout">
            <label>Check out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          {/* Room */}
          <div className="form-item room">
            <label>Room</label>
            <select value={room} onChange={(e) => setRoom(e.target.value)}>
              <option value={1}>01</option>
              <option value={2}>02</option>
              <option value={3}>03</option>
              <option value={4}>04</option>
              <option value={5}>05</option>
              <option value={6}>06</option>
            </select>
          </div>

          {/* Adult */}
          <div className="form-item adult">
            <label>Adult</label>
            <select value={adult} onChange={(e) => setAdult(e.target.value)}>
              <option value={1}>01</option>
              <option value={2}>02</option>
              <option value={3}>03</option>
              <option value={4}>04</option>
              <option value={5}>05</option>
              <option value={6}>06</option>
            </select>
          </div>

          {/* Children */}
          <div className="form-item children">
            <label>Children</label>
            <select
              value={children}
              onChange={(e) => setChildren(e.target.value)}
            >
              <option value={1}>00</option>
              <option value={1}>01</option>
              <option value={2}>02</option>
              <option value={3}>03</option>
              <option value={4}>04</option>
              <option value={5}>05</option>
              <option value={6}>06</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}
