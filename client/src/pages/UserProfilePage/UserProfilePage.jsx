import React from "react";
import { useUser } from "../../hooks/useUser";

import "./UserProfilePage.css";
import { useDeleteAllOrdersMutation } from "../../redux/services/orderApi";
import { useGetUserDetailsQuery } from "../../redux/services/usersApi";

export default function UserProfilePage() {
  const user = useUser();
  const { data: userData, refetch: refetchUserData } = useGetUserDetailsQuery(
    user?._id,
    {
      skip: !user?._id,
    }
  );
  const [deleteAllOrders, { isLoading: isDeleting }] =
    useDeleteAllOrdersMutation();

  const handleClearOrderHistory = () => {
    refetchUserData();
    deleteAllOrders();
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
                <div className="order-info">
                  <p>Order ID: {order._id}</p>
                  <p>Total Sum: {order.totalSum}</p>
                  <p>
                    Created At: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-orders">No orders available.</p>
        )}
        <button
          onClick={handleClearOrderHistory}
          className={`clear-history-button ${isDeleting ? "disabled" : ""}`}
          disabled={isDeleting}
        >
          {isDeleting ? "Clearing..." : "Clear Order History"}
        </button>
      </div>
    </div>
  );
}
