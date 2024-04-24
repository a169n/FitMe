import React, { useState } from "react";
import { useUpdateFoodByIdMutation } from "../../../redux/services/foodsApi";

const UpdateDishModal = ({ onClose, dish }) => {
  const [name, setName] = useState(dish.name);
  const [price, setPrice] = useState(dish.price);
  const [description, setDescription] = useState(dish.description);
  const [image, setImage] = useState(null); // Change to null to store a single image

  const [updateFoodByIdMutation] = useUpdateFoodByIdMutation();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    try {
      await updateFoodByIdMutation({ id: dish._id, updates: formData });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dish-create-modal">
      <div className="modal-content update-dish-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Update Dish</h2>

        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter dish name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
          />

          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDishModal;
