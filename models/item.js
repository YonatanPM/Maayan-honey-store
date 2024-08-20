import mongoose, { Schema, models } from "mongoose";

const itemSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Item = models.Item || mongoose.model("Item", itemSchema);
export default Item;
