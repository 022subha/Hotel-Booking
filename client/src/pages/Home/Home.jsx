import React from "react";
import About from "../../components/About/About";
import Banner from "../../components/Banner/Banner";
import Searchbar from "../../components/Searchbar/Searchbar";

export default function Home() {
  return (
    <>
      <Banner />
      <Searchbar />
      <About />
    </>
  );
}
