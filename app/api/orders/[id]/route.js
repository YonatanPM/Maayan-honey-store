import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const { id } = params;
  try {
    const { name, address, phoneNumber, items } = await request.json();

    await connectMongoDB();

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        name,
        address,
        phoneNumber,
        items,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Order updated", order: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update order" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const order = await Order.findOne({ _id: id });
  return NextResponse.json({ order }, { status: 200 });
}

export async function POST(request) {
  try {
    await connectMongoDB();
    const { userEmail } = await request.json();
    const order = await Order.findOne({ userEmail: userEmail });
    //console.log("order: ", order);
    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
  }
}
