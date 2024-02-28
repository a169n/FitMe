import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { useSearchFoodsQuery } from "../../redux/services/foodsApi";
import { useSearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import restaurant_image from "../../assets/restaurant-icon.png";
import greenStar from "../../assets/greenStar.svg";
import yellowStar from "../../assets/yellowStar.svg";
import regionIcon from "../../assets/region.svg";
import peopleIcon from "../../assets/people.svg";
import priceIcon from "../../assets/price.svg";
import "./Restaurants.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Restaurants() {
  const { t } = useTranslation();

  const {
    data: restaurantsData,
    isLoading: restaurantsIsLoading,
    isFetching: restaurantsIsFetching,
    isError: restaurantsIsError,
  } = useSearchRestaurantsQuery("");

  const {
    data: foodsData,
    isLoading: foodsIsLoading,
    isFetching: foodsIsFetching,
    isError: foodsIsError,
  } = useSearchFoodsQuery("");

  if (
    restaurantsIsLoading ||
    restaurantsIsFetching ||
    foodsIsLoading ||
    foodsIsFetching
  ) {
    return <h1 className="loading">{t("loading")}</h1>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="hero-section global-padding">
      <div className="restaurants">
        <p className="hero-section-header">{t("nearbyRestaurants")}</p>
        <div className="hero-section-container">
          {restaurantsData.slice(0, 4).map((restaurant) => (
            <div className="hero-section-card" key={restaurant._id}>
              <Link className="link" to={`/restaurant/${restaurant._id}`}>
                <Slider {...sliderSettings}>
                  {restaurant.images.map((image, index) => (
                    <img
                      key={index}
                      className="restaurant-image"
                      src={`http://localhost:3000/${image}`}
                      alt={`restaurant-image-${index}`}
                    />
                  ))}
                </Slider>
                <h3 className="card-header">{restaurant.name}</h3>
                <div className="card-info">
                  <p className="card-keyword">
                    {restaurant.keywords.join(", ")}
                  </p>
                  <div className="card-rating">
                    <img
                      src={restaurant.rating >= 4 ? greenStar : yellowStar}
                      alt={
                        restaurant.rating >= 4 ? "green-star" : "yellow-star"
                      }
                    />
                    <div className="restaurant-rating">{restaurant.rating}</div>
                  </div>
                </div>
                <div className="card-region-container">
                  <img src={regionIcon} alt="region" />
                  <p className="card-region">{restaurant.region}</p>
                </div>
                <div className="card-region-container">
                  <img src={peopleIcon} alt="people" />
                  <p className="card-region">{restaurant.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
