import React, { useState } from "react";
import { useGetRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { useCreateNewCategoryMutation } from "../../redux/services/categoryApi";

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
    } catch (error) {
      setErrorMessage("Failed to create category. Please try again.");
      console.error(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching restaurants</p>;

  return (
    <div>
      <h2>Create New Category</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Restaurant:</label>
        <select
          value={restaurant._id}
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
