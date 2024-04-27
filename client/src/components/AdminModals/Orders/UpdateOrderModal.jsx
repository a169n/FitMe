import React, { useState, useEffect } from "react";
import {
  useUpdateOrderByIdMutation,
  useGetOrderByIdQuery,
} from "../../../redux/services/orderApi";
import SyncLoader from "react-spinners/SyncLoader";

export const UpdateOrderModal = ({ orderId, closeModal }) => {
  const [status, setStatus] = useState("");
  const [updateOrderById, { isLoading, isSuccess, isError }] =
    useUpdateOrderByIdMutation();
  const {
    data: orderDetails,
    error,
    isLoading: isOrderLoading,
  } = useGetOrderByIdQuery(orderId);

  useEffect(() => {
    if (orderDetails) {
      setStatus(orderDetails.deliveryStatus);
    }
  }, [orderDetails]);

  const handleUpdateOrder = async () => {
    try {
      await updateOrderById({ orderId, deliveryStatus: status });
      console.log("Order updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  if (isOrderLoading || isLoading) {
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="dish-create-modal">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <h2>Update Order Status</h2>
        <form className="dish-create-form">
          <label htmlFor="status">Select Status:</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option value="Delivering">Delivering</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
          <button
            type="button"
            onClick={handleUpdateOrder}
            disabled={!status || isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};
