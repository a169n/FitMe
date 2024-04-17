import {
  useGetUsersQuery,
  useDeleteUserByIdMutation,
  useMakeUserAdminByIdMutation,
  useRemoveUserAdminByIdMutation,
} from "../../redux/services/usersApi";
import { useState } from "react";
import "./Users.css";
import { useUser } from "../../hooks/useUser";

export default function Users() {
  const { data: users, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserByIdMutation();
  const [makeAdmin] = useMakeUserAdminByIdMutation();
  const [removeAdmin] = useRemoveUserAdminByIdMutation();
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [newUser, setNewUser] = useState({
    isAdmin: false,
    age: "",
    isMale: true,
  });

  const user = useUser();

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser({ id: userId, token: user?.token });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleMakeAdmin = async (userId) => {
    try {
      await makeAdmin(userId);
      window.location.reload();
    } catch (error) {
      console.error("Error making user admin:", error);
    }
  };

  const handleRemoveAdmin = async (userId) => {
    try {
      await removeAdmin(userId);
      window.location.reload();
    } catch (error) {
      console.error("Error removing user admin:", error);
    }
  };

  return (
    <div className="users-container">
      <h2>Users:</h2>

      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : users && users.length > 0 ? (
        users.map((user) => {
          return (
            <div key={user._id} className="user">
              <div className="user-info">
                <p>#{user._id}</p>
                <h4>Username: {user.username}</h4>
                <h4>Email: {user.email}</h4>
                <p>isAdmin: {user.isAdmin ? "Yes" : "No"}</p>
                <p>Age: {user.age}</p>
                <p>Gender: {user.isMale ? "Male" : "Female"}</p>
              </div>
              <div className="btn-container">
                <button
                  className="delete-btn"
                  onClick={() => setUserIdToDelete(user._id)}>
                  Delete
                </button>
                {user.isAdmin ? (
                  <button
                    className="admin-btn"
                    onClick={() => handleRemoveAdmin(user._id)}>
                    Remove Admin
                  </button>
                ) : (
                  <button
                    className="admin-btn"
                    onClick={() => handleMakeAdmin(user._id)}>
                    Make Admin
                  </button>
                )}
              </div>
              {userIdToDelete === user._id && (
                <div className="btn-container">
                  <p>Are you sure you want to delete this user?</p>
                  <button
                    className="confirm-btn"
                    onClick={() => handleDeleteUser(user._id)}>
                    Confirm
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setUserIdToDelete(null)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
