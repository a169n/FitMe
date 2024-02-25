import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import "./AdminPage.css";

export default function AdminPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReturnToHomePage = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="adminPage">
      <h1>Admin Page</h1>
      <div className="users"></div>
      <div className="restaurants"></div>
      <button onClick={handleReturnToHomePage}>Return to HomePage</button>
    </div>
  );
}
