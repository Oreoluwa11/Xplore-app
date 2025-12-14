import Image from "next/image";
import Hero from "@/components/Sections/Hero";
import Restaurants from "@/components/Sections/Restaurants";

export default function Home() {
  return (
    <div className="py-10 md:py-10">
      <Hero />
      <Restaurants />
    </div>
  );
}
