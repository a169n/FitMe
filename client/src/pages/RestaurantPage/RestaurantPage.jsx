import React, { useState, useEffect } from "react";
import Cart from "../../components/Cart/Cart";

import { useNavigate, useParams } from "react-router-dom";
import { useGetRestaurantByIdQuery } from "../../redux/services/restaurantsApi";
import { useGetCategoriesByRestaurantIdQuery } from "../../redux/services/categoriesApi";
import { useLazyGetFoodsByCategoryIdQuery } from "../../redux/services/foodsApi";
import Slider from "react-slick";
import "./RestaurantPage.css";
import { useUser } from "../../hooks/useUser";
import {
  useGetUserDetailsQuery,
  useAddItemToCartMutation,
  useGetItemsNumberInCartQuery,
  useRemoveItemFromCartMutation,
  useChangeItemAmountByOneMutation,
} from "../../redux/services/usersApi";

import { useCreateOrderMutation } from "../../redux/services/orderApi";

export default function RestaurantPage() {
  const navigate = useNavigate();
  const user = useUser();
  const { restaurantId } = useParams();

  const {
    data: restaurant,
    error: restaurantError,
    isLoading: isRestaurantLoading,
  } = useGetRestaurantByIdQuery(restaurantId);

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesByRestaurantIdQuery(restaurantId);

  const [foodsByCategoryId] = useLazyGetFoodsByCategoryIdQuery();

  const { data: userData, refetch: refetchUserData } = useGetUserDetailsQuery(
    user?._id,
    {
      skip: !user?._id,
    }
  );

  const [addToCart] = useAddItemToCartMutation();
  const [changeAmountInCart] = useChangeItemAmountByOneMutation();
  const [removeItemFromCart] = useRemoveItemFromCartMutation();

  const [createOrder, { isSuccess: orderIsSuccess }] = useCreateOrderMutation();

  const { data: cartItemsNumber, refetch: refetchItemsNumber } =
    useGetItemsNumberInCartQuery(user?.token, {
      skip: !user?.token,
    });

  const [amount, setAmount] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryFoods, setSelectedCategoryFoods] = useState([]);
  const [isCategoryFoodsLoading, setIsCategoryFoodsLoading] = useState(false);

  const [cartProductsList, setCartProductsList] = useState(
    userData?.cart || []
  );

  const [addedToCart, setAddedToCart] = useState({});

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

    const updatedAmount = {};
    cartProductsList.forEach((product) => {
      updatedAmount[product.product._id] = product.amount;
    });
    setAmount(updatedAmount);

    const newTotalPrice = cartProductsList.reduce((acc, cartProduct) => {
      const productPrice = cartProduct.product.price || 0;
      const productAmount = cartProduct.amount || 0;
      return acc + productPrice * productAmount;
    }, 0);

    setTotalPrice(newTotalPrice);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === (restaurant?.images?.length || 0) - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [
    restaurant?.images?.length,
    orderIsSuccess,
    navigate,
    user,
    userData,
    cartProductsList,
  ]);

  useEffect(() => {
    if (orderIsSuccess && user?.token) {
      refetchItemsNumber();
      refetchUserData();
      navigate("/profile");
    }
  }, [orderIsSuccess, navigate, user, refetchItemsNumber]);

  const handleCategoryClick = async (categoryId) => {
    try {
      setIsCategoryFoodsLoading(true);
      const { data } = await foodsByCategoryId(categoryId);
      setSelectedCategoryFoods(data || []);
      const initialAmounts = {};
      data.forEach((food) => {
        initialAmounts[food._id] = 1;
      });
      setAmount(initialAmounts);
    } catch (error) {
      console.error("Error fetching category foods:", error);
    } finally {
      setIsCategoryFoodsLoading(false);
    }
    setSelectedCategory(categoryId);
  };

  const addItemToCart = async (productId, amount, restaurantId, token) => {
    try {
      await addToCart({
        productId,
        amount,
        restaurantId,
        token,
      });
      setAddedToCart((prevState) => ({
        ...prevState,
        [productId]: true,
      }));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleAddToCart = async (foodId, amount) => {
    try {
      await addItemToCart(foodId, amount, restaurant._id, user?.token);
      setAmount((prevAmount) => ({
        ...prevAmount,
        [foodId]: prevAmount[foodId],
      }));
      setAddedToCart((prevState) => ({
        ...prevState,
        [foodId]: true,
      }));
      const existingProductIndex = cartProductsList.findIndex(
        (product) => product?._id === foodId
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...cartProductsList];
        updatedCart[existingProductIndex].amount += amount;
        setCartProductsList(updatedCart);
      } else {
        const updatedCart = [...cartProductsList, { product: foodId, amount }];
        setCartProductsList(updatedCart);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleChangeAmountInCart = async (foodId, isIncrease) => {
    try {
      await changeAmountInCart({
        token: user?.token,
        productId: foodId,
        increase: isIncrease,
      });
    } catch (error) {
      console.error("Error changing amount in cart:", error);
    }
  };

  const handleRemoveFromCart = async (foodId) => {
    try {
      await removeItemFromCart({ token: user?.token, productId: foodId });
      setCartProductsList((prevCart) =>
        prevCart.filter((item) => item?.product?._id !== foodId)
      );
      setAmount((prevAmount) => {
        const updatedAmount = { ...prevAmount };
        delete updatedAmount[foodId];
        return updatedAmount;
      });
      setAddedToCart((prevState) => ({
        ...prevState,
        [foodId]: false,
      }));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleCreateOrder = () => {
    const orderData = {
      restaurant: restaurantId,
      orderProducts: cartProductsList.map((prod) => ({
        product: prod?.product._id,
        amount: prod?.amount,
      })),
      token: user?.token,
    };
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
          <p>Rating: {restaurant.rating.toFixed(2)}/5</p>
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
                  <button
                    className="add-button"
                    onClick={() => handleAddToCart(food._id, 1)}
                    disabled={addedToCart[food._id]}
                  >
                    {addedToCart[food._id] ? "Added" : "Add+"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <Cart
          cartProductsList={cartProductsList}
          cartItemsNumber={cartItemsNumber}
          amount={amount}
          handleChangeAmountInCart={handleChangeAmountInCart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleCreateOrder={handleCreateOrder}
          totalPrice={totalPrice}
        />
      </div>
    </section>
  );
}
