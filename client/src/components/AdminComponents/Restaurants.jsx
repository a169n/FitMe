import React from "react";
import { Sidebar } from "./Sidebar";
import "./AdminComponents.css"

export const Restaurants = () => {
  return (
    <div className="admin-container adminGlobalCategories">
      <Sidebar />
      <h1>Restaurants</h1>
    </div>
  );
};
