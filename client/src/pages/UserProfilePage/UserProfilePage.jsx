import React, { useState } from "react";
import { useUser } from "../../hooks/useUser";
import {
  useRateOrderMutation,
  useDeleteOrderByIdMutation,
} from "../../redux/services/orderApi";
import "./UserProfilePage.css";
import { useDeleteAllOrdersMutation } from "../../redux/services/orderApi";
import { useGetUserDetailsQuery } from "../../redux/services/usersApi";
import RatingModal from "../../components/RatingModal/RatingModal";
import deleteIcon from "../../assets/delete-icon.svg"

export default function UserProfilePage() {
  const user = useUser();
  const { data: userData, refetch: refetchUserData } = useGetUserDetailsQuery(
    user?._id,
    {
      skip: !user?._id,
    }
  );
  const [deleteAllOrders, { isLoading: isDeletingAll }] =
    useDeleteAllOrdersMutation();
  const [rateOrder, { isLoading: isRatingLoading }] = useRateOrderMutation();
  const [deleteOrderById] = useDeleteOrderByIdMutation(); // New hook

  const [ratingOrder, setRatingOrder] = useState(null);

  const handleClearOrderHistory = () => {
    refetchUserData();
    deleteAllOrders();
  };

  const handleRateOrder = (orderId) => {
    setRatingOrder(orderId);
  };

  const handleSubmitRating = async ({ rating, review }) => {
    await rateOrder({
      orderId: ratingOrder,
      rating: rating,
      reviewText: review,
      token: user?.token,
    });
    refetchUserData();
    setRatingOrder(null);
  };

  const handleCloseRatingModal = () => {
    setRatingOrder(null);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrderById(orderId);
      refetchUserData();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="global-padding">
      <h2 className="page-title">User Profile Page. Hello {user?.username}</h2>

      <div className="orders-section">
        <h3 className="section-title">Order History:</h3>
        {userData?.orders.length > 0 ? (
          <div className="order-list">
            {userData?.orders.map((order) => (
              <div key={order._id} className="order-card">
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="delete-button"
                >
                  <img id="delete-icon" src={deleteIcon} alt="delete-icon" />
                </button>
                <div className="order-info">
                  <p className="order-id">Order ID: {order._id}</p>
                  <p className="order-total">Total Sum: {order.totalSum}</p>
                  <p>
                    Created At: {new Date(order.createdAt).toLocaleString()}
                  </p>
                  {order.isRated && (
                    <div className="review-info">
                      <p>Rating: {order.review.rating}/5</p>
                      <p>Review: {order.review.review_text}</p>
                    </div>
                  )}
                </div>
                {order.isRated ? (
                  <button className="rated-button" disabled>
                    Rated
                  </button>
                ) : (
                  <button
                    onClick={() => handleRateOrder(order._id)}
                    className="rate-button"
                  >
                    Rate Order
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-orders">No orders available.</p>
        )}

        {ratingOrder && (
          <RatingModal
            onSubmit={handleSubmitRating}
            onClose={handleCloseRatingModal}
          />
        )}
        <button
          onClick={handleClearOrderHistory}
          className={`clear-history-button ${isDeletingAll ? "disabled" : ""}`}
          disabled={isDeletingAll}
        >
          {isDeletingAll ? "Clearing..." : "Clear Order History"}
        </button>
      </div>
    </div>
  );
}
