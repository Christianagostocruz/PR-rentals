import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import HeaderMenu from "./HeaderMenu";
import useComponentVisible from "./Hooks/useComponentVisible";

const NavBar = () => {
  const { ref, setIsComponentVisible, isComponentVisible } =
    useComponentVisible(false);
  const { cartItems } = useStateContext();

  const openCart = () => {
    setIsComponentVisible(true);
  };
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Rentals Charters</Link>
      </p>
      <div className="navbar-actions" ref={ref}>
        <button type="button" className="cart-icon" onClick={openCart}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{cartItems?.length}</span>
        </button>
        {isComponentVisible && <Cart setIsComponentVisible={setIsComponentVisible}/>}
        <button type="button" className="navbar-menu">
          <HeaderMenu />
        </button>
      </div>
    </div>
  );
};
export default NavBar;
