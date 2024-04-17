import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import "./SearchPage.css";
import SearchedRestaurants from "../SearchedRestaurants";

export default function RestaurantSearchPage() {
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

  if (restaurantLoading) {
    return <p className="global-padding">Loading...</p>;
  }

  if (restaurantError) {
    return <p className="global-padding">Error: {restaurantError}</p>;
  }

  if (!restaurantResults || restaurantResults.length === 0) {
    return <p className="global-padding">No results found.</p>;
  }

  return (
    <div className="search-page-container global-padding">
      <h4 className="search-page-header">Searched Restaurant Results: "{searchString}"</h4>

      <div className="searched-items">
        {restaurantResults && restaurantResults.data.length > 0 && (
          <SearchedRestaurants
            restaurantResults={restaurantResults}
            searchString={searchString}
          />
        )}
      </div>
    </div>
  );
}
