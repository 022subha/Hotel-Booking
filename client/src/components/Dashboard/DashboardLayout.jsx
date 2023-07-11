import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./DashboardLayout.css";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashbordSidebar";

export default function Dashboard({ children }) {
  const location = useLocation();
  const [sideBarActive, setSideBarActive] = useState(false);
  const { user } = useSelector((state) => state.user);

  const openSidebar = () => {
    setSideBarActive(true);
  };

  const closeSidebar = () => {
    setSideBarActive(false);
  };

  return (
    <div className="dashboardlayout-container">
      {sideBarActive && <div className="overlay" onClick={closeSidebar} />}
      <DashboardSidebar sideBarActive={sideBarActive} />
      <div className="main-content">
        <DashboardNavbar openSidebar={openSidebar} />
        <div className="body">{children}</div>
      </div>
    </div>
  );
}
