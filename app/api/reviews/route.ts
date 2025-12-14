import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const REV_PATH = path.join(process.cwd(), "data", "reviews.json");

export async function GET(req: Request) {
  try {
    const raw = await readFile(REV_PATH, "utf8");
    const reviews = JSON.parse(raw);
    return NextResponse.json(reviews);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to read reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { restaurant_id, name, rating, comment } = body;
    if (!restaurant_id || !rating) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const raw = await readFile(REV_PATH, "utf8");
    const reviews = JSON.parse(raw);

    const nextId = reviews.length ? Math.max(...reviews.map((r:any)=>r.id)) + 1 : 1;
    const newReview = {
      id: nextId,
      restaurant_id: Number(restaurant_id),
      name: name || "Anonymous",
      rating: Number(rating),
      comment: comment || "",
      created_at: new Date().toISOString()
    };

    reviews.unshift(newReview); // newest first
    await writeFile(REV_PATH, JSON.stringify(reviews, null, 2), "utf8");

    return NextResponse.json({ message: "Review added", review: newReview });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
  }
}
