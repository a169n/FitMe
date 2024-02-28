import "./ApiPage.css";
import ExercisesApi from "../../components/ExercisesApi/ExercisesApi";
import RecipesApi from "../../components/RecipesApi/RecipesApi";

function ApiPage() {
  return (
    <div className="api-containers global-padding">
      <ExercisesApi />
      <RecipesApi />
    </div>
  );
}

export default ApiPage;
