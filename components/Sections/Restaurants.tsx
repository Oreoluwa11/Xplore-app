"use client";

import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface Restaurant {
  id: number;
  name: string;
  image: string;
  address: string;
  rating: number;
}

const Restaurants = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchParams = useSearchParams();
  const query = searchParams?.get("query") ?? "";
  const area = searchParams?.get("area") ?? "";

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        if (area) params.set("area", area);

        const url = "/api/restaurants" + (params.toString() ? `?${params.toString()}` : "");
        const res = await fetch(url);
        const data = await res.json();
        setRestaurants(data);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    }

    fetchRestaurants();
  }, [query, area]);

  return (
    <div className="px-8 md:px-16 py-6 mt-20">
      <div className="">
        <div className="flex justify-center items-center">
          <div className="">
            <h1 className="font-bold text-2xl ">
              <span className="text-primary">ALL </span>RESTAURANTS
            </h1>
            <hr className=" max-w-sm px-4 mb-0.5 border-primary" />
            <hr className=" max-w-sm px-4 border-black" />
          </div>
        </div>

        <div className="flex justify-center mt-10 hover:cursor-pointer">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-65 md:max-w-5xl"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                  <CarouselItem key={restaurant.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-0">
                      <Card>
                        <CardContent className="relative flex flex-col aspect-square items-center justify-start p-0">
                          <Image
                            src={restaurant.image}
                            alt={restaurant.name}
                            width={400}
                            height={350}
                            className="w-full h-48 object-cover rounded-t-xl"
                          />
                          <div className="p-4 w-full">
                            <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                            <p className="text-sm text-gray-500">{restaurant.address}</p>
                            <p className="text-yellow-500 font-medium mt-1">⭐ {restaurant.rating}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">Loading restaurants... <br /> Please wait</p>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="ml-2 mt-10 flex justify-center items-center">
          <a href="/restaurant">
            <button className="px-10 py-4 text-background bg-primary rounded-xl hover:cursor-pointer">
              Explore Restaurants
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
