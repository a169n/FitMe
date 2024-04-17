import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import bag from "../../assets/bag.svg";
import search from "../../assets/search.svg";
import { useLazySearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const dispatch = useDispatch();
  const user = useUser();

  const [searchRestaurants] = useLazySearchRestaurantsQuery();

  const handleSearch = async () => {
    try {
      await searchRestaurants(searchString);
      navigate(`/search?searchString=${searchString || ""}&page=1`);
    } catch (error) {
      console.error("Error searching restaurants:", error);
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
      <Link className="link" to={"/socket"}>
        <button className="api-button">Socket</button>
      </Link>

      <div className="nav2">
        <div>
          <input
            className="nav-input"
            type="text"
            placeholder="Search..."
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
          <Link className="link" to={"/profile"}>
            <button className="card-button">
              <img src={bag} alt="card" />
            </button>
          </Link>
        </div>

        <div className="admin-page-container">
          {user ? (
            <>
              {user.isAdmin && (
                <Link className="link" to={"/admin"}>
                  <button className="api-button">Admin Page</button>
                </Link>
              )}
              <button className="sign-in-button" onClick={handleSignOut}>
                Log Out ({user.username})
              </button>
            </>
          ) : (
            <Link className="link" to={"/login"}>
              <button className="sign-in-button">Sign In</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
