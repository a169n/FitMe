import React from "react";
import {
  useGetUsersQuery,
  useDeleteUserByIdMutation,
  useMakeUserAdminByIdMutation,
  useRemoveUserAdminByIdMutation,
} from "../../../redux/services/usersApi";
import { Link, useNavigate } from "react-router-dom";
import "./Users.css";
import { Sidebar } from "../Sidebar/Sidebar";

const AdminUsers = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [deleteUserById] = useDeleteUserByIdMutation();
  const [makeUserAdminById] = useMakeUserAdminByIdMutation();
  const [removeUserAdminById] = useRemoveUserAdminByIdMutation();
  const navigate = useNavigate();

  const handleRegisterUser = () => {
    navigate("/register");
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserById(id);
    }
  };

  const handleToggleAdmin = (user) => {
    if (user.isAdmin) {
      removeUserAdminById(user._id);
    } else {
      makeUserAdminById(user._id);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-items user-card">
        {users.map((user) => (
          <div className="user-card-item" key={user._id}>
            <h3 className="user-header">{user.username}</h3>
            <div className="user-info">
              <p>Email: {user.email}</p>
              <p>Age: {user.age}</p>
              <p>Gender: {user.isMale ? "Male" : "Female"}</p>
              <p>Admin: {user.isAdmin ? "Yes" : "No"}</p>
              <p>Registered: {new Date(user.createdAt).toLocaleString()}</p>
            </div>
            <div className="user-actions">
              <button
                className={
                  user.isAdmin ? "admin-user-button" : "make-admin-button"
                }
                onClick={() => handleToggleAdmin(user)}>
                {user.isAdmin ? "Remove Admin" : "Make Admin"}
              </button>
              <button
                className="admin-delete-button"
                onClick={() => handleDeleteUser(user._id)}>
                X
              </button>
            </div>
          </div>
        ))}
        <button onClick={handleRegisterUser} className="admin-create-button">
          <span className="plus-sign">+</span>
        </button>
      </div>
    </div>
  );
};

export default AdminUsers;
