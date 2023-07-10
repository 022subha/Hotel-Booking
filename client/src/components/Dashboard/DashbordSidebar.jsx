import React from "react";
import { NavLink } from "react-router-dom";
import "./DashboardSidebar.css";

export default function DashboardSidebar({ sideBarActive }) {
  return (
    <div className={`sidemenu-area ${sideBarActive && "open"}`}>
      <div className="sidemenu-logo">
        <img src="/images/logo.svg" alt="" />
      </div>

      <div className="sidemenu-body">
        <ul>
          <li>
            <NavLink to="/admin/dashboard" activeclassname="active">
              <span className="icon">
                <ion-icon name="grid"></ion-icon>
              </span>
              <span className="menu-title">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-room" activeclassname="active">
              <span className="icon">
                <ion-icon name="add-circle"></ion-icon>
              </span>
              <span className="menu-title">Add Room</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/added-rooms" activeclassname="active">
              <span className="icon">
                <ion-icon name="bed"></ion-icon>
              </span>
              <span className="menu-title">All Rooms</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
