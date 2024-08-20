"use client";
import EditOrderForm from "@/components/EditOrderForm";
import { useEffect, useState } from "react";

export default function EditOrder({ params }) {
  const [orderItmes, setOrderItems] = useState([]);
  const { id } = params;
  //console.log(id);
  useEffect(() => {
    const getOrderById = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }
        const orderData = await res.json();
        //console.log(orderData);
        setOrderItems(orderData.order.items);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderById();
  }, []);

  return <EditOrderForm id={id} items={orderItmes} />;
}
