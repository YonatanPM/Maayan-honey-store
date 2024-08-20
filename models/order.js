import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    ordersSupplied: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = models.Order || mongoose.model("Order", orderSchema);
export default Order;
