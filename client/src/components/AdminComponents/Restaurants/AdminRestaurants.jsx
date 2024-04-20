import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import greenStar from "../../../assets/greenStar.svg";
import yellowStar from "../../../assets/yellowStar.svg";
import regionIcon from "../../../assets/region.svg";
import peopleIcon from "../../../assets/people.svg";
import {
  useGetRestaurantsQuery,
  useDeleteRestaurantByIdMutation,
} from "../../../redux/services/restaurantsApi";
import "./Restaurants.css";
import CreateRestaurantModal from "../../AdminModals/CreateRestaurantModal";
import UpdateRestaurantModal from "../../AdminModals/UpdateRestaurantModal";
import { Sidebar } from "../Sidebar/Sidebar";

export const AdminRestaurants = () => {
  const { data: restaurants, error, isLoading } = useGetRestaurantsQuery();
  const [deleteRestaurantById] = useDeleteRestaurantByIdMutation();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      deleteRestaurantById(id);
    }
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleOpenUpdateModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedRestaurant(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-items">
        {restaurants.map((restaurant) => (
          <div className="hero-section-card" key={restaurant._id}>
            <button
              className="admin-delete-button"
              onClick={() => handleDelete(restaurant._id)}>
              Delete
            </button>
            <button
              className="update-button"
              onClick={() => handleOpenUpdateModal(restaurant)}>
              Update
            </button>
            <Link className="link" to={`/restaurant/${restaurant._id}`}>
              <Slider {...sliderSettings}>
                {restaurant.images.map((image, index) => (
                  <img
                    key={index}
                    className="restaurant-image"
                    src={`http://localhost:3000/${image}`}
                    alt={`restaurant-image-${index}`}
                  />
                ))}
              </Slider>
              <h3 className="card-header">{restaurant.name}</h3>
              <div className="card-info">
                <p className="card-keyword">{restaurant.keywords.join(", ")}</p>
                <div className="card-rating">
                  <div>
                    <img
                      src={restaurant.rating >= 4 ? greenStar : yellowStar}
                      alt={
                        restaurant.rating >= 4 ? "green-star" : "yellow-star"
                      }
                    />
                  </div>
                  <div className="restaurant-rating">
                    {restaurant.rating.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="card-region-container">
                <img src={regionIcon} alt="region" />
                <p className="card-region">{restaurant.region}</p>
              </div>
              <div className="card-region-container">
                <img src={peopleIcon} alt="people" />
                <p className="card-region">{restaurant.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowCreateModal(true)}
        className="admin-create-button">
        +
      </button>

      {showCreateModal && (
        <CreateRestaurantModal onClose={handleCloseCreateModal} />
      )}
      {showUpdateModal && (
        <UpdateRestaurantModal
          restaurant={selectedRestaurant}
          onClose={handleCloseUpdateModal}
        />
      )}
    </div>
  );
};

export default AdminRestaurants;
