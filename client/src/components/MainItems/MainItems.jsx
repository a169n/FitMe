import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useSearchFoodsQuery } from "../../redux/services/foodsApi";
import greenStar from "../../assets/greenStar.svg";
import yellowStar from "../../assets/yellowStar.svg";
import regionIcon from "../../assets/region.svg";
import peopleIcon from "../../assets/people.svg";
import priceIcon from "../../assets/price.svg";
import "./MainItems.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function MainItems() {
  const {
    data: restaurantsData,
    isLoading: restaurantsIsLoading,
    isFetching: restaurantsIsFetching,
  } = useSearchRestaurantsQuery("");

  const {
    data: foodsData,
    isLoading: foodsIsLoading,
    isFetching: foodsIsFetching,
  } = useSearchFoodsQuery("");

  if (
    restaurantsIsLoading ||
    restaurantsIsFetching ||
    foodsIsLoading ||
    foodsIsFetching
  ) {
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="hero-section global-padding">
      <div className="restaurants">
        <p className="hero-section-header">Nearby Restaurants</p>
        <div className="hero-section-container">
          {restaurantsData.data.slice(0, 4).map((restaurant) => (
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
                    <div>
                      <img
                        src={restaurant.rating >= 4 ? greenStar : yellowStar}
                        alt={
                          restaurant.rating >= 4 ? "green-star" : "yellow-star"
                        }
                      />
                    </div>
                    <div className="restaurant-rating">
                      {restaurant.rating.toFixed(2)}
                    </div>
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
      <div className="foods">
        <p className="hero-section-header">Popular Foods</p>
        <div className="hero-section-container">
          {foodsData.data.slice(0, 4).map((food) => (
            <div className="hero-section-card" key={food._id}>
              <Link className="link" to={`/restaurant/${food.restaurant._id}`}>
                <img
                  className="restaurant-image"
                  src={`http://localhost:3000/${food.image}`}
                  alt={`food-image-${food._id}`}
                />
                <h3 className="card-header">{food.name}</h3>
                <div className="card-info">
                  <p className="card-keyword">{food.type}</p>
                  <div className="card-rating">
                    <img src={priceIcon} alt="price" />
                    <div className="restaurant-rating">{food.price}</div>
                  </div>
                </div>
                <div className="card-region-container">
                  <img src={peopleIcon} alt="people" />
                  <p className="card-region">{food.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
