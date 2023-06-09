import React from "react";
import "./Searchbar.css";

export default function Searchbar() {
  return (
    <div className="searchbar-main-area">
      <div className="searchbar-container">
        <form>
          <div className="form-item location">
            <label>Location</label>
            <select>
              <option value="">Select</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Delhi">Delhi</option>
              <option value="Bengalore">Bengalore</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>
          <div className="form-item checkin">
            <label>Check In</label>
            <input type="date" />
          </div>
          <div className="form-item checkout">
            <label>Check out</label>
            <input type="date" />
          </div>
          <div className="form-item room">
            <label>Room</label>
            <select>
              <option value={1}>01</option>
              <option value={2}>02</option>
              <option value={3}>03</option>
              <option value={4}>04</option>
              <option value={5}>05</option>
              <option value={6}>06</option>
            </select>
          </div>
          <div className="form-item adult">
            <label>Adult</label>
            <select>
              <option value={1}>01</option>
              <option value={2}>02</option>
              <option value={3}>03</option>
              <option value={4}>04</option>
              <option value={5}>05</option>
              <option value={6}>06</option>
            </select>
          </div>
          <div className="form-item children">
            <label>Children</label>
            <select>
              <option value={1}>01</option>
              <option value={2}>02</option>
              <option value={3}>03</option>
              <option value={4}>04</option>
              <option value={5}>05</option>
              <option value={6}>06</option>
            </select>
          </div>

          <button>Search</button>
        </form>
      </div>
    </div>
  );
}
