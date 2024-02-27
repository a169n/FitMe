import React, { useState, useEffect } from "react";
import { useGetRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { useGetCategoriesQuery } from "../../redux/services/categoriesApi";
import { useGetFoodsQuery } from "../../redux/services/foodsApi";
import { useUpdateFoodByIdMutation } from "../../redux/services/foodsApi";
import "./FoodUpdateForm.css";

function FoodUpdateForm() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [foodData, setFoodData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const {
    data: restaurants,
    error: restaurantsError,
    isLoading: restaurantsLoading,
  } = useGetRestaurantsQuery();

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery(selectedRestaurant);

  const {
    data: foods,
    error: foodsError,
    isLoading: foodsLoading,
  } = useGetFoodsQuery(selectedCategory);

  const [updateFood] = useUpdateFoodByIdMutation();

  useEffect(() => {
    if (selectedFood && foods) {
      const selected = foods.find((food) => food._id === selectedFood);
      setFoodData(selected);
    }
  }, [selectedFood, foods]);

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

      await updateFood({ id: selectedFood, ...updates }).unwrap();
      setUpdateSuccess(true);
      setInputValue("");
      setImageFile(null);
      setIsLoading(false);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      setUpdateError("Failed to update food. Please try again.");
      setIsLoading(false);
      setTimeout(() => setUpdateError(""), 3000);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  if (restaurantsLoading || categoriesLoading || foodsLoading)
    return <p className="loading-text">Loading...</p>;
  if (restaurantsError || categoriesError || foodsError)
    return (
      <p className="error-text">
        Error: {restaurantsError || categoriesError || foodsError}
      </p>
    );

  return (
    <div className="food-update-form">
      <h2 className="form-title">Update Food Information</h2>
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
            {categories
              .filter(
                (category) => category.restaurant === selectedRestaurant
              )
              .map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
      )}
      {selectedCategory && (
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
            {foods
              .filter(
                (food) => food.category === selectedCategory
              )
              .map((food) => (
                <option key={food._id} value={food._id}>
                  {food.name}
                </option>
              ))}
          </select>
        </div>
      )}
      {selectedFood && (
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
              <option value="price">Price</option>
              <option value="description">Description</option>
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
            <p className="form-success">Food updated successfully!</p>
          )}
          {updateError && <p className="form-error">{updateError}</p>}
        </>
      )}
    </div>
  );
}

export default FoodUpdateForm;
