"use client";
import { useContext } from "react";
import CartContext from "@/contexts/CartContext";
import CustomButton from "./UI/CustomButton";

export default function Header() {
  const { items, showCart } = useContext(CartContext);

  function handleShowCart() {
    showCart();
  }

  const cartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header>
      <div>
        <img src="./images/logo.jpg" alt="logo image" />
        <h1>Maayan Honey Store</h1>
        <h2>Israeli local honey from the producer to your home</h2>
      </div>
      <CustomButton textOnly onClick={handleShowCart}>
        Cart ({cartItems})
      </CustomButton>
    </header>
  );
}
