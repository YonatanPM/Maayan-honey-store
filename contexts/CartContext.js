"use client";
import { createContext, useState } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
  showCart: () => {},
  hideCart: () => {},
  modalShown: false,
});

export function CartContextProvider({ children }) {
  const [cartItemsArray, setCartItemsArray] = useState([]);
  const [modalShown, setModalShown] = useState(false);

  function addItem(item) {
    setCartItemsArray((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  }

  function removeItem(item) {
    setCartItemsArray((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem.quantity > 1) {
        return prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevItems.filter((cartItem) => cartItem._id !== item._id);
      }
    });
  }

  function showCart() {
    setModalShown(true);
  }
  function hideCart() {
    setModalShown(false);
  }

  const cartContext = {
    items: cartItemsArray,
    addItem,
    removeItem,
    showCart,
    hideCart,
    modalShown,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
