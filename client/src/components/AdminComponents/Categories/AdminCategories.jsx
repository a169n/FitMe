import React from "react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../redux/services/categoriesApi";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Categories.css";

export const AdminCategories = () => {
  const { data: categories, error, loading } = useGetCategoriesQuery();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-items">
        <h2>Categories</h2>
      </div>
    </div>
  );
};

export default AdminCategories;
