import { Avatar, Modal, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { setUser } from "../../redux/features/userSlice";
import "./Header.css";
const ProfilePicdtl = ({ user, handleLogout, checked, setChecked }) => {
  const [dropDown, setDropDown] = useState(false);
  const handleProfileClick = () => {
    setDropDown(!dropDown);
  };
  return (
    <>
      <div className="profile-pic-dtls-in-resp-nav-side-bar">
        <div className="img-profile">
          <Avatar
            src={user.avatar}
            size={80}
            icon={<ion-icon name="person"></ion-icon>}
          />
        </div>
        <div className="name-profile" onClick={handleProfileClick}>
          <span>{user.name.split(" ")[0]}</span>
        </div>
        <div className="icon-profile" onClick={handleProfileClick}>
          {dropDown ? (
            <ion-icon name="chevron-down"></ion-icon>
          ) : (
            <ion-icon name="chevron-up"></ion-icon>
          )}
        </div>
      </div>
      {dropDown && (
        <div className="dashboard-logout-in-nav">
          {user.isAdmin ? (
            <Link
              to="/admin/dashboard"
              className="dash-user"
              onClick={() => setChecked(!checked)}
            >
              <span>
                <ion-icon name="grid"></ion-icon>
              </span>
              <span> Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/my-bookings"
              className="dash-user"
              onClick={() => setChecked(!checked)}
            >
              <span>
                <ion-icon name="bed"></ion-icon>
              </span>
              <span>My Bookings</span>
            </Link>
          )}
          <Link to="#" className="logout-user" onClick={(e) => handleLogout(e)}>
            <span>
              <ion-icon
                name="log-out"
                style={{ color:"rgb(248, 145, 145)", fontSize: "2rem" }}
              ></ion-icon>
            </span>
            <span>Logout</span>
          </Link>
        </div>
      )}
    </>
  );
};
const ProfilePicdtl2 = ({ user, handleLogout, checked, setChecked }) => {
  const [dropDown, setDropDown] = useState(false);
  const handleProfileClick = () => {
    setDropDown(!dropDown);
  };

  return (
    <>
      <div className="profile-pic-dtl-2">
        <div className="profile-pic-dtls-in-nav-bar-2">
          <div className="img-profile">
            <Avatar
              size={50}
              src={user.avatar}
              icon={<ion-icon name="person"></ion-icon>}
            />
          </div>
          <div className="name-profile" onClick={handleProfileClick}>
            <span>{user.name.split(" ")[0]}</span>
          </div>

          <div className="icon-profile" onClick={handleProfileClick}>
            {dropDown ? (
              <ion-icon name="chevron-down"></ion-icon>
            ) : (
              <ion-icon name="chevron-up"></ion-icon>
            )}
          </div>
        </div>
        {dropDown && (
          <div className="dashboard-logout-in-nav">
            {user.isAdmin ? (
              <Link
                to="/admin/dashboard"
                className="dash-user"
                onClick={() => setChecked(!checked)}
              >
                <span>
                  <ion-icon name="grid"></ion-icon>
                </span>
                <span> Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/bookings"
                className="dash-user"
                onClick={() => setChecked(!checked)}
              >
                <span>
                  <ion-icon name="bed"></ion-icon>
                </span>
                <span>My Bookings</span>
              </Link>
            )}
            <Link
              to="#"
              className="logout-user"
              onClick={(e) => handleLogout(e)}
            >
              <span>
                <ion-icon
                  name="log-out"
                  style={{ color: "rgb(248, 145, 145)", fontSize: "2rem" }}
                ></ion-icon>
              </span>
              <span>Logout</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [checked, setChecked] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault();
    try {
      setChecked(!checked);
      Modal.confirm({
        title: "Confirm",
        content: "Are you sure you want to logout?",
        onOk() {
          localStorage.removeItem("token");
          dispatch(setUser(null));

          message.success("Logged Out Successfully !!");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="header-area">
        <div className="top-header-area">
          <div className="phemail">
            <div className="phone-no">
              <ion-icon name="call"></ion-icon>{" "}
              <div className="txtphno">+91-98655 41789</div>
            </div>
            <div className="e-mail">
              <ion-icon name="mail-open"></ion-icon>{" "}
              <div className="txtmail">stayeasy@gmail.com</div>
            </div>
          </div>
          <div className="socialmedia">
            <ul>
              <li>
                <NavLink to="/home">
                  <img src="" alt="" srcSet="" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/home">
                  <img src="" alt="" srcSet="" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/home">
                  <img src="" alt="" srcSet="" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/home">
                  <img src="" alt="" srcSet="" />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-header-area">
          <div className="logo-sec">
            <img src="/images/logo.svg" alt="logo" />
          </div>
          <div className="nav-sec">
            <ul>
              <li>
                <NavLink to="/" activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/rooms" activeClassName="active">
                  Rooms
                </NavLink>
              </li>
              <li>
                <NavLink to="/contacts" activeClassName="active">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" activeClassName="active">
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>
          {user ? (
            <>
              <div className="just-take-space-here" />{" "}
              <ProfilePicdtl2
                user={user}
                handleLogout={handleLogout}
                checked={checked}
                setChecked={setChecked}
              />
            </>
          ) : (
            <div className="register-login-sec">
              <Link to="/register" className="register-sec-normal">
                Register →{" "}
              </Link>
              <Link to="/login" className="login-sec-normal">
                Login →{" "}
              </Link>
            </div>
          )}
          <div className="responsive-toggle">
            {checked && (
              <div className="overlay" onClick={(e) => setChecked(!checked)} />
            )}
            <input
              type="checkbox"
              id="check"
              className="toggle-input"
              value={checked}
              onChange={() => setChecked(!checked)}
            />
            <label htmlFor="check" className="checkbtn">
              <ion-icon name="reorder-three-outline"></ion-icon>
            </label>
            <div className={checked ? "resp-nav-sec drawer" : "resp-nav-sec"}>
              {user ? (
                <ProfilePicdtl
                  user={user}
                  handleLogout={handleLogout}
                  checked={checked}
                  setChecked={setChecked}
                />
              ) : (
                <ul className="register-login-sec-2">
                  <li>
                    <NavLink
                      to="/register"
                      onClick={() => setChecked(!checked)}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" onClick={() => setChecked(!checked)}>
                      Login
                    </NavLink>
                  </li>
                </ul>
              )}
              <ul>
                <li>
                  <img src="/images/logo.svg" alt="logo" />
                </li>
                <li>
                  <NavLink
                    to="/"
                    activeClassName="active"
                    onClick={() => setChecked(!checked)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/rooms"
                    activeClassName="active"
                    onClick={() => setChecked(!checked)}
                  >
                    Rooms
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contacts"
                    activeClassName="active"
                    onClick={() => setChecked(!checked)}
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    activeClassName="active"
                    onClick={() => setChecked(!checked)}
                  >
                    About Us
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
