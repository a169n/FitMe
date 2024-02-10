import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import bag from "../../assets/bag.svg";
import search from "../../assets/search.svg";

export default function Navbar() {
  return (
    <nav className="nav global-padding">
      <div className="main-logo">
        <img src={logo} alt="logo" />
        <h4 className="nav-header">FitMe</h4>
      </div>
      <div className="nav2">
        <div>
          <input
              className="nav-input"
              type="text"
              placeholder="Enter item or restaurant you are looking for"
            />
        </div>
        <div className="search-container">
          <button className="search-button">
            <img src={search} alt="search" />
          </button>
        </div>
        <div className="card-container">
          <button className="card-button">
            <img src={bag} alt="card" />
          </button>
        </div>
        <div className="login-container">
          <button className="sign-in-button">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}
