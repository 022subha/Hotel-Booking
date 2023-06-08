import React from "react";
import "./Searchbar.css";

export default function Searchbar() {
  return (
    <div className="searchbar-main-area">
      <div className="searchbar-container">
        <form>
          <div>
            <label>Location</label>
            <input type="location" />
          </div>
          <div>
            <label>Check In</label>
            <input type="date" />
          </div>
          <div>
            <label>Check out</label>
            <input type="date" />
          </div>
          <div>
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
          <div>
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
          <div>
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
          <button>Check Availability</button>
        </form>
      </div>
    </div>
  );
}
