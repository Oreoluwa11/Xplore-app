import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const REST_PATH = path.join(process.cwd(), "data", "restaurants.json");
const REV_PATH = path.join(process.cwd(), "data", "reviews.json");

type Restaurant = {
  id: number;
  name: string;
  location: string;
  cuisine: string;
};

type Review = {
  id: number;
  restaurant_id: number;
  rating: number;
  comment?: string;
};

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (!Number.isFinite(numericId)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const restaurantsRaw = await readFile(REST_PATH, "utf8");
    const restaurants: Restaurant[] = JSON.parse(restaurantsRaw);

    const restaurant = restaurants.find((r) => r.id === numericId);
    if (!restaurant) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const reviewsRaw = await readFile(REV_PATH, "utf8");
    const reviewsAll: Review[] = JSON.parse(reviewsRaw);
    const reviews = reviewsAll.filter((rv) => rv.restaurant_id === numericId);

    const avgRating =
      reviews.length > 0
        ? Number(
            (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)
          )
        : null;

    return NextResponse.json({ restaurant, reviews, avgRating });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}