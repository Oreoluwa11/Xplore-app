import React from "react";
import RestaurantsList from "@/components/RestaurantsList";
import restaurantsData from "@/data/restaurants.json";
import { Restaurant } from "@/types/restaurant";

interface SearchParams {
  query?: string;
  area?: string;
}

export default function RestaurantsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = searchParams?.query?.toLowerCase() ?? "";
  const area = searchParams?.area ?? "";

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
