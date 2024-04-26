import React, { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import "./GlobalCategories.css";
import {
  useDeleteGlobalCategoryByIdMutation,
  useGetGlobalCategoriesQuery,
} from "../../../redux/services/globalCategoriesApi";
import SyncLoader from "react-spinners/SyncLoader";
import CreateGlobalModal from "../../AdminModals/GlobalCategories/CreateGlobalModal";
import UpdateGlobalModal from "../../AdminModals/GlobalCategories/UpdateGlobalModal";

export const AdminGlobalCategories = () => {
  const {
    data: globalCategories,
    error,
    isLoading,
  } = useGetGlobalCategoriesQuery();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteGlobalCategoryById] = useDeleteGlobalCategoryByIdMutation();

  const handleDeleteCategory = (id) => {
    if (
      window.confirm("Are you sure you want to delete this global category?")
    ) {
      deleteGlobalCategoryById(id);
    }
  };

  const handleUpdateClick = (category) => {
    setSelectedCategory(category);
    setShowUpdateModal(true);
  };

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-items global-category-card">
        {globalCategories.map((category) => (
          <div className="global-category-item" key={category._id}>
            <img
              className="restaurant-image"
              src={`http://localhost:3000/${category.image}`}
              alt={`category-image-${category._id}`}
            />
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button
              onClick={() => handleDeleteCategory(category._id)}
              className="admin-delete-button">
              X
            </button>
            <button
              onClick={() => handleUpdateClick(category)}
              className="update-button">
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
        <CreateGlobalModal onClose={() => setShowCreateModal(false)} />
      )}
      {showUpdateModal && (
        <UpdateGlobalModal
          onClose={() => setShowUpdateModal(false)}
          category={selectedCategory}
        />
      )}
    </div>
  );
};

export default AdminGlobalCategories;
