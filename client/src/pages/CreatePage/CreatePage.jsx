import { Link } from "react-router-dom";
import CategoryCreateForm from "../../components/CategoryCreateForm/CategoryCreateForm";
import FoodCreateForm from "../../components/FoodCreateForm/FoodCreateForm";
import RestaurantCreateForm from "../../components/RestaurantCreateForm/RestaurantCreateForm";
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
          <RestaurantCreateForm />
          <CategoryCreateForm />
        </div>
        <div>
          <FoodCreateForm />
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
