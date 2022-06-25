import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import HeaderMenu from "./HeaderMenu";
import useClickOutside from "../hooks/useClickOutside";
import logo from "../assets/logo_black.svg";
import Image from "next/image";

const NavBar = () => {
  const { ref, setIsComponentVisible, isComponentVisible } =
    useClickOutside(false);
  const { cartItems } = useStateContext();

  const openCart = () => {
    setIsComponentVisible(true);
  };
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <a>
            <Image src={logo} height={100} width={100} alt={"PRdise logo"}/>
          </a>
        </Link>
      </p>
      <div className="navbar-actions" ref={ref}>
        <button type="button" className="cart-icon" onClick={openCart}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{cartItems?.length}</span>
        </button>
        {isComponentVisible && (
          <Cart setIsComponentVisible={setIsComponentVisible} />
        )}
        <button type="button" className="navbar-menu">
          <HeaderMenu />
        </button>
      </div>
    </div>
  );
};
export default NavBar;
