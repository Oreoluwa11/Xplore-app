"use client";

import React, { useEffect, useMemo, useState } from "react";
import RestaurantsList from "@/components/RestaurantsList";
import restaurantsData from "@/data/restaurants.json";
import { useSearchParams, useRouter } from "next/navigation";

export default function RestaurantBrowser() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams?.get("query") ?? "";
  const initialArea = searchParams?.get("area") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [area, setArea] = useState(initialArea);

  // debounce query updates
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // keep URL in sync (replace to avoid history entries)
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("query", debouncedQuery);
    if (area) params.set("area", area);
    const url = `/restaurant${params.toString() ? "?" + params.toString() : ""}`;
    router.replace(url);
  }, [debouncedQuery, area, router]);

  const filtered = useMemo(() => {
    let results = (restaurantsData as any[]) || [];
    if (area && (area === "Mainland" || area === "Island")) {
      results = results.filter((r) => r.area === area);
    }
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      results = results.filter((r) => (r.name + " " + r.address).toLowerCase().includes(q));
    }
    return results;
  }, [debouncedQuery, area]);

  return (
    <div className="py-10 md:py-15 px-6 md:px-12 mt-20">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-1/2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants or address..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setArea("")}
            className={`px-3 py-2 rounded-lg ${area === "" ? "bg-primary text-white" : "bg-white"}`}
          >
            All
          </button>
          <button
            onClick={() => setArea("Mainland")}
            className={`px-3 py-2 rounded-lg ${area === "Mainland" ? "bg-primary text-white" : "bg-white"}`}
          >
            Mainland
          </button>
          <button
            onClick={() => setArea("Island")}
            className={`px-3 py-2 rounded-lg ${area === "Island" ? "bg-primary text-white" : "bg-white"}`}
          >
            Island
          </button>
        </div>
      </div>

      <div>
        <RestaurantsList restaurants={filtered} />
      </div>
    </div>
  );
}
