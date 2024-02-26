import React, { useState } from "react";
import "./FoodDeleteForm.css";
import {
  useDeleteFoodByIdMutation,
  useGetFoodsQuery,
} from "../../redux/services/foodsApi";

function FoodDeleteForm() {
  const [selectedFood, setSelectedFood] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const {
    data: foods,
    error: foodsError,
    isLoading: foodsLoading,
  } = useGetFoodsQuery();

  const [deleteFoodById] = useDeleteFoodByIdMutation();

  const handleDelete = async () => {
    if (!selectedFood) return; // If no food is selected, do nothing

    try {
      setIsLoading(true);
      await deleteFoodById(selectedFood).unwrap();
      setDeleteSuccess(true);
      setIsLoading(false);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    } catch (error) {
      setDeleteError("Failed to delete food. Please try again.");
      setIsLoading(false);
      setTimeout(() => setDeleteError(""), 3000);
    }
  };

  return (
    <div className="category-delete-form">
      <h2 className="form-title">Delete Food</h2>
      <div className="form-group">
        <label htmlFor="food" className="form-label">
          Select Food:
        </label>
        <select
          id="food"
          value={selectedFood}
          onChange={(e) => setSelectedFood(e.target.value)}
          className="form-select"
        >
          <option value="">Select Food</option>
          {foodsLoading ? (
            <option value="" disabled>
              Loading...
            </option>
          ) : foodsError ? (
            <option value="" disabled>
              Error fetching foods
            </option>
          ) : (
            foods.map((food) => (
              <option key={food._id} value={food._id}>
                {food.name}
              </option>
            ))
          )}
        </select>
      </div>
      {selectedFood && (
        <div className="button-container">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="form-button"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          {deleteSuccess && (
            <p className="form-success">Food deleted successfully!</p>
          )}
          {deleteError && <p className="form-error">{deleteError}</p>}
        </div>
      )}
    </div>
  );
}

export default FoodDeleteForm;
