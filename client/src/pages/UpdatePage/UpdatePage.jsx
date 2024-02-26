import { Link } from "react-router-dom";
import CategoryUpdateForm from "../../components/CategoryUpdateForm/CategoryUpdateForm";
import RestaurantUpdateForm from "../../components/RestaurantUpdateForm/RestaurantUpdateForm";
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
      <div>
        <CategoryUpdateForm />
        <RestaurantUpdateForm />
      </div>
    </div>
  );
}

export default UpdatePage;
