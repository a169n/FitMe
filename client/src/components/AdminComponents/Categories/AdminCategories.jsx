import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCategoryByIdMutation,
  useGetCategoriesQuery,
} from "../../../redux/services/categoriesApi";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Categories.css";
import "../style.css";
import { CreateCategoryModal } from "../../AdminModals/Categories/CreateCategoryModal";
import UpdateCategoryModal from "../../AdminModals/Categories/UpdateCategoryModal";
import SyncLoader from "react-spinners/SyncLoader";
import { useGetRestaurantByIdQuery } from "../../../redux/services/restaurantsApi";

export const AdminCategories = () => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [deleteCategoryById] = useDeleteCategoryByIdMutation();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  console.log(categories)

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategoryById(id);
    }
  };

  const handleUpdateClick = (category) => {
    setSelectedCategory(category);
    setShowUpdateModal(true);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return (
      <SyncLoader
        cssOverride={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "50px 0",
        }}
        size={20}
      />
    );
  }

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-items category-card">
        {categories?.map((category) => (
          <div key={category?._id} className="category-item">
            <button
              onClick={() => handleDeleteCategory(category?._id)}
              className="admin-delete-button">
              X
            </button>
            <h3>{category?.name}</h3>
            {/* <p>Restaurant ID: {category?.restaurant.name}</p> */}
            <p>Number of Foods: {category?.foods?.length}</p>
            <button
              className="update-button"
              onClick={() => handleUpdateClick(category)}>
              Update
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowCreateModal(true)}
        className="admin-create-button">
        <span className="plus-sign">+</span>
      </button>
      {showCreateModal && (
        <CreateCategoryModal onClose={() => setShowCreateModal(false)} />
      )}
      {showUpdateModal && (
        <UpdateCategoryModal
          onClose={() => setShowUpdateModal(false)}
          category={selectedCategory}
        />
      )}
    </div>
  );
};

export default AdminCategories;
