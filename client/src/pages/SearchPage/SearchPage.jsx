import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { useSearchFoodsQuery } from "../../redux/services/foodsApi";

export default function SearchPage() {
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

  if (restaurantLoading || foodLoading) {
    return <p>Loading...</p>;
  }

  if (restaurantError || foodError) {
    return <p>Error: {restaurantError || foodError}</p>;
  }

  if (
    (!restaurantResults || restaurantResults.length === 0) &&
    (!foodResults || foodResults.length === 0)
  ) {
    return <p>No results found</p>;
  }

  return (
    <div className="search-page-container">
      {restaurantResults && restaurantResults.length > 0 && (
        <div>
          <h1>Search Results for Restaurants: {searchString}</h1>
          <ul>
            {restaurantResults.map((restaurant, index) => (
              <li key={index}>{restaurant.name}</li>
            ))}
          </ul>
        </div>
      )}

      {foodResults && foodResults.length > 0 && (
        <div>
          <h1>Search Results for Foods: {searchString}</h1>
          <ul>
            {foodResults.map((food, index) => (
              <li key={index}>{food.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
