import React, { useState } from "react";
import "./Search.css";
import searchIcon from "../../assets/randomize.svg";
import { useLazySearchRestaurantsQuery } from "../../redux/services/restaurantsApi";

export default function Search() {
  const [searchString, setSearchString] = useState("");
  const [searchRestaurants] = useLazySearchRestaurantsQuery();

  const handleSearch = async () => {
    try {
      const response = await searchRestaurants(searchString);
      console.log("Search response:", response);
    } catch (error) {
      console.error("Error searching restaurants:", error);
      alert("Failed to search restaurants. Please try again later.");
    }
  };

  return (
    <div className="search-section">
      <h2>Search by Restaurant</h2>
      <img src={searchIcon} alt="search icon" />
      <input
        type="text"
        placeholder="Enter item or restaurant you are looking for"
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
      />
      <button onClick={handleSearch}>Search Now</button>
    </div>
  );
}
