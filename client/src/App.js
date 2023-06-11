import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";
import SingleRooms from "./pages/SingleRooms/SingleRooms";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/single-room" element={<SingleRoom />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/singlerooms" element={<SingleRooms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
