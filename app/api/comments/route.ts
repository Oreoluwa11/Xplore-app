import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST: Add a comment
export async function POST(req: Request) {
  try {
    const { restaurantId, name, text } = await req.json();

    if (!restaurantId || !name || !text) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        restaurantId: Number(restaurantId),
        name,
        text,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error saving comment:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// GET: Fetch all comments for a restaurant
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const restaurantId = url.searchParams.get("restaurantId");

    if (!restaurantId) {
      return NextResponse.json(
        { error: "restaurantId is required" },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: { restaurantId: Number(restaurantId) },
      orderBy: { createdAt: "desc" }, // latest first
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
