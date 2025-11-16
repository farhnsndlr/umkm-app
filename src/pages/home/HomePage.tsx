import React from "react";
import Navbar from "../../components/layout/Navbar.js";
import HeroSection from "./HeroSection.js";
import DisplaySection from "./DisplaySection.js";
import ServiceSection from "./ServiceSection.js";
import FoodSection from "./FoodSection.js";
import DrinkSection from "./DrinkSection.js";
import InfoSection from "./InfoSection.js";
import FadeInOnScroll from "../../components/FadeInOnScroll.js";

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
