import React, { useState } from "react";
import "./Search.css";
import searchIcon from "../../assets/randomize.svg";
import { useNavigate } from "react-router-dom";
import { useLazySearchFoodsQuery } from "../../redux/services/foodsApi";

export default function Search() {
  const [searchString, setSearchString] = useState("");
  const [searchDishes] = useLazySearchFoodsQuery();
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      await searchDishes(searchString);
      navigate(`/dishes/search?searchString=${searchString || ""}&page=1`);
    } catch (error) {
      console.error("Error searching restaurants:", error);
      alert("Failed to search restaurants. Please try again later.");
    }
  };

  return (
    <div className="search-section">
      <h2>Search by Dish</h2>
      <img src={searchIcon} alt="search icon" />
      <input
        type="text"
        placeholder="Enter dish that you are looking for..."
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
      />
      <button onClick={handleSearch}>Search Now</button>
    </div>
  );
}
