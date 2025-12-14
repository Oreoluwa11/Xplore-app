import React from "react";
import RestaurantsList from "@/components/RestaurantsList";
import restaurants from "@/data/restaurants.json";

const MainlandRestaurantsPage = () => {
  const mainland = restaurants.filter(r => r.area === "Mainland");

  return (
    <div className="py-10 md:py-15 px-12 mt-20 bg-card-1">
      <h1 className="text-3xl font-bold mb-6">Mainland Restaurants</h1>
      <RestaurantsList restaurants={mainland} />
    </div>
  );
};

export default MainlandRestaurantsPage;
