import { connectMongoDB } from "@/lib/mongodb";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  //console.log("connect to MongoDB");
  const items = await Item.find();
  //console.log("Server Items", items);
  return NextResponse.json({ items });
}
