import React, { useState } from "react";
import "./style.css";
import { useGetRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { useCreateNewCategoryMutation } from "../../redux/services/categoriesApi";

export const CreateCategoryModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [restaurant, setRestaurant] = useState("");

  const { data: restaurants, isLoading, isError } = useGetRestaurantsQuery("");

  const [createCategory] = useCreateNewCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory({ name: name, restaurant: restaurant }).unwrap();
      setName("");
      setRestaurant("");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching restaurants</p>;

  return (
    <div className="category-create-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Create New Category</h2>
        <form onSubmit={handleSubmit} className="category-create-form">
          <label htmlFor="category-name">Name:</label>
          <input
            type="text"
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="category-restaurant">Restaurant:</label>
          <select
            id="category-restaurant"
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
      </div>
    </div>
  );
};

export default CreateCategoryModal;
