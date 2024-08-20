"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import CartContext from "@/contexts/CartContext";
import CustomButton from "./UI/CustomButton";
import Modal from "./UI/Modal";
import CartItem from "./CartItem";

export default function Cart() {
  const { items, hideCart, modalShown } = useContext(CartContext);
  const router = useRouter();

  function handleCheckout() {
    router.push("/Checkout");
  }

  return (
    <Modal isOpen={modalShown} onClose={hideCart}>
      <h2>Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item._id} {...item} />
        ))}
      </ul>

      <CustomButton textOnly onClick={hideCart}>
        Close
      </CustomButton>
      <CustomButton onClick={handleCheckout}>Checkout</CustomButton>
    </Modal>
  );
}
