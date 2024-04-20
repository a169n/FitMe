import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Dishes.css";

export const AdminDishes = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-items">
        <h1>Dishes</h1>
      </div>
    </div>
  );
};
