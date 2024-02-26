import React, { useState, useEffect } from "react";
import { useGetRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { useUpdateRestaurantByIdMutation } from "../../redux/services/restaurantsApi";
import "./RestaurantUpdateForm.css";

function RestaurantUpdateForm() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [restaurantData, setRestaurantData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const {
    data: restaurants,
    error: restaurantsError,
    isLoading: restaurantsLoading,
  } = useGetRestaurantsQuery();
  const [updateRestaurant] = useUpdateRestaurantByIdMutation();

  useEffect(() => {
    if (selectedRestaurant && restaurants) {
      const selected = restaurants.find(
        (restaurant) => restaurant._id === selectedRestaurant
      );
      setRestaurantData(selected);
    }
  }, [selectedRestaurant, restaurants]);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      let updates = { [selectedOption]: inputValue };

      if (imageFile) {
        updates.image = imageFile;
      }

      if (selectedOption === "keywords") {
        const keywordsArray = inputValue
          .split(", ")
          .map((keyword) => keyword.trim());
        updates.keywords = keywordsArray;
      }

      await updateRestaurant({ id: selectedRestaurant, ...updates }).unwrap();
      setUpdateSuccess(true);
      setInputValue("");
      setImageFile(null);
      setIsLoading(false);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      setUpdateError("Failed to update restaurant. Please try again.");
      setIsLoading(false);
      setTimeout(() => setUpdateError(""), 3000);
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setRestaurantData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  if (restaurantsLoading) return <p>Loading...</p>;
  if (restaurantsError) return <p>Error: {restaurantsError.message}</p>;

  return (
    <div className="restaurant-update-form">
      <h2 className="form-title">Update Restaurant Information</h2>
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
          {restaurants.map((restaurant) => (
            <option key={restaurant._id} value={restaurant._id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </div>
      {selectedRestaurant && (
        <>
          <div className="form-group">
            <label htmlFor="option" className="form-label">
              Select Option:
            </label>
            <select
              id="option"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="form-select"
            >
              <option value="">Select Option</option>
              <option value="name">Name</option>
              <option value="address">Address</option>
              <option value="description">Description</option>
              <option value="keywords">Keywords</option>
              <option value="region">Region</option>
              <option value="image">Image</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="input" className="form-label">
              Enter New Value:
            </label>
            <input
              type="text"
              id="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="form-input"
            />
          </div>
          {selectedOption === "keywords" && (
            <p className="form-helper-text">
              Enter keywords separated by comma (, )
            </p>
          )}
          {selectedOption === "image" && (
            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Upload New Image:
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
            </div>
          )}
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="form-button"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          {updateSuccess && (
            <p className="form-success">Restaurant updated successfully!</p>
          )}
          {updateError && <p className="form-error">{updateError}</p>}
        </>
      )}
    </div>
  );
}

export default RestaurantUpdateForm;
