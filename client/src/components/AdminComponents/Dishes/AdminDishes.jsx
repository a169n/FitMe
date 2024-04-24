import React, { useState } from "react";
import {
  useGetFoodsQuery,
  useDeleteFoodByIdMutation,
} from "../../../redux/services/foodsApi";
import SyncLoader from "react-spinners/SyncLoader";
import { Link } from "react-router-dom";
import priceIcon from "../../../assets/price.svg";
import peopleIcon from "../../../assets/people.svg";
import UpdateDishModal from "../../AdminModals/Dishes/UpdateDishModal";
import "./Dishes.css";
import { Sidebar } from "../Sidebar/Sidebar";
import CreateDishModal from "../../AdminModals/Dishes/CreateDishModal";

export const AdminDishes = () => {
  const { data: dishes, error, isLoading } = useGetFoodsQuery();
  const [deleteFoodById] = useDeleteFoodByIdMutation();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const handleDeleteDish = (id) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      deleteFoodById(id);
    }
  };

  const handleUpdateClick = (dish) => {
    setSelectedDish(dish);
    setShowUpdateModal(true);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return (
      <SyncLoader
        cssOverride={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "50px 0",
        }}
        size={20}
      />
    );
  }

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-items dish-card">
        {dishes.map((food) => (
          <div className="hero-section-card" key={food._id}>
            <button
              className="admin-delete-button"
              onClick={() => handleDeleteDish(food._id)}>
              X
            </button>
            <Link className="link" to={`/restaurant/${food.restaurant}`}>
              <img
                className="restaurant-image"
                src={`http://localhost:3000/${food.image}`}
                alt={`food-image-${food._id}`}
              />
              <h3 className="card-header">{food.name}</h3>
              <div className="card-info">
                <p className="card-keyword">{food.type}</p>
                <div className="card-rating">
                  <img src={priceIcon} alt="price" />
                  <div className="restaurant-rating">{food.price}$</div>
                </div>
              </div>
              <div className="card-region-container">
                <img src={peopleIcon} alt="people" />
                <p className="card-region">{food.description}</p>
              </div>
            </Link>
            <button
              className="update-button"
              onClick={() => handleUpdateClick(food)}>
              Update
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowCreateModal(true)}
        className="admin-create-button">
        <span className="plus-sign">+</span>
      </button>
      {showCreateModal && (
        <CreateDishModal onClose={() => setShowCreateModal(false)} />
      )}
      {showUpdateModal && (
        <UpdateDishModal
          onClose={() => setShowUpdateModal(false)}
          dish={selectedDish}
        />
      )}
    </div>
  );
};

export default AdminDishes;
