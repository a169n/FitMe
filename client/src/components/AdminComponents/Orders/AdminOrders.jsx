import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Orders.css";

export const AdminOrders = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-items">
        <h1>Orders</h1>
      </div>
    </div>
  );
};
