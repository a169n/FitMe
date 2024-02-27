import { Link } from "react-router-dom";
import { useSearchFoodsQuery } from "../../redux/services/foodsApi";
import { useSearchRestaurantsQuery } from "../../redux/services/restaurantsApi";
import restaurant_image from "../../assets/restaurant-icon.png";
import greenStar from "../../assets/greenStar.svg";
import yellowStar from "../../assets/yellowStar.svg";
import regionIcon from "../../assets/region.svg";
import peopleIcon from "../../assets/people.svg";
import priceIcon from "../../assets/price.svg";
import "./Restaurants.css";

export default function Restaurants() {
  const {
    data: restaurantsData,
    isLoading: restaurantsIsLoading,
    isFetching: restaurantsIsFetching,
    isError: restaurantsIsError,
  } = useSearchRestaurantsQuery("");

  const {
    data: foodsData,
    isLoading: foodsIsLoading,
    isFetching: foodsIsFetching,
    isError: foodsIsError,
  } = useSearchFoodsQuery("");

  if (
    restaurantsIsLoading ||
    restaurantsIsFetching ||
    foodsIsLoading ||
    foodsIsFetching
  ) {
    return <h1 className="loading">Loading...</h1>;
  }

  return (
    <div className="hero-section global-padding">
      <div className="restaurants">
        <p className="hero-section-header">Nearby Restaurants</p>
        <div className="hero-section-container">
          {restaurantsData.slice(0, 4).map((restaurant) => (
            <div className="hero-section-card" key={restaurant._id}>
              <Link className="link" to={`/restaurant/${restaurant._id}`}>
                <img
                  className="restaurant-image"
                  src={
                    restaurant.image
                      ? `http://localhost:3000/${restaurant.image}`
                      : restaurant_image
                  }
                  alt="restaurant-image"
                />
                <h3 className="card-header">{restaurant.name}</h3>
                <div className="card-info">
                  <p className="card-keyword">
                    {restaurant.keywords.join(", ")}
                  </p>
                  <div className="card-rating">
                    <img
                      src={restaurant.rating >= 4 ? greenStar : yellowStar}
                      alt={
                        restaurant.rating >= 4 ? "green-star" : "yellow-star"
                      }
                    />
                    <div className="restaurant-rating">{restaurant.rating}</div>
                  </div>
                </div>
                <div className="card-region-container">
                  <img src={regionIcon} alt="region" />
                  <p className="card-region">{restaurant.region}</p>
                </div>
                <div className="card-region-container">
                  <img src={peopleIcon} alt="people" />
                  <p className="card-region">{restaurant.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="foods">
        <p className="hero-section-header">Recommended Food Items</p>
        <div className="hero-section-container">
          {foodsData.map((food) => (
            <Link className="link" to={`/food/${food._id}`} key={food._id}>
              <div className="hero-section-card" key={food._id}>
                <img
                  className="restaurant-image"
                  src={
                    food.image
                      ? `http://localhost:3000/${food.image}`
                      : restaurant_image
                  }
                  alt="food-image"
                />
                <h3 className="card-header">{food.name}</h3>
                <p className="card-keyword">{food.category.name}</p>
                <div className="card-region-container">
                  <img src={priceIcon} alt="price" />
                  <p className="card-region">${food.price}</p>
                </div>
                <div className="card-region-container">
                  <img src={peopleIcon} alt="people" />
                  <p className="card-region">{food.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
