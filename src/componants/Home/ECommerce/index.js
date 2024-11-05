import React from "react";
import "./styles.scss";
import CategoriesSlider from "./Modals/CategoriesSlider/index";
import HeroSlider from "./Modals/HeroSlider/index";

const Index = () => {
  return (
    <div className="e-commerce-page">
      <div className="hero-section common-width">
        <HeroSlider />
      </div>
      <div className="categories common-width">
        <CategoriesSlider />
        <CategoriesSlider />
      </div>
    </div>
  );
};

export default Index;
