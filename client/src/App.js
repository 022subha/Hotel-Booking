import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ScrollToTop from "./components/ScrollToTop";
import Spinner from "./components/Spinner";
import AddRooms from "./pages/Admin/AddRooms/AddRooms";
import AllRooms from "./pages/Admin/AllRooms/AllRooms";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import EditRoom from "./pages/Admin/EditRoom/EditRoom";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Error404 from "./pages/Error404/Error404";
import Home from "./pages/Home/Home";
import MyBookings from "./pages/MyBookings/MyBookings";
import Rooms from "./pages/Rooms/Rooms";
import SingleRooms from "./pages/SingleRooms/SingleRooms";
import { hideLoading, showLoading } from "./redux/features/spinnerSlice";
import { setUser } from "./redux/features/userSlice";
import Contact from "./pages/Contact/Contact";
import Aboutus from "./pages/Aboutus/Aboutus";
import Notification from "./pages/Notification/Notification";

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
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <BrowserRouter>
          <ScrollToTop />
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

            <Route
              path="/my-bookings"
              element={
                <>
                  <Header />
                  <MyBookings />
                  <Footer />
                </>
              }
            />
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
              path="/singlerooms/:id"
              element={
                <>
                  <Header />
                  <SingleRooms />
                  <Footer />
                </>
              }
            />

            {user && user.isAdmin && (
              <>
                <Route
                  path="/admin/add-room"
                  element={
                    <>
                      <AddRooms />
                    </>
                  }
                />
                <Route
                  path="/admin/added-rooms"
                  element={
                    <>
                      <AllRooms />
                    </>
                  }
                />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route
                  path="/admin/edit-room/:id"
                  element={
                    <>
                      <EditRoom />
                    </>
                  }
                />
              </>
            )}
            <Route
              path="/about"
              element={
                <>
                  <Header />
                  <Aboutus />
                  <Footer />
                </>
              }
            />
            <Route
              path="/contacts"
              element={
                <>
                <Header />
                 <Contact/>
                 <Footer />
                </>
              }
            />
             <Route
              path="/notification/:id"
              element={
                <>
                  <Header />
                  <Notification/>
                  <Footer />
                </>
              }
            />
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <Error404 />
                  <Footer />
                </>
              }
            />
            
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
export default App;
