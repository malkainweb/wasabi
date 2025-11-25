// app/menu/page.tsx
// Server Component - No "use client"

import GeneralHeader from "@/app/Components/GeneralHeader";
import Footer from "@/app/Home/components/Footer";
import { OurMenu } from "./components/ourMenu";
import { supabase } from "../lib/supabase";
import NewMenu from "./components/NewMenu";

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

// Server Component - fetches data on the server before rendering
export default async function Page() {
  // Fetch menu data on the server
  // const menuItems = await getMenuItems();

  // console.log(menuItems);

  return (
    <div className="overflow-clip lg:overflow-visible">
      <GeneralHeader canShow={true} />
      <NewMenu />
      {/* <OurMenu initialData={menuItems} /> */}
      <Footer />
    </div>
  );
}
