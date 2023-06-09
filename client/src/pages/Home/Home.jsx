import React from "react";
import About from "../../components/About/About";
import Banner from "../../components/Banner/Banner";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
export default function Home() {
  return (
    <>
    <Banner/>
    <Testimonials/>
      <About />
      <Footer/>
    </>
  );
}
