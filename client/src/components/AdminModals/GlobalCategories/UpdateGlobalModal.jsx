import React, { useState } from "react";
import { useUpdateGlobalCategoryByIdMutation } from "../../../redux/services/globalCategoriesApi";
import "./style.css";

const UpdateGlobalModal = ({ onClose, category }) => {
  const [name, setName] = useState(category.name);

  const [updateGlobalCategoryByIdMutation] =
    useUpdateGlobalCategoryByIdMutation();

  const handleSubmit = async () => {
    try {
      await updateGlobalCategoryByIdMutation({
        id: category._id,
        name: name,
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="category-create-modal">
      <div className="modal-content update-category-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Update Global Category</h2>
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

export default UpdateGlobalModal;
