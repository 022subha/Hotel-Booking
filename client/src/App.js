import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";
import SingleRooms from "./pages/SingleRooms/SingleRooms";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/singlerooms" element={<SingleRooms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
