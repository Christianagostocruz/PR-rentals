import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { UseLocalStorage } from "../components/UseLocalStorage";

const Context = createContext();
export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = UseLocalStorage("cartItems", []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedDay, setSelectedDay] = useState();
  const [showFormattedFromDate, setShowFormattedFromDate] = useState();

  let foundProduct;

  const numberOfDaysSelected = (startDate, endDate) => {
    let diff = 0;
    const numberOfRents = (diff = Math.abs(
      Math.floor((endDate?.getTime() - startDate?.getTime()) / 86400000)
    ));
    setQty(numberOfRents);
  };
  useEffect(() => {
    numberOfDaysSelected(selectedDay?.from, selectedDay?.to) || null;
  }, [selectedDay]);

  const onAdd = (product) => {
    const fromDate = selectedDay.from.toString("MM/dd/yyyy").split(" ");
    const toDate = selectedDay.to.toString("MM/dd/yyyy").split(" ");
    const formattedDay = `From: ${fromDate[1]}/${fromDate[2]}/${fromDate[3]} To: ${toDate[1]}/${toDate[2]}/${toDate[3]}`;
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    numberOfDaysSelected(selectedDay?.from, selectedDay?.to);
    setShowFormattedFromDate(formattedDay);

    if (checkProductInCart) {
      foundProduct = checkProductInCart;

      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: qty,
            date: formattedDay,
          };
      });
      setCartItems(updatedCartItems);
      let foundProductLastPrice = foundProduct.price * foundProduct.quantity;
      setTotalPrice((prevTotalPrice) => {
        let newPrice =
          prevTotalPrice - foundProductLastPrice + product.price * qty;
        return newPrice;
      });
    } else {
      setTotalQuantities(cartItems.length + 1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * qty);
      product.quantity = qty;
      product.date = formattedDay;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${product.name} added to the cart.`);
    setSelectedDay("");
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    delete localStorage.foundProduct;
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        onAdd,
        onRemove,
        setSelectedDay,
        selectedDay,
        showFormattedFromDate,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
