import React from "react";
import "./Categories.css";
import { useTranslation } from "react-i18next";
import { useGetGlobalCategoriesQuery } from "../../redux/services/globalCategoriesApi";
import CategoryCard from "../CategoryCard/index";
import Slider from "react-slick";

export default function Categories() {
  const { t } = useTranslation();
  const {
    data: globalCategoriesData,
    isLoading: categoriesIsLoading,
    isFetching: categoriesIsFetching,
  } = useGetGlobalCategoriesQuery();

  if (categoriesIsFetching || categoriesIsLoading) {
    return <h1 className="loading">Loading...</h1>;
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1,
    speed: 8000,
    arrows: false,
  };

  return (
    <div className="categories-container">
      <h2 className="categories-header global-padding">
        {t("whatsOnYourMind")}
      </h2>

      <div className="categories-slider">
        <Slider {...sliderSettings}>
          {globalCategoriesData.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
