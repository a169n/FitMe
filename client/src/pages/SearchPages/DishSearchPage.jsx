import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./SearchPage.css";
import { useSearchFoodsQuery } from "../../redux/services/foodsApi";
import SearchedDishes from "../SearchedDishes";

export default function DishSearchPage() {
  const [params] = useSearchParams();
  const [searchString, setSearchString] = useState(params.get("searchString"));

  const {
    data: dishResults,
    isLoading: dishLoading,
    error: dishError,
  } = useSearchFoodsQuery({
    searchString: params.get("searchString"),
    page: params.get("page"),
  });

  if (dishLoading) {
    return <p className="global-padding">Loading...</p>;
  }

  if (dishError) {
    return <p className="global-padding">Error: {dishError}</p>;
  }

  if (!dishResults || dishResults.length === 0) {
    return <p className="global-padding">No results found.</p>;
  }

  return (
    <div className="search-page-container global-padding">
      <h4 className="search-page-header">
        Searched Dish Results: "{searchString}"
      </h4>

      <div className="searched-items">
        {dishResults && dishResults.data.length > 0 && (
          <SearchedDishes
            foodResults={dishResults}
            searchString={searchString}
          />
        )}
      </div>
    </div>
  );
}
