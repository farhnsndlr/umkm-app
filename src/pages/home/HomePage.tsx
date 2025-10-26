import React from "react";
import Navbar from "../../components/layout/Navbar";
import HeroSection from "./HeroSection";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar isTransparent={true} />
      <HeroSection />
    </>
  );
};

export default HomePage;
