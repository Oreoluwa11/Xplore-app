"use client";

import React from "react";
import RestaurantCard from "./RestaurantCard";

interface Restaurant {
  id: number;
  name: string;
  area: string;
  address: string;
  image: string;
  description: string;
}

interface Props {
  restaurants: Restaurant[];
}

const RestaurantsList = ({ restaurants }: Props) => {
  if (restaurants.length === 0) return <p>No restaurants found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
      {restaurants.map(r => (
        <RestaurantCard key={r.id} restaurant={r} />
      ))}
    </div>
  );
};

export default RestaurantsList;
