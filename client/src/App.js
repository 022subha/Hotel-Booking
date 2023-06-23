import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Spinner from "./components/Spinner";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";
import SingleRooms from "./pages/SingleRooms/SingleRooms";
import { hideLoading, showLoading } from "./redux/features/spinnerSlice";
import { setUser } from "./redux/features/userSlice";
import AddRooms from "./pages/Admin/AddRooms/AddRooms";
import Dashboard from "./components/Dashboard/Dashboard";

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
      dispatch(setUser(response.data.user));
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
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/singlerooms" element={<SingleRooms />} />
            <Route path="/addRooms" element={<AddRooms/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
}
export default App;
