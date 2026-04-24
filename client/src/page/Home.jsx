import React from "react";
import Hero from "../components/hero";
import BookService from "../components/BookService";
import PromoBanner from "../components/PromoBanner";
import FindDoctor from "../components/FindDoctor";
import NearestFacility from "../components/NearestFacility";

const Home = () => {
  return (
    <div>
      <Hero />
      <BookService />
      <PromoBanner />
      <FindDoctor />
      {/* <NearestFacility /> */}
    </div>
  );
};

export default Home;