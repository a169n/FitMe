import React, { useState } from "react";
import "./Search.css";
import searchIcon from "../../assets/randomize.svg";
import { useLazySearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchString, setSearchString] = useState("");
  const [searchRestaurants] = useLazySearchRestaurantsQuery();
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      await searchRestaurants(searchString);
      navigate(`/search?searchString=${searchString || ""}&page=1`);
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
