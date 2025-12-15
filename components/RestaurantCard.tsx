"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Restaurant {
  id: number;
  name: string;
  area: string;
  address: string;
  image: string;
  description: string;
}

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
          width={300}
          height={300}
        />
        <div className="p-4">
          <h2 className="text-xl font-bold">{restaurant.name}</h2>
          <p className="text-gray-600">{restaurant.area}</p>
          <p className="text-gray-500 mt-1 line-clamp-2">{restaurant.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
