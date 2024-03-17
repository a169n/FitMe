import React, { useState } from "react";
import "./Search.css";
import searchIcon from "../../assets/randomize.svg";
import { useTranslation } from "react-i18next";
import { useLazySearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const { t } = useTranslation();
  const [searchString, setSearchString] = useState("");
  const [searchRestaurants] = useLazySearchRestaurantsQuery();

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await searchRestaurants(searchString);
      navigate(`/search?searchString=${searchString || ""}&page=1`);

      console.log("Search response:", response);
    } catch (error) {
      console.error("Error searching restaurants:", error);
      alert(t("failedToSearchRestaurants"));
    }
  };

  return (
    <div className="search-section">
      <h2>{t("searchByRestaurant")}</h2>
      <img src={searchIcon} alt="search icon" />
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
      />
      <button onClick={handleSearch}>{t("searchNow")}</button>
    </div>
  );
}
