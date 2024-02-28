import React, { useState } from "react";
import { useUser } from "../../hooks/useUser";
import "./RestaurantCreateForm.css";
import {
  useCreateNewRestaurantMutation,
  useGetRestaurantsQuery,
} from "../../redux/services/restaurantsApi";

const RestaurantForm = () => {
  const user = useUser();
  const { data: restaurants } = useGetRestaurantsQuery();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      setSuccessMessage("");
      setErrorMessage("");
      await createRestaurant(formData).unwrap();
      setSuccessMessage("Restaurant created successfully!");
      setName("");
      setDescription("");
      setRegion("");
      setAddress("");
      setKeywords("");
      setImage([]);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      setErrorMessage("Failed to create restaurant. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="restaurant-form">
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

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default RestaurantForm;
