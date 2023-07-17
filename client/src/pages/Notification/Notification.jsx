import React, { useState, useEffect } from "react";
import "./Notification.css";
import axios from "axios";
import { useSelector } from "react-redux";
export default function Notification() {
  const {user}=useSelector((state)=>(state.user));
  const [notifications, setNotifications] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const getNotification = () => {
    // console.log("hello");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/contact/getNotification`)
      .then((result) => {
        if (result.data.status) {
          // console.log(result.data.user_detail);
          setNotifications(result.data.user_detail.notification);
          // console.log(notifications);
        } else {
          console.log(result.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (initialLoad && notifications.length === 0) {
      getNotification();
      setInitialLoad(false);
    }
    if(user)
     console.log(user)
  }, [notifications, initialLoad]);

  return (
    <div className="notifi-main-container">
      {notifications &&
        notifications.map((notifi) => (
          <div className="inform" key={notifi.id}>
            <div className="info-item">
              <h3 className="label">Name:</h3>
              <span className="value">{notifi.name}</span>
            </div>
            <div className="info-item">
              <h3 className="label">Email:</h3>
              <span className="value">{notifi.email}</span>
            </div>
            <div className="info-item">
              <h3 className="label">Phone Number:</h3>
              <span className="value">{notifi.phone}</span>
            </div>
            <div className="info-item">
              <h3 className="label">Subject:</h3>
              <span className="value">{notifi.subject}</span>
            </div>
            <div className="info-item">
              <h3 className="label">Message:</h3>
              <span className="value">{notifi.message}</span>
            </div>
          </div>
        ))}
    </div>
  );
  
}
