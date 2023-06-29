import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/Dashboard/DashboardLayout.jsx";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Spinner from "./components/Spinner";
import AddRooms from "./pages/Admin/AddRooms/AddRooms";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Home from "./pages/Home/Home";
import MyBookings from "./pages/MyBookings/MyBookings";
import Rooms from "./pages/Rooms/Rooms";
import SingleRooms from "./pages/SingleRooms/SingleRooms";
import { hideLoading, showLoading } from "./redux/features/spinnerSlice";
import { setUser } from "./redux/features/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.spinner);

  const getUser = async (token) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/get-user`,
        { token }
      );
      dispatch(hideLoading());
      if (response.data.status) dispatch(setUser(response.data.user));
      else localStorage.removeItem("token");
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user && token) getUser(token);
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Header />
                  <Login />
                  <Footer />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <Header />
                  <Register />
                  <Footer />
                </>
              }
            />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route
              path="/rooms"
              element={
                <>
                  <Header />
                  <Rooms />
                  <Footer />
                </>
              }
            />
            <Route
              path="/singlerooms"
              element={
                <>
                  <Header />
                  <SingleRooms />
                  <Footer />
                </>
              }
            />
            <Route
              path="/admin/add-room"
              element={
                <>
                  <AddRooms />
                </>
              }
            />
            <Route path="/admin/dashboard" element={<DashboardLayout />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
export default App;
