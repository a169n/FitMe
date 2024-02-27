import React, { useState } from "react";
import { useGetRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { useCreateNewCategoryMutation } from "../../redux/services/categoriesApi";
import "./CategoryCreateForm.css";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: restaurants, isLoading, isError } = useGetRestaurantsQuery("");

  const [createCategory] = useCreateNewCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory({ name: name, restaurant: restaurant }).unwrap();
      setSuccessMessage("Category created successfully!");
      setName("");
      setRestaurant("");

      setTimeout(() => {
        setSuccessMessage("");
        window.location.reload();
      }, 3000);
    } catch (error) {
      setErrorMessage("Failed to create category. Please try again.");
      console.error(error);

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching restaurants</p>;

  return (
    <div className="category-form-container">
      <h2>Create New Category</h2>
      <form onSubmit={handleSubmit} className="restaurant-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="restaurant">Restaurant:</label>
        <select
          id="restaurant"
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
          required
        >
          <option value="">Select Restaurant</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant._id} value={restaurant._id}>
              {restaurant.name}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CategoryForm;
