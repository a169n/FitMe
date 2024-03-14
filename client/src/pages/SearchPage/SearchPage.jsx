import React, { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useSearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { useSearchFoodsQuery } from "../../redux/services/foodsApi";
import { useTranslation } from "react-i18next";
import "./SearchPage.css";
import price from "../../assets/price.svg";
import region from "../../assets/region.svg";
import Pagination from "../../components/Pagination/Pagination";

export default function SearchPage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [searchString, setSearchString] = useState(params.get("searchString"));

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
        {showDishes && foodResults && foodResults.data.length > 0 && (
          <div>
            <div className="item-container">
              {foodResults.data.map((food, index) => (
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
                      <p className="global-category">Global Category Here</p>
                      <div className="price">
                        <img src={price} />
                        <p>₹{food.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Pagination
              isSearch
              searchString={searchString}
              totalPages={foodResults?.totalPages}
            />
          </div>
        )}
        {showRestaurants &&
          restaurantResults &&
          restaurantResults.data.length > 0 && (
            <div>
              <div className="item-container">
                {restaurantResults.data.map((restaurant, index) => (
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
              <Pagination
                isSearch
                searchString={searchString}
                totalPages={restaurantResults?.totalPages}
              />
            </div>
          )}
      </div>
    </div>
  );
}
