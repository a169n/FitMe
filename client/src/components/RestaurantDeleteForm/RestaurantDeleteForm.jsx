import React, { useState } from "react";
import "./RestaurantDeleteForm.css";
import { useDeleteRestaurantByIdMutation, useGetRestaurantsQuery } from "../../redux/services/restaurantsApi";


function RestaurantDeleteForm() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const {
    data: restaurants,
    error: restaurantsError,
    isLoading: restaurantsLoading,
  } = useGetRestaurantsQuery();

  const [deleteRestaurantById] = useDeleteRestaurantByIdMutation();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteRestaurantById(selectedRestaurant).unwrap();
      setDeleteSuccess(true);
      setIsLoading(false);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    } catch (error) {
      setDeleteError("Failed to delete restaurant. Please try again.");
      setIsLoading(false);
      setTimeout(() => setDeleteError(""), 3000);
    }
  };

  return (
    <div className="restaurant-delete-form">
      <h2 className="form-title">Delete Restaurant</h2>
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
        <>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="form-button delete-button"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          {deleteSuccess && (
            <p className="form-success">Restaurant deleted successfully!</p>
          )}
          {deleteError && <p className="form-error">{deleteError}</p>}
        </>
      )}
    </div>
  );
}

export default RestaurantDeleteForm;
