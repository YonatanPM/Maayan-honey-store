"use client";

import { useEffect, useState } from "react";
import Item from "@/components/Item";

export default function Items() {
  const [loadedItems, setLoadedItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      try {
        const res = await fetch("http://localhost:3000/api/storeItems");

        if (!res.ok) {
          throw new Error("Failed to fetch items");
        }

        const fetchedItems = await res.json();

        setLoadedItems(fetchedItems.items);
      } catch (error) {
        console.log("Error loading items:", error.message);
      }
    }

    getItems();
  }, []);

  return (
    <ul id="items">
      {loadedItems.map((item) => (
        <Item key={item._id} item={item} />
      ))}
    </ul>
  );
}
