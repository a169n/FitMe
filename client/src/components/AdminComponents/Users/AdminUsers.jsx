import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Users.css";

export const AdminUsers = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-items">
        <h1>Users</h1>
      </div>
    </div>
  );
};
