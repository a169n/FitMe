import React, { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Orders.css"; // Ensure you import the CSS file
import {
  useGetOrdersQuery,
  useDeleteOrderByIdMutation,
} from "../../../redux/services/orderApi";
import SyncLoader from "react-spinners/SyncLoader";
import { UpdateOrderModal } from "../../AdminModals/Orders/UpdateOrderModal";

export const AdminOrders = () => {
  const { data: orders, error, isLoading } = useGetOrdersQuery();
  const [deleteOrderById] = useDeleteOrderByIdMutation();
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrderById(orderId);
    }
  };

  const handleUpdateOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const closeModal = () => {
    setSelectedOrderId(null);
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
        {orders.map((order) => (
          <div className="orders-section-card" key={order._id}>
            <button
              className="admin-delete-button"
              onClick={() => handleDeleteOrder(order._id)}>
              X
            </button>
            <h3>
              Status:{" "}
              <span style={{ color: getStatusColor(order.deliveryStatus) }}>
                {order.deliveryStatus}
              </span>
            </h3>

            <p>Restaurant: {order.restaurant.name}</p>
            <p>Total Sum: {order.totalSum}</p>
            <p>Delivery Address: {order.deliveryAddress}</p>
            <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
            {order.review ? (
              <div className="review-info">
                <p>Rating: {order.review.rating}/5</p>
                <p>Review: {order.review.review_text}</p>
              </div>
            ) : (
              <p className="review-info">Not Rated</p>
            )}
            <p>User: {order.user.username}</p>
            <button
              className="update-button"
              onClick={() => handleUpdateOrder(order._id)}>
              Update
            </button>
          </div>
        ))}
      </div>
      {selectedOrderId && (
        <UpdateOrderModal orderId={selectedOrderId} closeModal={closeModal} />
      )}
    </div>
  );
};

function getStatusColor(status) {
  switch (status) {
    case "Delivering":
      return "#4caf50";
    case "Delivered":
      return "#fc8019";
    case "Canceled":
      return "#f44336";
    default:
      return "inherit";
  }
}

export default AdminOrders;
