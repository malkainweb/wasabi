import { supabase } from "./supabase";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: "DINNER" | "LUNCH" | "WINE";
  is_active: boolean;
  display_order: number;
}

// Fetch all menu items
export async function getMenuItems(category?: string) {
  let query = supabase
    .from("menu_items")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }

  return data as MenuItem[];
}

// Update a menu item
export async function updateMenuItem(id: string, updates: Partial<MenuItem>) {
  const { data, error } = await supabase
    .from("menu_items")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }

  return data;
}

// Create a new menu item
export async function createMenuItem(item: Omit<MenuItem, "id">) {
  const { data, error } = await supabase
    .from("menu_items")
    .insert([item])
    .select()
    .single();

  if (error) {
    console.error("Error creating menu item:", error);
    throw error;
  }

  return data;
}

// Delete a menu item (soft delete by setting is_active to false)
export async function deleteMenuItem(id: string) {
  const { error } = await supabase
    .from("menu_items")
    .update({ is_active: false })
    .eq("id", id);

  if (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
}

// Upload image to Supabase Storage
export async function uploadMenuImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()
    .toString(36)
    .substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("menu-images")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    throw uploadError;
  }

  // Get public URL
  const { data } = supabase.storage.from("menu-images").getPublicUrl(filePath);

  return data.publicUrl;
}
