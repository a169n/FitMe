import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import "./AdminPage.css";
import RestaurantForm from "../../components/RestaurantForm/RestaurantForm";
import FoodForm from "../../components/FoodForm/FoodForm";
import CategoryForm from "../../components/CategoryForm/CategoryForm";

export default function AdminPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReturnToHomePage = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="adminPage global-padding">
      <h1>Admin Page</h1>
      <div className="users"></div>
      <div className="restaurants"></div>
      <button onClick={handleReturnToHomePage}>Return to HomePage</button>

      <RestaurantForm />
      <CategoryForm />
      <FoodForm />
    </div>
  );
}
