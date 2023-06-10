import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import SingleRoom from "./pages/SingleRoom/SingleRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single-room" element={<SingleRoom />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
