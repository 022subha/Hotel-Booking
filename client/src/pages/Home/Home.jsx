import React from "react";
import About from "../../components/About/About";
import Banner from "../../components/Banner/Banner";
import Searchbar from "../../components/Searchbar/Searchbar";
import Testimonials from "../../components/Testimonials/Testimonials";
import Header from "../../components/Header/Header";

export default function Home() {
  return (
    <>
      <Header/>
      <Banner />
      <Searchbar />
      <Testimonials />
      <About />
    </>
  );
}
