import React, { useState } from "react";
import { useGetRecipesByQueryQuery } from "../../redux/services/recipesApi";
import "./RecipesApi.css";

function RecipesApi() {
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useGetRecipesByQueryQuery(query);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="recipes-api">
      <h1>Recipes API</h1>
      <form>
        <label htmlFor="query">Enter food item:</label>
        <input
          type="text"
          id="query"
          value={query}
          onChange={handleChange}
          placeholder="e.g., Italian wedding soup"
        />
      </form>
      {isLoading && <p>Loading recipe...</p>}
      {error && <p>Enter the dish name</p>}
      {data && data.length > 0 && (
        <div>
          <h2>Recipe for {data[0].title}:</h2>
          <p>
            <strong>Ingredients:</strong> {data[0].ingredients}
          </p>
          <p>
            <strong>Servings:</strong> {data[0].servings}
          </p>
          <p>
            <strong>Instructions:</strong> {data[0].instructions}
          </p>
        </div>
      )}
    </div>
  );
}

export default RecipesApi;
