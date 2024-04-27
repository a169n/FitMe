import React, { useState, useEffect } from "react";
import "./Cart.css";
import trash from "../../assets/trash-can.svg";
import minusButton from "../../assets/minus.svg";
import plusButton from "../../assets/plus.svg";
import PropagateLoader from "react-spinners/PropagateLoader";
import SyncLoader from "react-spinners/SyncLoader";

const Cart = ({
  cartProductsList,
  cartItemsNumber,
  amount,
  handleChangeAmountInCart,
  handleRemoveFromCart,
  handleCreateOrder,
  totalPrice,
  userDataIsLoading,
  changeAmountLoading,
}) => {
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const handleCartButtonClick = async (productId, isIncrease) => {
    setLoading(true);
    try {
      await handleChangeAmountInCart(productId, isIncrease);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error handling cart button click:", error);
      setLoading(false);
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-heading">Cart</div>
        <div className="cart-items-number">
          Items: {cartItemsNumber?.amount}
        </div>
      </div>
      <div className="orders_list">
        {cartProductsList?.map((cartProduct) => (
          <div key={cartProduct?._id} className="order_card">
            <div className="cart-item-category">
              from{" "}
              <span className="category-name">
                {cartProduct.product.category?.name || "Unknown Category"}
              </span>
            </div>
            <div className="cart-item">
              <div className="cart-item-data">
                <div className="cart-item-name">{cartProduct.product.name}</div>
                <div className="cart-item-price">
                  ₹{cartProduct.product.price}
                </div>
              </div>
              <div className="quantity-selector">
                <button
                  className="quantity-selector-button"
                  onClick={() =>
                    handleCartButtonClick(cartProduct.product._id, false)
                  }
                  disabled={
                    loading ||
                    changeAmountLoading ||
                    userDataIsLoading ||
                    amount[cartProduct.product._id] <= 1
                  }>
                  <img id="minus-btn" src={minusButton} alt="minus-button" />
                </button>

                {loading ? (
                  <div className="loader-container">
                    <p>
                      <SyncLoader
                        cssOverride={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "-7px",
                          padding: "0",
                        }}
                        size={5}
                      />
                    </p>
                  </div>
                ) : (
                  <span className="selected-quantity">
                    {amount[cartProduct.product._id]}
                  </span>
                )}

                <button
                  className="quantity-selector-button"
                  onClick={() =>
                    handleCartButtonClick(cartProduct.product._id, true)
                  }
                  disabled={
                    loading || changeAmountLoading || userDataIsLoading
                  }>
                  <img id="plus-btn" src={plusButton} alt="plus-button" />
                </button>
              </div>

              <div className="cart-item-remove">
                <button
                  className="remove-from-cart-button"
                  onClick={() => handleRemoveFromCart(cartProduct.product._id)}>
                  <img className="trash-icon" src={trash} alt="trash-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {cartProductsList.length > 0 && (
          <div className="cart-subtotal-container">
            <div className="cart-subtotal">
              <div className="subtotal">Subtotal</div>
              <div className="extra-charges">Extra charges may apply</div>
            </div>
            <div className="total-price">₹{totalPrice}</div>
          </div>
        )}
      </div>
      <div className="delivery-address">
        <label htmlFor="address">Delivery Address:</label>
        <input
          type="text"
          id="address"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Enter your delivery address"
        />
      </div>
      <button
        className={`checkout-button ${
          cartProductsList.length === 0 ? "disabled" : ""
        }`}
        onClick={() => handleCreateOrder(deliveryAddress)}
        disabled={cartProductsList.length === 0 || !deliveryAddress.trim()}>
        Create Order
      </button>
    </div>
  );
};

export default Cart;
