import React, { useState } from "react";
import "./CategoryDeleteForm.css";
import {
  useDeleteFoodByIdMutation,
  useGetCategoriesQuery,
} from "../../redux/services/categoriesApi";
import { useGetRestaurantsQuery } from "../../redux/services/restaurantsApi";

function CategoryDeleteForm() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery(selectedRestaurant);

  const {
    data: restaurants,
    error: restaurantsError,
    isLoading: restaurantsLoading,
  } = useGetRestaurantsQuery();

  const [deleteCategoryById] = useDeleteFoodByIdMutation();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteCategoryById(selectedCategory).unwrap();
      setDeleteSuccess(true);
      setIsLoading(false);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    } catch (error) {
      setDeleteError("Failed to delete category. Please try again.");
      setIsLoading(false);
      setTimeout(() => setDeleteError(""), 3000);
    }
  };

  return (
    <div className="category-delete-form">
      <h2 className="form-title">Delete Category</h2>
      <div className="form-group">
        <label htmlFor="restaurant" className="form-label">
          Select Restaurant:
        </label>
        <select
          id="restaurant"
          value={selectedRestaurant}
          onChange={(e) => setSelectedRestaurant(e.target.value)}
          className="form-select"
        >
          <option value="">Select Restaurant</option>
          {restaurantsLoading ? (
            <option value="" disabled>
              Loading...
            </option>
          ) : restaurantsError ? (
            <option value="" disabled>
              Error fetching restaurants
            </option>
          ) : (
            restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))
          )}
        </select>
      </div>
      {selectedRestaurant && (
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Select Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select"
          >
            <option value="">Select Category</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
      )}
      {selectedCategory && (
        <>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="form-button delete-button"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          {deleteSuccess && (
            <p className="form-success">Category deleted successfully!</p>
          )}
          {deleteError && <p className="form-error">{deleteError}</p>}
        </>
      )}
    </div>
  );
}

export default CategoryDeleteForm;
