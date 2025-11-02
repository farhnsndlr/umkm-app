import React from "react";
import Navbar from "../../components/layout/Navbar";
import HeroSection from "./HeroSection";
import DisplaySection from "./DisplaySection";
import ServiceSection from "./ServiceSection";
import FoodSection from "./FoodSection";
import DrinkSection from "./DrinkSection";
import InfoSection from "./InfoSection";
import FadeInOnScroll from "../../components/FadeInOnScroll";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar isTransparent={true} />

      <div id="home">
        <HeroSection />
      </div>

      <FadeInOnScroll>
        <DisplaySection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <InfoSection />
      </FadeInOnScroll>

      <div id="makanan">
        <FadeInOnScroll>
          <FoodSection />
        </FadeInOnScroll>
      </div>

      <div id="minuman">
        <FadeInOnScroll>
          <DrinkSection />
        </FadeInOnScroll>
      </div>

      <div id="jasa">
        <FadeInOnScroll>
          <ServiceSection />
        </FadeInOnScroll>
      </div>
    </>
  );
};

export default HomePage;
