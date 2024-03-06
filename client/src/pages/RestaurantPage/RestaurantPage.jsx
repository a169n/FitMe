import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetRestaurantByIdQuery } from "../../redux/services/restaurantsApi";
import { useGetCategoriesByRestaurantIdQuery } from "../../redux/services/categoriesApi";
import {
  useGetFoodsByCategoryIdQuery,
  useLazyGetFoodsByCategoryIdQuery,
} from "../../redux/services/foodsApi";
import Slider from "react-slick";
import "./RestaurantPage.css";

export default function RestaurantPage() {
  const { restaurantId } = useParams();

  const {
    data: restaurant,
    error: restaurantError,
    isLoading: isRestaurantLoading,
  } = useGetRestaurantByIdQuery(restaurantId);

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesByRestaurantIdQuery(restaurantId);

  const [foodsByCategoryId] = useLazyGetFoodsByCategoryIdQuery();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryFoods, setSelectedCategoryFoods] = useState([]);
  const [isCategoryFoodsLoading, setIsCategoryFoodsLoading] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === (restaurant?.images?.length || 0) - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [restaurant?.images?.length]);

  const handleCategoryClick = async (categoryId) => {
    try {
      setIsCategoryFoodsLoading(true);
      const { data } = await foodsByCategoryId(categoryId);
      setSelectedCategoryFoods(data || []);
    } catch (error) {
      console.error("Error fetching category foods:", error);
    } finally {
      setIsCategoryFoodsLoading(false);
    }
    setSelectedCategory(categoryId);
  };

  if (isRestaurantLoading || isCategoriesLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (restaurantError) {
    return <div>Error: {restaurantError.message}</div>;
  }

  return (
    <section className="restaurant-page">
      <div className="restaurant global-padding">
        <div className="restaurant-image">
          <Slider {...sliderSettings} initialSlide={currentIndex}>
            {(restaurant?.images || []).map((image, index) => (
              <img
                key={index}
                className="restaurant-image"
                src={`http://localhost:3000/${image}`}
                alt={`restaurant-image-${index}`}
              />
            ))}
          </Slider>
        </div>
        <div className="restaurant-info">
          <div className="restaurant-name">{restaurant.name}</div>
          <div className="restaurant-keywords">
            {restaurant.keywords.join(", ")}
          </div>
          <div className="restaurant-info"></div>
        </div>
        <div className="offers">
          <p>Offers</p>
        </div>
      </div>
      <div className="restaurant-data global-padding">
        <div className="categories">
          {categories &&
            categories.map((category) => (
              <button
                key={category._id}
                className={`category-button ${
                  selectedCategory === category._id ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.name}
              </button>
            ))}
        </div>
        <hr className="vertical-line"/>
        <div className="foods">
          {isCategoryFoodsLoading ? (
            <div>Loading...</div>
          ) : selectedCategoryFoods.length === 0 ? (
            <div>No foods available for this category.</div>
          ) : (
            selectedCategoryFoods.map((food) => (
              <div key={food._id} className="food">
                <div className="food-details">
                  <p className="foodName">{food.name}</p>
                  <p className="foodPrice">₹{food.price}</p>
                  <p className="foodDescription">{food.description}</p>
                </div>
                <div className="food-image">
                  <img
                    className="food-image"
                    src={`http://localhost:3000/${food.image}`}
                    alt="food-image"
                  />
                  <button className="add-button">Add +</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart">
          <div className="cart-heading">Cart</div>
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </section>
  );
}
