import React, { useState, useEffect } from "react";
import { useGetRestaurantsQuery } from "../../redux/services/restaurantsApi";
import { useCreateNewFoodMutation } from "../../redux/services/foodsApi";

const FoodForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [restaurantCategories, setRestaurantCategories] = useState([]);

  const { data: restaurants, isLoading, isError } = useGetRestaurantsQuery("");
  const [createFood] = useCreateNewFoodMutation(); // Destructure createFood from the mutation hook

  useEffect(() => {
    if (restaurant) {
      const selectedRestaurant = restaurants.find((r) => r._id === restaurant);
      if (selectedRestaurant) {
        setRestaurantCategories(selectedRestaurant.categories);
      }
    }
  }, [restaurant, restaurants]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("restaurant", restaurant);
      formData.append("image", image);

      await createFood(formData).unwrap();
      setSuccessMessage("Food created successfully!");
      setName("");
      setPrice("");
      setDescription("");
      setRestaurant("");
      setCategory("");
      setImage(null);
    } catch (error) {
      setErrorMessage("Failed to create food. Please try again.");
      console.error(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching restaurants</p>;

  return (
    <div>
      <h2>Create New Food</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Restaurant:</label>
        <select
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
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {restaurantCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default FoodForm;
