import Hero from "@/components/Sections/Hero";
import { Suspense } from "react";
import Restaurants from "@/components/Sections/Restaurants";

export default function Home() {
  return (
    <div className="py-10 md:py-10">
      <Hero />
      <Suspense fallback={<div className="py-8 text-center">Loading…</div>}>
        <Restaurants />
      </Suspense>
    </div>
  );
}
