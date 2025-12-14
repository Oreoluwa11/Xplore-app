"use client";

import React, { useEffect, useState } from "react";
import restaurants from "@/data/restaurants.json";
import Image from "next/image";
import Link from "next/link";

interface Params {
  params: Promise<{ id: string }>;
}

interface Comment {
  id: number;
  name: string;
  text: string;
  createdAt: string;
}

const RestaurantDetailsPage = ({ params }: Params) => {
  const resolvedParams = React.use(params);
  const restaurantId = parseInt(resolvedParams.id);

  const restaurant = restaurants.find((r) => r.id === restaurantId);

  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch comments from database
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?restaurantId=${restaurantId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [restaurantId]);

  if (!restaurant) {
    return (
      <div className="p-8 mt-20">
        <p>Restaurant not found.</p>
        <Link href="/restaurants" className="text-blue-500 underline">
          Back to list
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantId, name, text }),
      });

      if (res.ok) {
        const savedComment = await res.json();
        setComments((prev) => [...prev, savedComment]);
        setName("");
        setText("");
      } else {
        console.error("Failed to post comment");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div className="md:p-8 bg-card-1 mt-22">
      <div className="p-8 max-w-4xl mx-auto">
        {/* Restaurant details */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            width={800}
            height={600}
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-gray-600 mb-4">{restaurant.address}</p>
            <div className="mb-4">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 mr-2">
                {restaurant.area}
              </span>
              {restaurant.budget && (
                <span className="bg-green-100 px-3 py-1 rounded-full text-sm text-green-700">
                  {restaurant.budget}
                </span>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">
              {restaurant.details || restaurant.description}
            </p>
          </div>
        </div>

        {/* Comment section */}
        <div className="mt-10 bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>

          <form onSubmit={handleSubmit} className="mb-6">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-3"
            />
            <textarea
              placeholder="Write your comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-3"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Post Comment
            </button>
          </form>

          {loading ? (
            <p className="text-gray-500">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="border-t border-gray-200 pt-3 mt-3 text-gray-800"
              >
                <p className="font-semibold mb-2">{c.name}</p>
                <p>Comment: {c.text}</p>
                <p className="text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
                
              </div>
            ))
          )}
        </div>

        {/* Back button */}
        <div className="mt-10">
          <Link
            href="/restaurant"
            className="px-4 md:px-10 md:py-4 py-3 text-background bg-primary rounded-xl hover:cursor-pointer w-full text-xs md:text-base"
          >
            ← Back to all restaurants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;

  // {
  //   "id": 11,
  //   "name": "Le Petit Gourmet",
  //   "area": "Island",
  //   "address": "19 Bourdillon Road, Ikoyi, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
  //   "description": "Elegant French fusion with a view.",
  //   "budget": "Budget (Min): 50,000 NGN",
  //   "details": "Le Petit Gourmet offers refined French fusion cuisine in an elegant setting in Ikoyi. Ideal for special occasions and romantic dinners, with fine wines and exquisite service."
  // },
  // {
  //   "id": 12,
  //   "name": "Spice Route Grill",
  //   "area": "Mainland",
  //   "address": "45 Bode Thomas Street, Surulere, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
  //   "description": "Spice-filled bowls & grills.",
  //   "budget": "Budget (Min): 20,000 NGN",
  //   "details": "Spice Route Grill is a casual grill house in Surulere offering spice-forward dishes, grilled meats and hearty bowls. Great spot for lunch or relaxed dinner."
  // },
  // {
  //   "id": 13,
  //   "name": "Ocean’s Edge Fine Dining",
  //   "area": "Island",
  //   "address": "6A Alfred Rewane Road, Ikoyi, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
  //   "description": "Seafood and skyline views.",
  //   "budget": "Budget (Min): 70,000 NGN",
  //   "details": "Ocean’s Edge is a premium seafood restaurant with panoramic views of the Lagos skyline. Known for fresh catches, sushi platters, and elevated dining experience."
  // },
  // {
  //   "id": 14,
  //   "name": "Mama’s Kitchen Express",
  //   "area": "Mainland",
  //   "address": "22 Allen Avenue, Ikeja, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1742599361498-79824d24e355?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
  //   "description": "Quick homestyle meals to go.",
  //   "budget": "Budget (Min): 8,000 NGN",
  //   "details": "Mama’s Kitchen Express serves quick, homestyle Nigerian dishes for takeout or delivery. Perfect when you want comfort food without the wait."
  // },
  // {
  //   "id": 15,
  //   "name": "The Vineyard Lounge",
  //   "area": "Island",
  //   "address": "3A Gerald Road, GRA, Ikeja, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
  //   "description": "Fine wine and fusion plates.",
  //   "budget": "Budget (Min): 60,000 NGN",
  //   "details": "The Vineyard Lounge is a stylish lounge offering fusion cuisine and a curated wine list. Located in the GRA/Ikeja area, ideal for evening drinks and upscale dining."
  // },
  // {
  //   "id": 16,
  //   "name": "Burger Patrol",
  //   "area": "Mainland",
  //   "address": "10 Allen Avenue, Ikeja, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1629471722874-13d4208d62ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1176",
  //   "description": "Gourmet burgers and fries.",
  //   "budget": "Budget (Min): 12,000 NGN",
  //   "details": "Burger Patrol offers mouthwatering gourmet burgers, loaded fries, and shakes. A go-to for takeout and casual hangouts."
  // },
  // {
  //   "id": 17,
  //   "name": "Taste of Tuscany",
  //   "area": "Island",
  //   "address": "27 Adeola Odeku, Victoria Island, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
  //   "description": "Italian classics in luxurious setting.",
  //   "budget": "Budget (Min): 55,000 NGN",
  //   "details": "Taste of Tuscany brings the warmth of Italian dining to Lagos with handmade pastas, wood-fired pizzas, and elegant interior."
  // },
  // {
  //   "id": 18,
  //   "name": "Wrap & Roll Street",
  //   "area": "Mainland",
  //   "address": "73B Allen Avenue, Ikeja, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
  //   "description": "Fresh wraps and rolls, quick bites.",
  //   "budget": "Budget (Min): 6,000 NGN",
  //   "details": "Wrap & Roll Street is a takeout spot in Ikeja offering fresh wraps, rolls, and sides. Perfect for lunch or on-the-go dinners."
  // },
  // {
  //   "id": 19,
  //   "name": "The Orchid Restaurant",
  //   "area": "Island",
  //   "address": "9A Ligali Ayorinde, Victoria Island, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1702827496398-b906ab2dd926?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1209",
  //   "description": "Luxury dining in floral setting.",
  //   "budget": "Budget (Min): 65,000 NGN",
  //   "details": "The Orchid Restaurant offers an exclusive fine dining environment with gourmet multi-course meals, exceptional service, and a serene floral décor."
  // },
  // {
  //   "id": 20,
  //   "name": "Mama Jollof’s Takeaway",
  //   "area": "Mainland",
  //   "address": "5 Opebi Road, Ikeja, Lagos, Nigeria",
  //   "image": "https://plus.unsplash.com/premium_photo-1694141251686-16828ed92b3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
  //   "description": "Quick Nigerian rice mixes.",
  //   "budget": "Budget (Min): 5,000 NGN",
  //   "details": "Mama Jollof’s Takeaway specializes in local rice dishes like jollof, fried rice, and stew, served fast and affordable for everyday meals."
  // },
  // {
  //   "id": 21,
  //   "name": "Azure Sky Bistro",
  //   "area": "Island",
  //   "address": "12 Paul Ogunbade Street, Ikoyi, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
  //   "description": "Chic bistro with light meals.",
  //   "budget": "Budget (Min): 30,000 NGN",
  //   "details": "Azure Sky Bistro combines light European-inspired meals in a chic and airy bistro atmosphere, perfect for brunch or business lunch."
  // },
  // {
  //   "id": 22,
  //   "name": "Pepperoni Pizza Co.",
  //   "area": "Mainland",
  //   "address": "24 Lawanson Road, Surulere, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
  //   "description": "Classic pizzas & quick takeout.",
  //   "budget": "Budget (Min): 10,000 NGN",
  //   "details": "Pepperoni Pizza Co. serves classic and specialty pizzas, both dine-in and fast takeaway. A hit with families and students."
  // },
  // {
  //   "id": 23,
  //   "name": "Sapphire Lounge",
  //   "area": "Island",
  //   "address": "4A Broad Street, Victoria Island, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1629471722874-13d4208d62ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1176",
  //   "description": "Cocktail lounges and small plates.",
  //   "budget": "Budget (Min): 45,000 NGN",
  //   "details": "Sapphire Lounge offers creative cocktails and small plates in a refined, relaxed atmosphere. Ideal for evening socializing."
  // },
  // {
  //   "id": 24,
  //   "name": "Quick Bites Hub",
  //   "area": "Mainland",
  //   "address": "48 Oshodi Road, Mushin, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
  //   "description": "Fast takeout for busy schedules.",
  //   "budget": "Budget (Min): 7,000 NGN",
  //   "details": "Quick Bites Hub offers fast takeout options—burgers, fries, wraps—for people in a rush. Convenient location and quick service."
  // },
  // {
  //   "id": 25,
  //   "name": "Elegance Steakhouse",
  //   "area": "Island",
  //   "address": "8 Amore Street, Ikoyi, Lagos, Nigeria",
  //   "image": "https://plus.unsplash.com/premium_photo-1723672929404-36ba6ed8ab50?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1063",
  //   "description": "Premium steaks & fine wines.",
  //   "budget": "Budget (Min): 80,000 NGN",
  //   "details": "Elegance Steakhouse is a premium fine dining restaurant offering top-tier steaks, wine pairings, and refined service."
  // },
  // {
  //   "id": 26,
  //   "name": "TasteBud Takeout",
  //   "area": "Mainland",
  //   "address": "12 Ketu Road, Ajegunle, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
  //   "description": "Everyday flavours to go.",
  //   "budget": "Budget (Min): 6,500 NGN",
  //   "details": "TasteBud Takeout delivers flavoursome fast-food and local dishes for a satisfying meal without breaking the bank."
  // },
  // {
  //   "id": 27,
  //   "name": "Garden View Terrace",
  //   "area": "Island",
  //   "address": "15 Bourdillon Road, Ikoyi, Lagos, Nigeria",
  //   "image": "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1189",
  //   "description": "Outdoor terrace dining.",
  //   "budget": "Budget (Min): 50,000 NGN",
  //   "details": "Garden View Terrace offers dining on a lush terrace in Ikoyi, with ambient lighting and a menu of fine grilled and fusion dishes."
  // },
  // {
  //   "id": 28,
  //   "name": "Mama’s Suya Spot",
  //   "area": "Mainland",
  //   "address": "53 Lagos Avenue, Agege, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1753045870533-15f35bbe1fed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  //   "description": "Street suya & smokey meat.",
  //   "budget": "Budget (Min): 4,000 NGN",
  //   "details": "Mama’s Suya Spot is a takeout spot famous for spicy suya and smoked meats. Casual stand with bold flavors and quick service."
  // },
  // {
  //   "id": 29,
  //   "name": "Pearl Fine Dining",
  //   "area": "Island",
  //   "address": "21 Awolowo Road, Ikoyi, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
  //   "description": "Luxury seafood & global cuisine.",
  //   "budget": "Budget (Min): 90,000 NGN",
  //   "details": "Pearl Fine Dining features elaborate dishes from global cuisine, fine seafood, and elegant interiors. Perfect for celebrations."
  // },
  // {
  //   "id": 30,
  //   "name": "Flame & Fire Grill",
  //   "area": "Mainland",
  //   "address": "140 Allen Avenue, Ikeja, Lagos, Nigeria",
  //   "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
  //   "description": "Barbecue & grilled favourites.",
  //   "budget": "Budget (Min): 25,000 NGN",
  //   "details": "Flame & Fire Grill serves barbecued meats, ribs, and grilled vegetables in a lively setting. A favourite for families and groups."
  // }