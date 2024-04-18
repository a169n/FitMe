import React from "react";
import { Sidebar } from "./Sidebar";
import "./AdminComponents.css"; 

export const Categories = () => {
  return (
    <div className="admin-container adminCategories">
      <Sidebar />
      <h1>Categories</h1>
    </div>
  );
};
