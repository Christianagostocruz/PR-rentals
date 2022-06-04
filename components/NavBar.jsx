import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import HeaderMenu from "./HeaderMenu";

const NavBar = () => {
  const { showCart, setShowCart, cartItems } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Rentals Charters</Link>
      </p>
      <div className="navbar-actions">
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{cartItems?.length}</span>
      </button>
      {showCart && <Cart />}
      <button type="button">
        <HeaderMenu/>
      </button>
      </div>
    </div>
  );
};
export default NavBar;
