import React, { useState } from "react";
import { useUser } from "../../hooks/useUser";
import "./RestaurantForm.css";
import { useCreateNewRestaurantMutation } from "../../redux/services/restaurantsApi";

const RestaurantForm = () => {
  const user = useUser();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [image, setImage] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const [createRestaurant] = useCreateNewRestaurantMutation();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("region", region);
    formData.append("image", image);

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
      setKeywords("");
      setImage(null);
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
        placeholder="Keywords (comma separated)"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default RestaurantForm;
