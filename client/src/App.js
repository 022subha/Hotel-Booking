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
import { setUser } from "./redux/features/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.spinner);

  const getUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/get-user`,
        { token: localStorage.getItem("token") }
      );

      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) getUser();
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
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
}
export default App;
