import connectMongoDB from "@/lib/mongodb";
import Todo from "@/models/backend/todo";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const todos = await Todo.find();
  return NextResponse.json({
    success: true,
    data: todos,
  });
}

export async function POST(request: NextRequest) {
  await connectMongoDB();
  const { title, description } = await request.json();
  await Todo.create({ title, description });

  return NextResponse.json({
    success: true,
    message: "Todo created successfully",
  });
}
