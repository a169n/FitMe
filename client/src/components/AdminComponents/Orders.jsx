import React from "react";
import { Sidebar } from "./Sidebar";
import "./AdminComponents.css"

export const Orders = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <h1>Orders</h1>
    </div>
  );
};
