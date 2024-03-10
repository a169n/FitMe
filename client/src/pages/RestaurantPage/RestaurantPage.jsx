import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRestaurantByIdQuery } from "../../redux/services/restaurantsApi";
import { useGetCategoriesByRestaurantIdQuery } from "../../redux/services/categoriesApi";
import { useLazyGetFoodsByCategoryIdQuery } from "../../redux/services/foodsApi";
import Slider from "react-slick";
import "./RestaurantPage.css";
import { useUser } from "../../hooks/useUser";
import {
  useGetItemsNumberInCartQuery,
  useGetUserDetailsQuery,
} from "../../redux/services/usersApi";
import { useCreateOrderMutation } from "../../redux/services/orderApi";

export default function RestaurantPage() {
  const navigate = useNavigate();
  const user = useUser();
  const { data: userData } = useGetUserDetailsQuery(user?._id, {skip: user?._id ? false : true});

  console.log("suer ==================>", user?._id)
  const { data: itemsNumber, isFetching: cartIsFetching } =
    useGetItemsNumberInCartQuery(user?._id);
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
  const [cartProductsList, setCartProductsList] = useState(
    userData?.cart || []
  );

  const [createOrder, { isSuccess: orderIsSuccess }] = useCreateOrderMutation();
  const { refetch: refetchItemsNumber } = useGetItemsNumberInCartQuery(
    user?._id
  );

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
    if (userData) setCartProductsList(userData.cart);

    if (orderIsSuccess && user?.token) {
      refetchItemsNumber();
      navigate("/profile");
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === (restaurant?.images?.length || 0) - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [
    restaurant?.images?.length,
    userData,
    orderIsSuccess,
    navigate,
    user,
    refetchItemsNumber,
  ]);

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

  const handleAddToCart = (foodId, amount) => {
    const existingProductIndex = cartProductsList.findIndex(
      (product) => product.product._id === foodId
    );
    if (existingProductIndex !== -1) {
      const updatedCart = [...cartProductsList];
      updatedCart[existingProductIndex].amount += amount;
      setCartProductsList(updatedCart);
    } else {
      const selectedFood = selectedCategoryFoods.find(
        (food) => food._id === foodId
      );
      const updatedCart = [
        ...cartProductsList,
        { product: selectedFood, amount },
      ];
      setCartProductsList(updatedCart);
    }
  };

  const handleCreateOrder = () => {
    const orderData = {
      orderProducts: cartProductsList.map((prod) => ({
        product: prod.product._id,
        amount: prod.amount,
      })),
      userId: user?._id,
    };

    console.log("Order Data:", orderData);

    createOrder(orderData);
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
        <hr className="vertical-line" />
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
                  <div className="add-button-container">
                    <button
                      className="add-button"
                      onClick={() => handleAddToCart(food._id, 1)}
                    >
                      Add+
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart">
          <div className="cart-heading">Cart</div>
          <div className="orders_list">
            {cartProductsList?.map((cartProduct) => {
              return (
                <div key={cartProduct?.product?._id} className="order_card">
                  <div>Name: {cartProduct?.product?.name}</div>
                  <div>Price: {cartProduct?.product?.price}</div>
                  <div>
                    Amount:
                    <button
                      className="cart-counter"
                      onClick={() => {
                        const updatedCart = [...cartProductsList];
                        const index = updatedCart.findIndex(
                          (product) =>
                            product.product._id === cartProduct?.product?._id
                        );
                        if (updatedCart[index].amount > 1) {
                          updatedCart[index].amount -= 1;
                          setCartProductsList(updatedCart);
                        }
                      }}
                    >
                      -
                    </button>
                    {cartProduct?.amount}
                    <button
                      className="cart-counter"
                      onClick={() => {
                        const updatedCart = [...cartProductsList];
                        const index = updatedCart.findIndex(
                          (product) =>
                            product.product._id === cartProduct?.product?._id
                        );
                        updatedCart[index].amount += 1;
                        setCartProductsList(updatedCart);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => handleCreateOrder()}>Create Order</button>
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </section>
  );
}
