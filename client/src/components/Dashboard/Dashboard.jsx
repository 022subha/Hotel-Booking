import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard({ children }) {
  const location = useLocation();
  const [sideBarActive, setSideBarActive] = useState(false);
  const { user } = useSelector((state) => state.user);

  const toggle = () => {
    setSideBarActive(!sideBarActive);
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="dashboard-container">
      <div className="main-container">
        <div className={`sidebar-content ${sideBarActive ? "active" : ""}`}>
          <div className="sidebar">
            <div className="front">
              <img src="/images/logo.svg" alt=""></img>
            </div>

            <div className="nav">
              <Link to="/admin/dashboard">
                <ion-icon name="grid"></ion-icon>
                <h2>Dashboard</h2>
              </Link>
            </div>

            <div className="nav">
              <Link to="/admin/add-room">
                <ion-icon name="add"></ion-icon>
                <h2>Add Rooms</h2>
              </Link>
            </div>

            <div className="nav">
              <Link to="/admin/rooms">
                <ion-icon name="home"></ion-icon>
                <h2>View Rooms</h2>
              </Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header" onClick={() => toggle()}>
            <ion-icon name="menu-outline"></ion-icon>
            <div className="front">
              <div className="dash">
                {location.pathname.split("/")[2].toLocaleUpperCase()}
              </div>
            </div>
            <div className="upper">
              <div className="notification">
                <ion-icon name="notifications"></ion-icon>
              </div>
              <div className="inner">
                <Avatar
                  src={user?.avatar}
                  icon={<ion-icon name="notifications"></ion-icon>}
                  size={50}
                />
                <div className="name">{user?.name.split(" ")[0]}</div>
              </div>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}
