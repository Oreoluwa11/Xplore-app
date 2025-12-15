import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "restaurants.json");

// Define Restaurant type
type Restaurant = {
  id: number;
  name: string;
  address: string;
  area: "Mainland" | "Island" | string;
  cuisine?: string;
  // add other fields from your JSON if needed
};

export async function GET(req: Request) {
  try {
    const raw = await readFile(DATA_PATH, "utf8");
    const restaurants: Restaurant[] = JSON.parse(raw);

    // Parse query params
    const url = new URL(req.url);
    const area = url.searchParams.get("area") as "Mainland" | "Island" | null;
    const q = url.searchParams.get("query")?.toLowerCase();

    let results = restaurants;

    if (area === "Mainland" || area === "Island") {
      results = results.filter((r) => r.area === area);
    }

    if (q) {
      results = results.filter((r) =>
        (r.name + " " + r.address).toLowerCase().includes(q)
      );
    }

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to read restaurants" },
      { status: 500 }
    );
  }
}
