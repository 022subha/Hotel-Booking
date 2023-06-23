import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "antd";

export default function Dashboard({ children }) {
  const [sideBarActive, setSideBarActive] = useState(false);
  const { user } = useSelector((state) => state.user);

  const toggle = () => {
    setSideBarActive(!sideBarActive);
  };
  useEffect(()=>{
    console.log(user)
  },[user])
  return (
    <div className="dashboard-container">
      <div className="main-container">
        <div className={`sidebar-content ${sideBarActive ? "active" : ""}`}>
          <div className="sidebar">
            <div className="front">
              <img src="/images/logo.svg"></img>
              <hr />
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
          <div className="front"><div className="dash">Dashboard</div></div>
            <ion-icon name="menu-outline"></ion-icon>
            <div className="upper">
              <div className="notification">
              <ion-icon name="notifications"></ion-icon>
              </div>
              <div className="inner">
              <Avatar src={user?.avatar} size={40}></Avatar>
              <div className="name">{user?.name}</div>
              </div>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}
