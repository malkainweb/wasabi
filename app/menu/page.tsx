// app/menu/page.tsx
// Server Component - No "use client"

import type { Metadata } from "next";
import GeneralHeader from "@/app/Components/GeneralHeader";
import Footer from "@/app/Home/components/Footer";
import { OurMenu } from "./components/ourMenu";
import { supabase } from "../lib/supabase";

export const revalidate = 100;

// Fetch menu items on the server
async function getMenuItems() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }

  return data || [];
}

// 🎯 DYNAMIC METADATA GENERATION
export async function generateMetadata(): Promise<Metadata> {
  // Fetch current menu items
  const menuItems = await getMenuItems();

  // Select featured items strategically (2 dinner, 1 lunch, 1 wine)
  const dinnerItems = menuItems
    .filter((item) => item.category === "DINNER")
    .slice(0, 2);
  const lunchItems = menuItems
    .filter((item) => item.category === "LUNCH")
    .slice(0, 1);
  const wineItems = menuItems
    .filter((item) => item.category === "WINE")
    .slice(0, 1);

  // Combine featured items
  const featured = [...dinnerItems, ...lunchItems, ...wineItems].filter(
    Boolean
  );

  // Create dynamic dish list for title
  const dishNames = featured.map((item) => item.name).join(", ");

  // Count items per category for description
  const dinnerCount = menuItems.filter((i) => i.category === "DINNER").length;
  const lunchCount = menuItems.filter((i) => i.category === "LUNCH").length;
  const wineCount = menuItems.filter((i) => i.category === "WINE").length;

  // Fallback if no items exist
  const hasDishes = featured.length > 0;

  // Get first featured dish image for OG (or use default)
  const featuredImage = featured[0]?.image_url || "/logo.webp";

  return {
    title: hasDishes
      ? `Menu – ${dishNames} & More | Wasabi Modern Kitchen`
      : "Menu – Japanese Fine Dining | Wasabi Modern Kitchen",

    description: hasDishes
      ? `Discover our curated Japanese menu featuring ${dishNames}. ${dinnerCount} dinner selections, ${lunchCount} lunch options, ${wineCount} wine pairings. Each dish crafted with premium ingredients, bold flavors, and refined technique. From Tokyo-inspired sushi to modern kaiseki—experience gourmet bliss in Kamloops, BC.`
      : "Explore our handpicked selection of Japanese-inspired dishes crafted with premium ingredients, bold flavors, and refined technique. From sushi and sashimi to modern culinary creations—a dining experience where tradition meets innovation.",

    keywords: [
      "Wasabi menu",
      "Japanese restaurant menu Kamloops",
      "sushi menu BC",
      "Japanese fine dining menu",
      "dinner menu Kamloops",
      "lunch menu Japanese",
      "wine pairings Japanese food",
      "modern Japanese cuisine menu",
      "Kamloops restaurant menu",
      ...(featured.map((item) => item.name.toLowerCase()) || []),
    ],

    openGraph: {
      title: hasDishes
        ? `Our Menu – ${dishNames} & More Awaits`
        : "Our Menu – Japanese Fine Dining Awaits",

      description: hasDishes
        ? `Currently featuring: ${dishNames}. ${
            dinnerCount + lunchCount + wineCount
          } expertly crafted dishes that blend Tokyo tradition with modern artistry. Every plate is a statement of taste, elegance, and fire. View our full menu and reserve your table in Kamloops, BC.`
        : "Discover a handpicked selection of Japanese-inspired dishes. From signature sushi to bold modern creations—experience dining that's both art and indulgence.",

      url: "https://wasabimodernkitchen.com/menu",
      siteName: "Wasabi Modern Kitchen",
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: hasDishes
            ? `Featured dish: ${featured[0]?.name} at Wasabi Modern Kitchen`
            : "Wasabi Modern Kitchen menu - Japanese fine dining",
          type: "image/webp",
        },
      ],
      locale: "en_CA",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: hasDishes
        ? `Menu – ${featured[0]?.name}, ${featured[1]?.name} & More`
        : "Menu – Japanese Fine Dining in Kamloops",

      description: hasDishes
        ? `${
            dinnerCount + lunchCount + wineCount
          } dishes. Endless moments. From ${
            featured[0]?.name
          } to exquisite wine pairings—explore our curated Japanese menu.`
        : "Explore our curated menu of Japanese-inspired dishes—where bold flavors meet refined technique.",

      images: [featuredImage],
      creator: "@wasabikitchen",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    other: {
      "og:image:alt": hasDishes
        ? `${featured[0]?.name} - signature dish at Wasabi Modern Kitchen`
        : "Wasabi Modern Kitchen Japanese fine dining menu",
    },
  };
}

// Server Component - fetches data on the server before rendering
export default async function Page() {
  // Fetch menu data on the server
  const menuItems = await getMenuItems();

  return (
    <div className="overflow-clip lg:overflow-visible">
      <GeneralHeader canShow={true} />
      <OurMenu initialData={menuItems} />
      <Footer />
    </div>
  );
}
