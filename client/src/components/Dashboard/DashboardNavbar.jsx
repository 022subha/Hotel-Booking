import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./DashboardNavbar.css";
import { useNavigate } from "react-router-dom";
export default function DashboardNavbar({ openSidebar }) {
  const navigate=useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="dashboard-navbar-area">
      <div className="navbar">
        <nav>
          <div className="responsive-burgermenu" onClick={openSidebar}>
            <ion-icon name="menu"></ion-icon>
          </div>
          <div className="nav-menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {/* <li>
                <Link to="/rooms">Rooms</Link>
              </li> */}
            </ul>
            <div className="nav-profile-area">
              <div className="nav-profile">
                <div className="nav-profile-items">
                  <div className="menu-profile">
                    <ion-icon name="notifications"
                     onClick={()=>navigate(`/notification/${user?.id}`)}
                    ></ion-icon>
                    <Avatar size={50} src={user && user.avatar} />
                    <span>{user && user.name.split(" ")[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
