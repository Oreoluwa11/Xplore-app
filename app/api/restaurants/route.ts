import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "restaurants.json");

export async function GET(req: Request) {
  try {
    const raw = await readFile(DATA_PATH, "utf8");
    const restaurants = JSON.parse(raw);
    // support query params for 'area' and 'query' (search)
    const url = new URL(req.url);
    const area = url.searchParams.get("area"); // Mainland | Island
    const q = url.searchParams.get("query")?.toLowerCase();

    let results = restaurants;
    if (area && (area === "Mainland" || area === "Island")) {
      results = results.filter((r: any) => r.area === area);
    }
    if (q) {
      results = results.filter((r: any) =>
        (r.name + " " + r.address).toLowerCase().includes(q)
      );
    }

    return NextResponse.json(results);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to read restaurants" }, { status: 500 });
  }
}
