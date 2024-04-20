import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="admin-sidebar">
      <button
        className="admin-menu-button"
        onClick={() => {
          navigate("/admin");
        }}>
        Admin Menu
      </button>
      <ul className="sidebar-menu">
        <li
          className={
            location.pathname === "/admin/restaurants" ? "selected" : ""
          }>
          <Link
            to="/admin/restaurants"
            onClick={() => setSelectedItem("restaurants")}>
            Restaurants
          </Link>
        </li>
        <li
          className={
            location.pathname === "/admin/categories" ? "selected" : ""
          }>
          <Link
            to="/admin/categories"
            onClick={() => setSelectedItem("categories")}>
            Categories
          </Link>
        </li>
        <li className={location.pathname === "/admin/dishes" ? "selected" : ""}>
          <Link to="/admin/dishes" onClick={() => setSelectedItem("dishes")}>
            Dishes
          </Link>
        </li>
        <li className={location.pathname === "/admin/orders" ? "selected" : ""}>
          <Link to="/admin/orders" onClick={() => setSelectedItem("orders")}>
            Orders
          </Link>
        </li>
        <li className={location.pathname === "/admin/users" ? "selected" : ""}>
          <Link to="/admin/users" onClick={() => setSelectedItem("users")}>
            Users
          </Link>
        </li>
        <li
          className={
            location.pathname === "/admin/global-categories" ? "selected" : ""
          }>
          <Link
            to="/admin/global-categories"
            onClick={() => setSelectedItem("global-categories")}>
            Global Categories
          </Link>
        </li>
      </ul>
      <button
        className="return-button"
        onClick={() => {
          setSelectedItem("");
          navigate("/");
        }}>
        Return Home
      </button>
    </div>
  );
};
