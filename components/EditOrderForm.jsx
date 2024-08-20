"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";

export default function EditOrderForm({ id, items }) {
  const [currentItems, setCurrentItems] = useState(items);
  //console.log("items", items);
  //console.log("currentItems", currentItems);
  const router = useRouter();

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  const handleIncrement = (itemId) => {
    const newItemsList = currentItems.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCurrentItems(newItemsList);
  };

  const handleDecrement = (itemId) => {
    const newItemsList = currentItems.map((item) => {
      if (item._id === itemId && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCurrentItems(newItemsList);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Must be 4 characters or more")
        .required("Required"),
      address: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
      phoneNumber: Yup.string()
        .min(6, "Must be 9 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const newName = values.name;
      const newAddress = values.address;
      const newPhoneNumber = values.phoneNumber;
      const newItems = currentItems;
      //console.log("newItems", newItems);
      try {
        const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            address: newAddress,
            phoneNumber: newPhoneNumber,
            items: newItems,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to update order");
        }

        router.refresh();
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <ul>
        {currentItems.map((item) => (
          <li key={item._id}>
            <span>{item.name}</span>
            <span>{item.quantity}</span>
            <button onClick={() => handleDecrement(item._id)}>-</button>
            <button onClick={() => handleIncrement(item._id)}>+</button>
            <Image
              src={`/${item.image}`}
              height={150}
              width={150}
              alt={item.name}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="string"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          type="string"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        />
        {formik.touched.address && formik.errors.address ? (
          <div>{formik.errors.address}</div>
        ) : null}

        <label htmlFor="phoneNumber">Phone number</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="string"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div>{formik.errors.phoneNumber}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
