import { Link } from "react-router-dom";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import FoodForm from "../../components/FoodForm/FoodForm";
import RestaurantForm from "../../components/RestaurantForm/RestaurantForm";
import "./CreatePage.css";

function CreatePage() {
  return (
    <div className="create-page-container global-padding">
      <div className="create-page-section">
        <h1>Create Page</h1>
        <Link className="link" to={"/admin"}>
          <button>AdminPage</button>
        </Link>
      </div>
      <div className="form-section">
        <div>
          <RestaurantForm />
          <CategoryForm />
        </div>
        <div>
          <FoodForm />
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
