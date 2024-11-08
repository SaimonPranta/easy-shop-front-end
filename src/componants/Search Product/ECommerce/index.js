import React, { useEffect, useState } from "react";
import "./styles.scss";
import CategoriesSlider from "./Modals/CategoriesSlider/index";
import HeroSlider from "./Modals/HeroSlider/index";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [slider, setSlider] = useState([]);
  const [sliderLoading, setSliderLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/slider_provider?tab="E-Commerce Slider"`
    )
      .then((res) => res.json())
      .then((data) => {
        setSlider(data);
      })
      .finally(() => {
        setSliderLoading(false);
      });
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setCategories(data.data);
        }
      })
      .finally(() => {
        setCategoryLoading(false);
      });
  }, []);
  return (
    <div className="e-commerce-page">
      <div className="hero-section common-width">
        <HeroSlider slider={slider} sliderLoading={sliderLoading} />
      </div>
      <div className="categories common-width">
        <CategoriesSlider
          categories={categories}
          categoryLoading={categoryLoading}
        />
        <CategoriesSlider
          categories={[...categories].reverse()}
          categoryLoading={categoryLoading}
        />
      </div>
    </div>
  );
};

export default Index;
