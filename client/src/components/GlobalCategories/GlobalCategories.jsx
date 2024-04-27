import React from "react";
import "./GlobalCategories.css";
import { useGetGlobalCategoriesQuery } from "../../redux/services/globalCategoriesApi";
import CategoryCard from "../CategoryCard/index";
import Slider from "react-slick";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Link } from "react-router-dom";

export default function GlobalCategories() {
  const {
    data: globalCategoriesData,
    isLoading: categoriesIsLoading,
    isFetching: categoriesIsFetching,
  } = useGetGlobalCategoriesQuery();

  if (categoriesIsFetching || categoriesIsLoading) {
    return (
      <PropagateLoader
        cssOverride={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "50px 0",
        }}
        size={20}
      />
    );
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
      <h2 className="categories-header global-padding">What's on your mind?</h2>

      <div className="categories-slider">
        <Slider {...sliderSettings}>
          {globalCategoriesData.map((category) => (
            <Link className="link"
              to={`/dishes/search?searchString=${category.name || ""}&page=1`}>
              <CategoryCard key={category._id} category={category} />
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}
