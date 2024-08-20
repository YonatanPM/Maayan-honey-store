import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const orders = await Order.find();
  return NextResponse.json({ orders });
}

export async function POST(request) {
  const { name, address, phoneNumber, items, userEmail, ordersSupplied } =
    await request.json();
  await connectMongoDB();
  await Order.create({
    name,
    address,
    phoneNumber,
    items,
    userEmail,
    ordersSupplied,
  });
  return NextResponse.json({ message: "Order Submited" }, { status: 201 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Order.findByIdAndDelete(id);
  return NextResponse.json({ message: "Order deleted" }, { status: 200 });
}
