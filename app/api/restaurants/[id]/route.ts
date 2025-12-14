import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const REST_PATH = path.join(process.cwd(), "data", "restaurants.json");
const REV_PATH = path.join(process.cwd(), "data", "reviews.json");

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const restaurantsRaw = await readFile(REST_PATH, "utf8");
    const restaurants = JSON.parse(restaurantsRaw);
    const restaurant = restaurants.find((r: any) => r.id === id);
    if (!restaurant) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const reviewsRaw = await readFile(REV_PATH, "utf8");
    const reviews = JSON.parse(reviewsRaw).filter((rv: any) => rv.restaurant_id === id);

    // compute simple average
    const avg = reviews.length ? +(reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

    return NextResponse.json({ restaurant, reviews, avgRating: avg });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}
