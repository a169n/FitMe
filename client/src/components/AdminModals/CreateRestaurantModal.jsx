import React, { useState } from "react";
import { useCreateNewRestaurantMutation } from "../../redux/services/restaurantsApi";
import "./style.css";

export const CreateRestaurantModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState([]);
  const [keywords, setKeywords] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files);
  };

  const [createRestaurant] = useCreateNewRestaurantMutation();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("region", region);
    formData.append("address", address);
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
    const keywordsArray = keywords.split(",").map((keyword) => keyword.trim());
    for (let i = 0; i < keywordsArray.length; i++) {
      formData.append("keywords[]", keywordsArray[i]);
    }
    try {
      await createRestaurant(formData).unwrap();
      setName("");
      setDescription("");
      setRegion("");
      setAddress("");
      setKeywords("");
      setImage([]);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content restaurant-form">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h1>Create New Restaurant</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Keywords (comma separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <input
          multiple={true}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CreateRestaurantModal;
