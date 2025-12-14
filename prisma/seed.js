const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function main() {
  const restaurants = [
    {
      id: 1,
      name: "Ocean Basket Victoria Island",
      area: "Island",
      address: "Ahmadu Bello Way, Victoria Island, Lagos",
      image: "https://source.unsplash.com/800x600/?restaurant,seafood",
      details: "Ocean Basket is a popular seafood restaurant located in Victoria Island, Lagos. Known for its fresh seafood dishes and vibrant atmosphere, it offers a variety of options including sushi, grilled fish, and seafood platters. The restaurant features a modern interior with ocean-themed decor, creating a relaxing dining experience. Ocean Basket is ideal for both casual meals and special occasions, providing excellent service and a diverse menu that caters to different tastes. Whether you're craving sushi or a hearty seafood meal, Ocean Basket is a great choice for seafood lovers in Lagos.",
      budget: "30,000 NGN",
    },
    {
      id: 2,
      name: "The Place Ikeja",
      area: "Mainland",
      address: "Isaac John Street, Ikeja GRA, Lagos",
      image: "https://source.unsplash.com/800x600/?restaurant,interior",
      details: "The Place Ikeja is a well-known restaurant located in Ikeja, Lagos. It is popular for its diverse menu that offers a mix of continental and local Nigerian dishes. The restaurant features a cozy and inviting atmosphere, making it a great spot for both casual dining and special occasions. The Place Ikeja is known for its friendly service and delicious food, with popular dishes including jollof rice, grilled chicken, and various seafood options. It also offers a selection of beverages and desserts to complement your meal. Whether you're looking for a quick lunch or a leisurely dinner, The Place Ikeja provides a satisfying dining experience in the heart of Lagos.",
      budget: "30,000 NGN",
    },
    {
      id: 3,
      name: "RSVP Lagos",
      area: "Island",
      address: "Ozumba Mbadiwe Ave, Victoria Island, Lagos",
      image: "https://source.unsplash.com/800x600/?dining,restaurant",
      details: "Upscale spot with modern cuisine.",
    },
    {
      id: 4,
      name: "Yellow Chilli",
      area: "Mainland",
      address: "Joel Ogunaike St, Ikeja, Lagos",
      image: "https://images.unsplash.com/photo-1673185180955-bb5d3e6b2a51?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1827",
      details: "Yellow Chilli is a renowned restaurant located in Ikeja, Lagos, known for its contemporary take on Nigerian and African cuisine. The restaurant offers a vibrant and stylish atmosphere, making it a popular choice for both casual dining and special occasions. Yellow Chilli's menu features a variety of traditional dishes with a modern twist, including favorites like jollof rice, pounded yam with egusi soup, and suya. The restaurant is also praised for its excellent service and attention to detail. With its flavorful dishes and inviting ambiance, Yellow Chilli provides a memorable dining experience that celebrates the rich culinary heritage of Nigeria.",
      budget: "Budget (Min): 25,000 NGN",
    },
    {
      id: 5,
      name: "Bungalow Restaurant",
      area: "Island",
      address: "Victoria Island, Lagos",
      image: "https://source.unsplash.com/800x600/?food,restaurant",
      details: "Cozy spot for brunch and dinner.",
    },
    {
      id: 6,
      name: "Shiro Lagos",
      area: "Island",
      address: "Victoria Island, Lagos",
      image: "https://source.unsplash.com/800x600/?asian,restaurant",
      details: "Asian fusion restaurant with a lively bar.",
    },
    {
      id: 7,
      name: "Nkoyo",
      area: "Mainland",
      address: "Victoria Island / Main",
      image: "https://source.unsplash.com/800x600/?restaurant,africa",
      details: "Known for warm ambiance and contemporary dishes.",
    },
    {
      id: 8,
      name: "Craft Gourmet by Lou Baker",
      area: "Mainland",
      address: "Ikeja, Lagos",
      image: "https://source.unsplash.com/800x600/?cafe,restaurant",
      details: "Nice pastries and casual dining.",
    },
    {
      id: 9,
      name: "The Grill by Delis",
      area: "Island",
      address: "Victoria Island, Lagos",
      image: "https://source.unsplash.com/800x600/?grill,restaurant",
      details: "Great steaks and cozy atmosphere.",
    },
    {
      id: 10,
      name: "Bistro 7",
      area: "Mainland",
      address: "Yaba, Lagos",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
      details: "Casual bistro for quick meals and coffee.",
    },
    {
      id: 11,
      name: "Le Petit Gourmet",
      area: "Island",
      address: "19 Bourdillon Road, Ikoyi, Lagos, Nigeria",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
      details: "Le Petit Gourmet offers refined French fusion cuisine in an elegant setting in Ikoyi. Ideal for special occasions and romantic dinners, with fine wines and exquisite service."
    },
  {
    id: 12,
    name: "Spice Route Grill",
    area: "Mainland",
    address: "45 Bode Thomas Street, Surulere, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
    details: "Spice Route Grill is a casual grill house in Surulere offering spice-forward dishes, grilled meats and hearty bowls. Great spot for lunch or relaxed dinner."
  },
  {
    id: 13,
    name: "Ocean’s Edge Fine Dining",
    area: "Island",
    address: "6A Alfred Rewane Road, Ikoyi, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
    details: "Ocean’s Edge is a premium seafood restaurant with panoramic views of the Lagos skyline. Known for fresh catches, sushi platters, and elevated dining experience."
  },
  {
    id: 14,
    name: "Mama’s Kitchen Express",
    area: "Mainland",
    address: "22 Allen Avenue, Ikeja, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1742599361498-79824d24e355?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
    details: "Mama’s Kitchen Express serves quick, homestyle Nigerian dishes for takeout or delivery. Perfect when you want comfort food without the wait."
  },
  {
    id: 15,
    name: "The Vineyard Lounge",
    area: "Island",
    address: "3A Gerald Road, GRA, Ikeja, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
    details: "The Vineyard Lounge is a stylish lounge offering fusion cuisine and a curated wine list. Located in the GRA/Ikeja area, ideal for evening drinks and upscale dining."
  },
  {
    id: 16,
    name: "Burger Patrol",
    area: "Mainland",
    address: "10 Allen Avenue, Ikeja, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1629471722874-13d4208d62ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1176",
    details: "Burger Patrol offers mouthwatering gourmet burgers, loaded fries, and shakes. A go-to for takeout and casual hangouts."
  },
  {
    id: 17,
    name: "Taste of Tuscany",
    area: "Island",
    address: "27 Adeola Odeku, Victoria Island, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
    details: "Taste of Tuscany brings the warmth of Italian dining to Lagos with handmade pastas, wood-fired pizzas, and elegant interior."
  },
  {
    id: 18,
    name: "Wrap & Roll Street",
    area: "Mainland",
    address: "73B Allen Avenue, Ikeja, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
    details: "Wrap & Roll Street is a takeout spot in Ikeja offering fresh wraps, rolls, and sides. Perfect for lunch or on-the-go dinners."
  },
  {
    id: 19,
    name: "The Orchid Restaurant",
    area: "Island",
    address: "9A Ligali Ayorinde, Victoria Island, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1702827496398-b906ab2dd926?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1209",
    details: "The Orchid Restaurant offers an exclusive fine dining environment with gourmet multi-course meals, exceptional service, and a serene floral décor."
  },
  {
    id: 20,
    name: "Mama Jollof’s Takeaway",
    area: "Mainland",
    address: "5 Opebi Road, Ikeja, Lagos, Nigeria",
    image: "https://plus.unsplash.com/premium_photo-1694141251686-16828ed92b3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    details: "Mama Jollof’s Takeaway specializes in local rice dishes like jollof, fried rice, and stew, served fast and affordable for everyday meals."
  },
  {
    id: 21,
    name: "Azure Sky Bistro",
    area: "Island",
    address: "12 Paul Ogunbade Street, Ikoyi, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
    details: "Azure Sky Bistro combines light European-inspired meals in a chic and airy bistro atmosphere, perfect for brunch or business lunch."
  },
  {
    id: 22,
    name: "Pepperoni Pizza Co.",
    area: "Mainland",
    address: "24 Lawanson Road, Surulere, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
    details: "Pepperoni Pizza Co. serves classic and specialty pizzas, both dine-in and fast takeaway. A hit with families and students."
  },
  {
    id: 23,
    name: "Sapphire Lounge",
    area: "Island",
    address: "4A Broad Street, Victoria Island, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1629471722874-13d4208d62ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1176",
    description: "Cocktail lounges and small plates.",
    budget: "Budget (Min): 45,000 NGN",
    details: "Sapphire Lounge offers creative cocktails and small plates in a refined, relaxed atmosphere. Ideal for evening socializing."
  },
  {
    id: 24,
    name: "Quick Bites Hub",
    area: "Mainland",
    address: "48 Oshodi Road, Mushin, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
    details: "Quick Bites Hub offers fast takeout options—burgers, fries, wraps—for people in a rush. Convenient location and quick service."
  },
  {
    id: 25,
    name: "Elegance Steakhouse",
    area: "Island",
    address: "8 Amore Street, Ikoyi, Lagos, Nigeria",
    image: "https://plus.unsplash.com/premium_photo-1723672929404-36ba6ed8ab50?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1063",
    details: "Elegance Steakhouse is a premium fine dining restaurant offering top-tier steaks, wine pairings, and refined service."
  },
  {
    id: 26,
    name: "TasteBud Takeout",
    area: "Mainland",
    address: "12 Ketu Road, Ajegunle, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
    details: "TasteBud Takeout delivers flavoursome fast-food and local dishes for a satisfying meal without breaking the bank."
  },
  {
    id: 27,
    name: "Garden View Terrace",
    area: "Island",
    address: "15 Bourdillon Road, Ikoyi, Lagos, Nigeria",
    image: "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1189",
    details: "Garden View Terrace offers dining on a lush terrace in Ikoyi, with ambient lighting and a menu of fine grilled and fusion dishes."
  },
  {
    id: 28,
    name: "Mama’s Suya Spot",
    area: "Mainland",
    address: "53 Lagos Avenue, Agege, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1753045870533-15f35bbe1fed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    details: "Mama’s Suya Spot is a takeout spot famous for spicy suya and smoked meats. Casual stand with bold flavors and quick service."
  },
  {
    id: 29,
    name: "Pearl Fine Dining",
    area: "Island",
    address: "21 Awolowo Road, Ikoyi, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
    details: "Pearl Fine Dining features elaborate dishes from global cuisine, fine seafood, and elegant interiors. Perfect for celebrations."
  },
  {
    id: 30,
    name: "Flame & Fire Grill",
    area: "Mainland",
    address: "140 Allen Avenue, Ikeja, Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=870",
    details: "Flame & Fire Grill serves barbecued meats, ribs, and grilled vegetables in a lively setting. A favourite for families and groups."
  }
  ];

  for (const r of restaurants) {
    await prisma.restaurant.upsert({
      where: { id: r.id },
      update: {},
      create: r,
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
