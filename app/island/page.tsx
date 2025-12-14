import React from "react";
import RestaurantsList from "@/components/RestaurantsList";
import restaurants from "@/data/restaurants.json";

const IslandRestaurantsPage = () => {
  const island = restaurants.filter(r => r.area === "Island");

  return (
    <div className="py-10 md:py-15 px-12 mt-20 bg-card-1">
      <h1 className="text-3xl font-bold mb-6">Island Restaurants</h1>
      <RestaurantsList restaurants={island} />
    </div>
  );
};

export default IslandRestaurantsPage;
