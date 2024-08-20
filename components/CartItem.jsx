import { useContext } from "react";
import CartContext from "@/contexts/CartContext";

export default function CartItem(item) {
  const cartCtx = useContext(CartContext);

  return (
    <li>
      <p>
        {item.name}-{item.quantity} X {item.price}
      </p>
      <button onClick={() => cartCtx.removeItem(item)}>-</button>
      <span>{item.quantity}</span>
      <button onClick={() => cartCtx.addItem(item)}>+</button>
    </li>
  );
}
