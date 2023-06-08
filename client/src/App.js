import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
=========
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
function App() {
  return (
    <BrowserRouter>
      <About/>
      <Footer />
    </BrowserRouter>
  );

>>>>>>>>> Temporary merge branch 2
}
export default App;
