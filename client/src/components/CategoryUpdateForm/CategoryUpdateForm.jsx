import React, { useState, useEffect } from "react";
import "./CategoryUpdateForm.css";
import { useUpdateCategoryByIdMutation } from "../../redux/services/categoriesApi";
import { useGetRestaurantsQuery } from "../../redux/services/restaurantsApi";

function CategoryUpdateForm() {
  const [categoryName, setCategoryName] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const {
    data: restaurants,
    error: restaurantsError,
    isLoading: restaurantsLoading,
  } = useGetRestaurantsQuery();
  const [updateCategory] = useUpdateCategoryByIdMutation();

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const updatedCategory = await updateCategory({
        id: selectedCategory,
        name: categoryName,
      }).unwrap();
      setUpdateSuccess(true);
      setIsLoading(false);
      setTimeout(() => setUpdateSuccess(false), 3000);
      setTimeout(() => window.location.reload(), 3000);
      setSelectedCategory("");
      setCategoryName("");
    } catch (error) {
      setUpdateError("Failed to update category. Please try again.");
      setIsLoading(false);
      setTimeout(() => setUpdateError(""), 3000);
    }
  };

  const handleRestaurantChange = (e) => {
    setSelectedRestaurant(e.target.value);
    setSelectedCategory("");
  };

  useEffect(() => {
    if (selectedCategory) {
      const category = restaurants
        .flatMap((restaurant) => restaurant.categories)
        .find((cat) => cat._id === selectedCategory);
      if (category) {
        setCategoryName(category.name);
      }
    }
  }, [selectedCategory, restaurants]);

  if (restaurantsLoading) return <p>Loading...</p>;
  if (restaurantsError) return <p>Error: {restaurantsError.message}</p>;

  return (
    <div className="category-update-form">
      <h2 className="form-title">Update Category Name</h2>
      <div className="form-group">
        <label htmlFor="restaurant" className="form-label">
          Select Restaurant:
        </label>
        <select
          id="restaurant"
          value={selectedRestaurant}
          onChange={handleRestaurantChange}
          className="form-select"
        >
          <option value="">Select Restaurant</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant._id} value={restaurant._id}>
              {restaurant.name}
            </option>
          ))}
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
            {restaurants
              .find((r) => r._id === selectedRestaurant)
              ?.categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
      )}
      {selectedCategory && (
        <div className="form-group">
          <label htmlFor="categoryName" className="form-label">
            Category Name:
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-input"
          />
        </div>
      )}
      {selectedCategory && (
        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="form-button"
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      )}
      {updateSuccess && (
        <p className="form-success">Category updated successfully!</p>
      )}
      {updateError && <p className="form-error">{updateError}</p>}
    </div>
  );
}

export default CategoryUpdateForm;
