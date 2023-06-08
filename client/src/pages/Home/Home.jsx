import React from "react";
import About from "../../components/About/About";
import Banner from "../../components/Banner/Banner";
import Searchbar from "../../components/Searchbar/Searchbar";
import Testimonials from "../../components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Banner />
      <Searchbar />
      <Testimonials />
      <About />
    </>
  );
}
