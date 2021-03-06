import React from "react";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import { useUser } from "@auth0/nextjs-auth0";

const Cart = ({ setIsComponentVisible }) => {
  const { totalPrice, cartItems, onRemove } = useStateContext();
  const { user } = useUser();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;
    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setIsComponentVisible(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({cartItems.length} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <a>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsComponentVisible(false)}
                >
                  Continue Shopping
                </button>
              </a>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price * item.quantity}</h4>
                    <button
                      type="button"
                      onClick={() => onRemove(item)}
                      className="remove-item"
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                  <div className="flex bottom">
                    <small>{item.date}</small>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            {!user ? <div className="btn-container">
              <button type="button" className="btn">
              <Link href="/api/auth/login">
                    <a>Submit order</a>
                  </Link>
              </button>
            </div> :<div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Submit order
              </button>
            </div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
