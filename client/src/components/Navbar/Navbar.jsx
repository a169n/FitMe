import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import bag from "../../assets/bag.svg";
import search from "../../assets/search.svg";
import { useLazySearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";

export default function Navbar() {
  const [searchString, setSearchString] = useState("");
  const dispatch = useDispatch();
  const user = useUser();

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

  const handleSignOut = () => {
    dispatch(logoutUser());
    window.location.reload();
  };

  return (
    <nav className="nav global-padding">
      <Link className="link" to={"/"}>
        <div className="main-logo">
          <img src={logo} alt="logo" />
          <h4 className="nav-header">FitMe</h4>
        </div>
      </Link>
      <div className="nav2">
        <div>
          <input
            className="nav-input"
            type="text"
            placeholder="Enter item or restaurant you are looking for"
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
          {user ? (
            <button className="sign-in-button" onClick={handleSignOut}>
              Log out ({user.username})
            </button>
          ) : (
            <Link className="link" to={"/login"}>
              <button className="sign-in-button">Sign in</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
