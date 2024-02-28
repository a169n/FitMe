import React, { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import "./RestaurantCreateForm.css";
import {
  useCreateNewRestaurantMutation,
  useAddImageToRestaurantMutation,
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
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  // const [additionalImage, setAdditionalImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files);
    console.log("files input", e.target.files);
  };

  // const handleAdditionalImageChange = (e) => {
  //   setAdditionalImage(e.target.files[0]);
  // };

  const [createRestaurant] = useCreateNewRestaurantMutation();
  // const [addImageToRestaurant] = useAddImageToRestaurantMutation();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("region", region);
    formData.append("address", address);
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
      setAddress("");
      setKeywords("");
      setImage(null);

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

  // const handleAdditionalImageSubmit = async () => {
  //   if (!selectedRestaurantId || !additionalImage) {
  //     setErrorMessage("Please select a restaurant and choose an image.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("id", selectedRestaurantId);
  //   formData.append("image", additionalImage);

  //   try {
  //     setErrorMessage("");
  //     await addImageToRestaurant({
  //       id: selectedRestaurantId,
  //       image: formData,
  //     }).unwrap();
  //     setSuccessMessage("Image added to restaurant successfully!");
  //     setAdditionalImage(null);
  //     setSelectedRestaurantId("");
  //   } catch (err) {
  //     setErrorMessage("Failed to add image to restaurant. Please try again.");
  //     console.error(err);
  //   }
  // };

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
      {/* <input
        multiple="true"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      /> */}
      <button onClick={handleSubmit}>Submit</button>

      <h2>Add Additional Image</h2>
      <select
        value={selectedRestaurantId}
        onChange={(e) => setSelectedRestaurantId(e.target.value)}
      >
        <option value="">Select Restaurant</option>
        {restaurants &&
          restaurants.map((restaurant) => (
            <option key={restaurant._id} value={restaurant._id}>
              {restaurant.name}
            </option>
          ))}
      </select>
      <input
        multiple={true}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button onClick={handleSubmit}>Add Images</button>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default RestaurantForm;
