import React from "react";
import Card from "../../components/Card/Card";
import "./Rooms.css";
export default function Rooms() {
  return (
    <div className="room-container">
      <div className="filter-container"></div>
      <div className="card-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
