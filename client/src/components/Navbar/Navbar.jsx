import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import bag from "../../assets/bag.svg";
import search from "../../assets/search.svg";
import { useTranslation } from "react-i18next";
import { useLazySearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import i18n from "../../../i18n";

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const dispatch = useDispatch();
  const user = useUser();

  const [searchRestaurants] = useLazySearchRestaurantsQuery();

  const handleSearch = async () => {
    try {
      const response = await searchRestaurants(searchString);
      navigate(`/search?searchString=${searchString || ""}&page=1`);
    } catch (error) {
      console.error("Error searching restaurants:", error);
      alert(t("failedToSearchRestaurants"));
    }
  };

  const handleSignOut = () => {
    dispatch(logoutUser());
    window.location.reload();
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      document.documentElement.lang = lng;
    });
  };

  return (
    <nav className="nav global-padding">
      <Link className="link" to={"/"}>
        <div className="main-logo">
          <img src={logo} alt="logo" />
          <h4 className="nav-header">FitMe</h4>
        </div>
      </Link>
      <Link className="link" to={"/api"}><button className="api-button">APIs</button></Link>
      <Link className="link" to={"/socket"}><button className="api-button">Socket</button></Link>

      <div className="nav2">
        <div>
          <input
            className="nav-input"
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchString}
            onChange={(event) => setSearchString(event.target.value)}
          />
        </div>
        <div className="search-container">
          <button className="search-button" onClick={handleSearch}>
            <img src={search} alt="search" />
          </button>
        </div>
        <div className="card-container">
          <button className="card-button">
            <img src={bag} alt="card" />
          </button>
        </div>
        <div>
          <select
            className="language-select"
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="kz">Қазақша</option>
          </select>
        </div>
        <div>
          {user ? (
            <button className="sign-in-button" onClick={handleSignOut}>
              {t("logOut", { username: user.username })}{" "}
            </button>
          ) : (
            <Link className="link" to={"/login"}>
              <button className="sign-in-button">{t("signIn")}</button>{" "}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
