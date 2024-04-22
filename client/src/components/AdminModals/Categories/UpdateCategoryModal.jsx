import React, { useState } from "react";
import { useUpdateCategoryByIdMutation } from "../../../redux/services/categoriesApi";
import "./style.css"

const UpdateCategoryModal = ({ onClose, category }) => {
  const [name, setName] = useState(category.name);

  const [updateCategoryByIdMutation] = useUpdateCategoryByIdMutation();

  const handleSubmit = async () => {
    try {
      await updateCategoryByIdMutation({
        id: category._id,
        name: name,
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content update-category-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Update Category</h2>

        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
