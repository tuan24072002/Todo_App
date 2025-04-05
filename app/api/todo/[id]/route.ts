import connectMongoDB from "@/lib/mongodb";
import Todo from "@/models/backend/todo";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  await connectMongoDB();

  const { id, title, description } = await request.json();
  await Todo.findByIdAndUpdate({ _id: id }, { title, description });
  return NextResponse.json({
    success: true,
    message: "Todo updated successfully",
  });
}

export async function DELETE(request: NextRequest) {
  await connectMongoDB();
  const { id } = await request.json();
  await Todo.findByIdAndDelete(id);
  return NextResponse.json({
    success: true,
    message: "Todo deleted successfully",
  });
}
