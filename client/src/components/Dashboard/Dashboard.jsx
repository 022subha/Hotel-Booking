import React, { useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const[sideBarActive,setSideBarActive]=useState(false);

  const toggle=()=>{
    setSideBarActive(!sideBarActive);
  }
  return (
    <div className="dashboard-container">
      <div className="main-container">
      <div className={`sidebar-content ${sideBarActive ? "active" : ""}`}>
          <div className='sidebar'>
            <div className="front">
              <h1>DashBoard</h1>
              <hr />
            </div>

            <div
              className='nav'
            >
              <ion-icon name="add"></ion-icon>
              <h2>Add Rooms</h2>
            </div>

            <div
              className='nav'
            >
              <ion-icon name="home"></ion-icon>
              <h2>View Rooms</h2>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header" onClick={() => toggle()}>
          <ion-icon name="menu-outline" ></ion-icon>
          </div>
          <div className="body"></div>
        </div>
      </div>
    </div>
  );
}
