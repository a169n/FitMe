import { Link } from "react-router-dom";
import CategoryUpdateForm from "../../components/CategoryUpdateForm/CategoryUpdateForm";
import RestaurantUpdateForm from "../../components/RestaurantUpdateForm/RestaurantUpdateForm";
import FoodUpdateForm from "../../components/FoodUpdateForm/FoodUpdateForm";
import "./UpdatePage.css";

function UpdatePage() {
  return (
    <div className="update-page-container">
      <div className="update-page-section">
        <h1>UpdatePage</h1>
        <Link className="link" to={"/admin"}>
          <button>AdminPage</button>
        </Link>
      </div>
      <div className="update-page-components">
        <CategoryUpdateForm />
        <RestaurantUpdateForm />
        <FoodUpdateForm />
      </div>
    </div>
  );
}

export default UpdatePage;
