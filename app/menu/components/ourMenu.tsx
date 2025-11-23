"use client";

import { useEffect, useMemo, useState } from "react";
import { forumFont, notoSansFont } from "@/app/utils/font";
import { MenuItem } from "@/app/types/menu";
import { MenuCard } from "./MenuCard";
import { Segmented } from "./Segmented";
import { MenuItemModal } from "./MenuItemModal";
import { EditableMenuItemModal } from "../../CmsComponents/EditableMenuItemModal";
import {
  updateMenuItem,
  uploadMenuImage,
  createMenuItem,
  deleteMenuItem,
} from "@/app/lib/menu-api";
import { isAuthenticated, signOut } from "@/app/lib/auth";

// Add props interface
interface OurMenuProps {
  initialData: any[]; // Menu items from server
}

export function OurMenu({ initialData }: OurMenuProps) {
  const [active, setActive] = useState<MenuItem["tag"]>("DINNER");
  const [selected, setSelected] = useState<any | null>(null);
  const [allItems, setAllItems] = useState(initialData);

  // Auth & Edit Mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const authenticated = await isAuthenticated();
    setIsEditMode(authenticated);
  };

  const handleLogout = async () => {
    await signOut();
    setIsEditMode(false);
  };

  // Use initialData instead of ALL_ITEMS
  const items = useMemo(
    () => allItems.filter((i) => i.category === active),
    [allItems, active]
  );

  const goBack = () => {
    window.history.back();
  };

  const handleCategoryChange = (newCategory: MenuItem["tag"]) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setActive(newCategory);
    }, 400);
  };

  // Handle item update
  const handleItemUpdate = async (updatedItem: any) => {
    setAllItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  // Handle item delete
  const handleItemDelete = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteMenuItem(itemId);
      setAllItems((prev) => prev.filter((item) => item.id !== itemId));
      setSelected(null);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  // Handle add new item
  const handleAddNew = () => {
    // Create a blank item for the modal - it will open in edit mode immediately
    const newItem = {
      id: "new", // Special ID to indicate this is a new item
      name: "New Menu Item",
      description: "Enter a delicious description here",
      price: 0,
      image_url: "", // Empty so user must upload
      category: active,
      is_active: true,
      display_order: items.length,
    };
    setSelected(newItem);
    setShowEditModal(true);
  };

  // Handle clicking menu card
  const handleCardClick = (item: any) => {
    setSelected(item);
    if (isEditMode) {
      setShowEditModal(true);
    }
  };

  return (
    <section className="w-full relative bg-[#FEFAF4] text-[#2B2218] mt-[7rem]">
      {/* top bar */}
      <div className="mx-auto w-full md:max-w-[95%] md:w-[100rem] pt-4 md:pt-0 px-[5%] md:px-3">
        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            className={`${notoSansFont.className} cursor-pointer rounded-[20px] bg-[#E9DFCF] px-4 py-2 text-sm text-[#3a3227]`}
          >
            BACK
          </button>

          <h2
            className={`${forumFont.className} text-[#3E2E1C] font-normal text-center text-2xl md:text-4xl`}
          >
            OUR MENU
          </h2>

          {/* Admin Controls */}
          {isEditMode && (
            <div className="flex items-center gap-2">
              <>
                {/* Add New Item Button */}
                <button
                  onClick={handleAddNew}
                  className={`${notoSansFont.className} flex items-center gap-2 cursor-pointer rounded-[20px] bg-[#C0A078] px-4 py-2 text-sm text-white hover:bg-[#b99c71] transition`}
                >
                  <i className="bi bi-plus-lg" />
                  <span className="hidden md:inline">ADD ITEM</span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className={`${notoSansFont.className} cursor-pointer rounded-[20px] bg-[#E9DFCF] px-4 py-2 text-sm text-[#3a3227] hover:bg-[#d9cfbf] transition`}
                >
                  LOGOUT
                </button>
              </>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto md:max-w-[95%] md:w-[100rem] md:border-none border-t border-t-[#E9DFCF] w-full px-3 md:mt-7 mt-2 relative">
        <div className="grid lg:grid-cols-3 grid-cols-2 pb-8">
          {items.map((item, index) => (
            <div key={`m-${item.id}`} className="relative  group">
              <MenuCard index={index} item={item} onClick={handleCardClick} />

              {/* Edit/Delete overlay - only visible in edit mode */}
              {isEditMode && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all pointer-events-none">
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(item);
                        setShowEditModal(true);
                      }}
                      className="w-8 h-8 rounded-full bg-[#C0A078] text-white flex items-center justify-center hover:bg-[#b99c71] transition"
                      title="Edit item"
                    >
                      <i className="bi bi-pencil text-sm" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemDelete(item.id);
                      }}
                      className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
                      title="Delete item"
                    >
                      <i className="bi bi-trash text-sm" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-4 mb-14 w-full left-0 z-20 flex justify-center">
        <Segmented
          value={active}
          onChange={handleCategoryChange}
          className="max-w-[90%] md:w-[25rem] w-full"
        />
      </div>

      {/* Regular view modal - for non-edit mode */}
      {selected && !showEditModal && (
        <MenuItemModal item={selected} onClose={() => setSelected(null)} />
      )}

      {/* Editable modal - for edit mode */}
      {selected && showEditModal && (
        <EditableMenuItemModal
          item={selected}
          onClose={() => {
            setSelected(null);
            setShowEditModal(false);
          }}
          onSave={handleItemUpdate}
          isEditMode={isEditMode}
        />
      )}
    </section>
  );
}
