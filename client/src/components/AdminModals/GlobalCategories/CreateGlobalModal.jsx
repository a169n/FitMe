import React, { useState } from "react";
import "./style.css";
import { useCreateNewGlobalCategoryMutation } from "../../../redux/services/globalCategoriesApi";

const CreateGlobalModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [createGlobalCategory] = useCreateNewGlobalCategoryMutation();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      await createGlobalCategory(formData).unwrap();
      setName("");
      setImage(null);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="category-create-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Create New Global Category</h2>
        <form onSubmit={handleSubmit} className="category-create-form">
          <label htmlFor="global-category-name">Name:</label>
          <input
            type="text"
            id="global-category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="global-category-image">Image:</label>
          <input
            type="file"
            id="global-category-image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGlobalModal;
