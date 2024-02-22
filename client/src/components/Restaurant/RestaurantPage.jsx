import { useParams } from "react-router-dom";
import {
  useGetRestaurantByIdQuery,
  useLazySearchRestaurantsQuery,
} from "../../redux/services/restaurantsApi";
import restaurant_image from "../../assets/restaurant-icon.png";
import "./RestaurantPage.css";
import Layout from "../Layout";
import search from "../../assets/search.svg";
import offer from "../../assets/offer.svg";
import favourite from "../../assets/favourite.svg";
import { useState } from "react";

export default function RestaurantPage() {
  const { restaurantId } = useParams();

  const {
    data: restaurant,
    error,
    isLoading,
  } = useGetRestaurantByIdQuery(restaurantId);

  const [searchString, setSearchString] = useState("");

  const [searchRestaurants] = useLazySearchRestaurantsQuery();

  const handleSearch = async () => {
    try {
      const response = await searchRestaurants(searchString);
      console.log("Search response:", response);
    } catch (error) {
      console.error("Error searching restaurants:", error);
      alert("Failed to search restaurants. Please try again later.");
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found!</div>;
  }

  return (
      <section className="restaurant-page">
        <div className="restaurant global-padding">
          <div className="restaurant-image">
            <img src={restaurant_image} alt="restaurant image" />
          </div>
          <div className="restaurant-info">
            <div className="restaurant-name">{restaurant.name}</div>
            <div className="restaurant-keywords">{restaurant.keywords.join(", ")}</div>
            <div className="restaurant-info">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="offers">
            <p>Offers</p>
          </div>
          <div className="dish-search-container">
          <div className="dish-search">
            <div>
              <input
                className="dish-input"
                type="text"
                placeholder="Search for dish"
                value={searchString}
                onChange={(event) => setSearchString(event.target.value)}
              />
            </div>
            <div className="search-container">
              <button className="dish-search-button" onClick={handleSearch}>
                <img src={search} />
              </button>
            </div>
          </div>
          {/* button onclick api to make restaurant favourite */}
          <button className="favourite">
            <img src={favourite} />
            <p>Favourite</p>
          </button>
        </div>
        </div>
        
      </section>
  );
}
