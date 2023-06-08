import React from "react";
import { BrowserRouter } from "react-router-dom";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <About />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
