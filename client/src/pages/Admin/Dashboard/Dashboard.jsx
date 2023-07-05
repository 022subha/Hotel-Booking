import React from "react";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import './Dashboard.css';


export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="admin-dashboard-container-fluid">
        <div className="admin-dashboard-row">
          <div className="admin-card new-bookings">
            <div className="title-content">
              <div className="card-title">872</div>
              <div className="card-content">New Bookings</div>
            </div>
            <ion-icon name="bookmark-outline" style={{ fontSize: 48, color: 'white' }}></ion-icon>
          </div>
          <div className="admin-card schedule-rooms">
            <div className="title-content">
              <div className="card-title">872</div>
              <div className="card-content">Schedule Rooms</div>
            </div>
            <ion-icon name="calendar-clear-outline" style={{ fontSize: 48, color: 'white' }}></ion-icon>
          </div>
          <div className="admin-card check-in">
            <div className="title-content">
              <div className="card-title">872</div>
              <div className="card-content">Check in</div>
            </div>
            <ion-icon name="log-in-outline" style={{ fontSize: 56, color: 'white' }}></ion-icon>
          </div>
          <div className="admin-card check-out">
            <div className="title-content">
              <div className="card-title">872</div>
              <div className="card-content">Check-out</div>
            </div>
            <ion-icon name="exit-outline" style={{ fontSize: 56, color: 'white', transform: 'rotate(180deg)' }}></ion-icon>
          </div>
        </div>
        <div className="admin-two-charts">
          <div className="available-rooms-today">
            <div className="art-title">
              897
            </div>
            <div className="art-content">Available Rooms Today</div>
          </div>
          <div className="booked-rooms-today">
            <div className="brt-name">Booked Rooms Today</div>
          </div>
        </div>
        <div className="reservation-statistics-chart"></div>
        <div className="check-in-check-out-chart"></div>
      </div>
    </DashboardLayout>
  );
}
