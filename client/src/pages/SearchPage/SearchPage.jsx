import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { useSearchFoodsQuery } from "../../redux/services/foodsApi";
import { useTranslation } from "react-i18next";
import "./SearchPage.css";
import DishesSearchPage from "../DishesSearchPage";
import RestaurantsSearchPage from "../RestaurantsSearchPage";

export default function SearchPage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [searchString, setSearchString] = useState(params.get("searchString"));
  const [showDishes, setShowDishes] = useState(true);


  const {
    data: restaurantResults,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = useSearchRestaurantsQuery({
    searchString: params.get("searchString"),
    page: params.get("page"),
  });

  const {
    data: foodResults,
    isLoading: foodLoading,
    error: foodError,
  } = useSearchFoodsQuery({
    searchString: params.get("searchString"),
    page: params.get("page"),
  });

  if (restaurantLoading || foodLoading) {
    return <p className="global-padding">{t("loading")}</p>;
  }

  if (restaurantError || foodError) {
    return (
      <p className="global-padding">
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

  const handleShowDishes = () => {
    setShowDishes(true);
  };

  const handleShowRestaurants = () => {
    setShowDishes(false);
  };

  return (
    <div className="search-page-container global-padding">
      <h4 className="search-page-header">
        {t("searchResults")} "{searchString}"
      </h4>

      <div className="buttons-container">
        <button
          className={`search-result-button ${showDishes ? "active" : ""}`}
          onClick={handleShowDishes}
        >
          Dishes
        </button>
        <button
          className={`search-result-button ${!showDishes ? "active" : ""}`}
          onClick={handleShowRestaurants}
        >
          Restaurants
        </button>
      </div>

      <div className="searched-items">
        {showDishes && foodResults && foodResults.data.length > 0 && (
          <DishesSearchPage
            foodResults={foodResults}
            searchString={searchString}
          />
        )}
        {!showDishes &&
          restaurantResults &&
          restaurantResults.data.length > 0 && (
            <RestaurantsSearchPage
              restaurantResults={restaurantResults}
              searchString={searchString}
            />
          )}
      </div>
    </div>
  );
}
