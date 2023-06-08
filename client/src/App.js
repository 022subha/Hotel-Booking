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

}

export default App;
