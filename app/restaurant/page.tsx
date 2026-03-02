import React from "react";
import RestaurantsList from "@/components/RestaurantsList";
import restaurantsData from "@/data/restaurants.json";
import { Restaurant } from "@/types/restaurant";

type SearchParams = {
  query?: string | string[];
  area?: string | string[];
};

export default async function RestaurantsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const queryRaw = Array.isArray(sp.query) ? sp.query[0] : sp.query;
  const areaRaw = Array.isArray(sp.area) ? sp.area[0] : sp.area;

  const q = (queryRaw ?? "").toLowerCase();
  const area = areaRaw ?? "";

  let results: Restaurant[] = restaurantsData as unknown as Restaurant[];

  if (area === "Mainland" || area === "Island") {
    results = results.filter((r) => r.area === area);
  }

  if (q) {
    results = results.filter((r) =>
      (r.name + " " + r.address).toLowerCase().includes(q)
    );
  }

  return (
    <div className="py-10 md:py-15 px-12 mt-18 bg-card-1">
      <h1 className="text-3xl font-bold mb-6">All Restaurants</h1>
      <RestaurantsList restaurants={results} />
    </div>
  );
}