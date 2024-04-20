import React, { useState } from "react";
import { useUpdateRestaurantByIdMutation } from "../../../redux/services/restaurantsApi";

export const UpdateRestaurantModal = ({ onClose, restaurant }) => {
  const [name, setName] = useState(restaurant.name);
  const [description, setDescription] = useState(restaurant.description);
  const [region, setRegion] = useState(restaurant.region);
  const [address, setAddress] = useState(restaurant.address);
  const [keywords, setKeywords] = useState(restaurant.keywords.join(", "));
  const [image, setImage] = useState([]);

  // Define the mutation hook
  const [updateRestaurantByIdMutation] = useUpdateRestaurantByIdMutation();

  const handleFileChange = (e) => {
    setImage([...e.target.files]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", restaurant._id);
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
      await updateRestaurantByIdMutation(formData);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content update-restaurant-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Update Restaurant</h2>

        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter restaurant name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter restaurant description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
          <label htmlFor="region">Region</label>
          <input
            type="text"
            id="region"
            placeholder="Enter restaurant region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter restaurant address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="keywords">Keywords (comma separated)</label>
          <input
            type="text"
            id="keywords"
            placeholder="Enter restaurant keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <label htmlFor="image">Images</label>
          <input
            multiple={true}
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

export default UpdateRestaurantModal;
