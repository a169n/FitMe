import { Link } from "react-router-dom";
import "./DeletePage.css";
import CategoryDeleteForm from "../../components/CategoryDeleteForm/CategoryDeleteForm";
import RestaurantDeleteForm from "../../components/RestaurantDeleteForm/RestaurantDeleteForm";
import FoodDeleteForm from "../../components/FoodDeleteForm/FoodDeleteForm";

function DeletePage() {
  return (
    <div className="delete-page-container">
      <div className="delete-page-section">
        <h1>Delete Page</h1>
        <Link className="link" to={"/admin"}>
          <button>AdminPage</button>
        </Link>
      </div>
      <div className="delete-page-components">
        <CategoryDeleteForm />
        <RestaurantDeleteForm />
        <FoodDeleteForm />
      </div>
    </div>
  );
}

export default DeletePage;
