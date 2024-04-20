import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCategoryByIdMutation,
  useGetCategoriesQuery,
} from "../../../redux/services/categoriesApi";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Categories.css";
import { CreateCategoryModal } from "../../AdminModals/CreateCategoryModal";

export const AdminCategories = () => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [deleteCategoryById] = useDeleteCategoryByIdMutation();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategoryById(id);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-items category-card">
        {categories?.map((category) => (
          <Link className="link" to={`/restaurant/${category?.restaurant}`}>
            <div key={category?._id} className="category-item">
              <button
                onClick={() => handleDeleteCategory(category?._id)}
                className="category-delete-button">
                X
              </button>
              <h3>{category?.name}</h3>
              <p>Restaurant ID: {category?.restaurant}</p>
              <p>Number of Foods: {category?.foods?.length}</p>
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={() => setShowCreateModal(true)}
        className="admin-create-button">
        +
      </button>
      {showCreateModal && (
        <CreateCategoryModal onClose={() => setShowCreateModal(false)} />
      )}{" "}
    </div>
  );
};

export default AdminCategories;
