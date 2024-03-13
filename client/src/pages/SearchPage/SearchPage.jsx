import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import {
  useGetFoodsByCategoryIdQuery,
  useSearchFoodsQuery,
} from "../../redux/services/foodsApi";
import { useTranslation } from "react-i18next";
import "./SearchPage.css";
import price from "../../assets/price.svg";
import region from "../../assets/region.svg";
import { useGetCategoryByIdQuery } from "../../redux/services/categoriesApi";

export default function SearchPage() {
  const { t } = useTranslation();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchString = queryParams.get("searchString");

  const {
    data: restaurantResults,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = useSearchRestaurantsQuery(searchString);

  const {
    data: foodResults,
    isLoading: foodLoading,
    error: foodError,
  } = useSearchFoodsQuery(searchString);

  function getCategoryNameById(categoryId) {
    const {
      data: category,
      isLoading,
      error,
    } = useGetCategoryByIdQuery(categoryId);
    return category;
  }

  const [showDishes, setShowDishes] = useState(true);
  const [showRestaurants, setShowRestaurants] = useState(false);

  const handleShowDishes = () => {
    setShowDishes(true);
    setShowRestaurants(false);
  };

  const handleShowRestaurants = () => {
    setShowRestaurants(true);
    setShowDishes(false);
  };

  if (restaurantLoading || foodLoading) {
    return <p>{t("loading")}</p>;
  }

  if (restaurantError || foodError) {
    return (
      <p>
        {t("error")}: {restaurantError || foodError}
      </p>
    );
  }

  if (
    (!restaurantResults || restaurantResults.length === 0) &&
    (!foodResults || foodResults.length === 0)
  ) {
    return <p className="global-padding">{t("noResultsFound")}</p>;
  }

  return (
    <div className="search-page-container global-padding">
      <h4 className="search-page-header">
        Search Results for "{searchString}"
      </h4>

      <div className="buttons-container">
        <button
          className={`search-result-button ${showDishes ? "active" : ""}`}
          onClick={handleShowDishes}
        >
          Dishes
        </button>
        <button
          className={`search-result-button ${showRestaurants ? "active" : ""}`}
          onClick={handleShowRestaurants}
        >
          Restaurants
        </button>
      </div>

      <div className="searched-items">
        {showDishes && foodResults && foodResults.length > 0 && (
          <div className="item-container">
            {foodResults.map((food, index) => (
              <Link
                className="link"
                to={`/restaurant/${food.restaurant}`}
                key={index}
              >
                <div className="item">
                  <img
                    className="item-image"
                    src={`http://localhost:3000/${food.image}`}
                    alt="item-image"
                  />
                  <div>
                    <p className="name">{food.name}</p>
                    <p className="global-category">{food.category}</p>
                    <div className="price">
                      <img src={price} />
                      <p>₹{food.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {showRestaurants &&
          restaurantResults &&
          restaurantResults.length > 0 && (
            <div className="item-container">
              {restaurantResults.map((restaurant, index) => (
                <Link
                  className="link"
                  to={`/restaurant/${restaurant._id}`}
                  key={index}
                >
                  <div className="item">
                    <img
                      className="item-image"
                      src={`http://localhost:3000/${restaurant.images[0]}`}
                      alt="item-image"
                    />
                    <div>
                      <p className="name">{restaurant.name}</p>
                      <div>
                        {restaurant.keywords.map((keyword, index) => (
                          <p key={index} className="global-category">
                            {keyword}
                            {index !== restaurant.keywords.length - 1
                              ? ", "
                              : ""}
                          </p>
                        ))}
                      </div>
                      <div className="price">
                        <img src={region} />
                        <p>{restaurant.region}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
