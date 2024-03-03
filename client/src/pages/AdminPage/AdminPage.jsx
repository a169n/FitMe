import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import "./AdminPage.css"; // Import the CSS file
import Users from "../../components/Users/Users";
import { useAccess } from "../../hooks/useAccess";

export default function AdminPage() {
  useAccess()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReturnToHomePage = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="adminPage global-padding">
      <h1 className="admin-page-heading">Admin Page</h1>
      <button className="return-button" onClick={handleReturnToHomePage}>
        Log out and Return to HomePage
      </button>

      <div>
        <Link className="link" to={"/admin/create"}>
          <button className="admin-button">Create</button>
        </Link>
        <Link className="link" to={"/admin/update"}>
          <button className="admin-button">Update</button>
        </Link>
        <Link className="link" to={"/admin/delete"}>
          <button className="admin-button">Delete</button>
        </Link>
      </div>
      <div>
        <Users />
      </div>
    </div>
  );
}
