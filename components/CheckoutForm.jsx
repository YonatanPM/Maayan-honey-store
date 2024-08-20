"use client";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

import CartContext from "@/contexts/CartContext";

export default function CheckoutForm() {
  const { data: session } = useSession();
  const { items } = useContext(CartContext);

  //console.log(session);
  const router = useRouter();
  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

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
        .min(6, "Must be 9 or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const name = values.name;
      const address = values.address;
      const phoneNumber = values.phoneNumber;
      const userEmail = session.user.email;
      const ordersSupplied = false;
      try {
        const res = await fetch("api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            address,
            phoneNumber,
            items,
            userEmail,
            ordersSupplied,
          }),
        });

        if (res.ok) {
          router.push("/");
        } else {
          console.log("order submission failed.");
        }
      } catch (error) {
        console.log("Error order submission: ", error);
      }
    },
  });

  return (
    <>
      <h2>Price {cartTotal}</h2>
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
        <label htmlFor="address">address</label>
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
