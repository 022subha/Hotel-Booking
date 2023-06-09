import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms/>}/>
      </Routes>
    </BrowserRouter>
  );
}
 export default App;
 
