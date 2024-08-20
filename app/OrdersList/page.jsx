"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import RemoveBtn from "@/components/RemoveBtn";
import { useSession } from "next-auth/react";

export default function OrdersList() {
  const { data: session } = useSession();
  const [currentOrders, setCurrentOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/orders?fieldName=${session?.user?.email}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const ordersData = await res.json();

        setCurrentOrders(ordersData.orders);
      } catch (error) {
        console.log("Error loading orders: ", error);
      }
    };

    if (session?.user?.email) {
      fetchOrders();
    }
  }, [session?.user?.email]);

  return (
    <>
      {currentOrders.map((order) => (
        <div key={order._id}>
          <ul>
            <li>{order.name}</li>
            <li>{order.address}</li>
            <li>{order.phoneNumber}</li>
            <li>
              <RemoveBtn id={order._id} />
              <Link href={`/EditOrder/${order._id}`}>Edit Order</Link>
            </li>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  <p>{item.name}</p>
                  <p>{item.quantity}</p>
                </li>
              ))}
            </ul>
          </ul>
        </div>
      ))}
    </>
  );
}
