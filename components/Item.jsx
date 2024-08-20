"use client";
import { useContext } from "react";
import CustomButton from "./UI/CustomButton";
import CartContext from "@/contexts/CartContext";

export default function Item({ item }) {
  const cartCtx = useContext(CartContext);

  function handleAddItemToCart() {
    cartCtx.addItem(item);
  }

  return (
    <>
      <li>
        <article>
          <img src={item.image} alt={item.name} />
          <div>
            <p>{item.name}</p>
            <p>{item.price}</p>
          </div>
          <CustomButton onClick={handleAddItemToCart}>Add to Cart</CustomButton>
        </article>
      </li>
    </>
  );
}
