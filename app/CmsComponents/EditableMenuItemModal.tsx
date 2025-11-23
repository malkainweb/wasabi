"use client";

import { useEffect, useState } from "react";
import { notoSansFont, forumFont } from "@/app/utils/font";
import Image from "next/image";
import {
  updateMenuItem,
  uploadMenuImage,
  createMenuItem,
} from "@/app/lib/menu-api";

interface EditableMenuItemModalProps {
  item: any;
  onClose: () => void;
  onSave: (updatedItem: any) => void;
  isEditMode: boolean;
}

export function EditableMenuItemModal({
  item,
  onClose,
  onSave,
  isEditMode,
}: EditableMenuItemModalProps) {
  const isNewItem = item.id === "new";
  const [isEditing, setIsEditing] = useState(isNewItem);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form state
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price?.toString() || "0");
  const [imageUrl, setImageUrl] = useState(item.image_url);
  const [category, setCategory] = useState(item.category || "DINNER");

  // Image preview state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(item.image_url || "");

  // Hide overflow when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setSelectedFile(file);
  };

  const handleSave = async () => {
    // Validation
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }
    if (!previewUrl && !imageUrl) {
      alert("Please select an image");
      return;
    }
    if (!price || parseFloat(price) < 0) {
      alert("Please enter a valid price");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      let finalImageUrl = imageUrl;

      // Upload image if a new file was selected
      if (selectedFile) {
        setUploadProgress(10);
        finalImageUrl = await uploadMenuImage(selectedFile);
        setUploadProgress(50);
      }

      let savedItem;
      setUploadProgress(70);

      if (isNewItem) {
        // Create new item
        savedItem = await createMenuItem({
          name,
          description,
          price: parseFloat(price),
          image_url: finalImageUrl,
          category: category,
          is_active: true,
          display_order: item.display_order,
        });
      } else {
        // Update existing item
        savedItem = await updateMenuItem(item.id, {
          name,
          description,
          price: parseFloat(price),
          image_url: finalImageUrl,
          category: category,
        });
      }

      setUploadProgress(100);
      onSave(savedItem);
      setIsEditing(false);
      onClose();

      // Reload the page after save
      window.location.reload();
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Failed to save changes");
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FEFAF4] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#E9DFCF] text-[#3a3227] transition hover:bg-[#d9cfbf]"
        >
          <i className="bi bi-x text-2xl" />
        </button>

        {/* Edit button */}
        {isEditMode && !isEditing && !isNewItem && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#C0A078] px-4 py-2 text-sm text-white transition hover:bg-[#b99c71]"
          >
            <i className="bi bi-pencil" />
            Edit
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-6 mt-8">
          <h2
            className={`text-3xl font-medium text-[#3E2E1C] ${forumFont.className}`}
          >
            {isNewItem ? "Add New Item" : isEditing ? "Edit Item" : name}
          </h2>
        </div>

        <div className="space-y-6">
          {/* Image Section */}
          <div>
            <label
              className={`block text-sm font-medium text-[#3E2E1C] mb-2 ${notoSansFont.className}`}
            >
              Image
            </label>
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <i className="bi bi-image text-6xl text-gray-300" />
                </div>
              )}

              {isEditing && (
                <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 hover:bg-black/50 transition">
                  <div className="text-center text-white opacity-0 hover:opacity-100 transition">
                    <i className="bi bi-camera text-4xl mb-2" />
                    <div className="text-sm">
                      {previewUrl ? "Change" : "Upload"}
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label
              className={`block text-sm font-medium text-[#3E2E1C] mb-2 ${notoSansFont.className}`}
            >
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-lg border border-[#E9DFCF] bg-white px-4 py-3 text-[#3E2E1C] focus:border-[#C0A078] focus:outline-none ${notoSansFont.className}`}
                placeholder="Item name"
              />
            ) : (
              <p className={`text-xl text-[#2B2218] ${notoSansFont.className}`}>
                {name}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label
              className={`block text-sm font-medium text-[#3E2E1C] mb-2 ${notoSansFont.className}`}
            >
              Category
            </label>
            {isEditing ? (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full rounded-lg border border-[#E9DFCF] bg-white px-4 py-3 text-[#3E2E1C] focus:border-[#C0A078] focus:outline-none ${notoSansFont.className}`}
              >
                <option value="DINNER">Dinner</option>
                <option value="LUNCH">Lunch</option>
                <option value="WINE">Wine</option>
              </select>
            ) : (
              <p className={`text-xl text-[#2B2218] ${notoSansFont.className}`}>
                {category}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              className={`block text-sm font-medium text-[#3E2E1C] mb-2 ${notoSansFont.className}`}
            >
              Price
            </label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <span className="text-xl text-[#3E2E1C]">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`w-32 rounded-lg border border-[#E9DFCF] bg-white px-4 py-3 text-[#3E2E1C] focus:border-[#C0A078] focus:outline-none ${notoSansFont.className}`}
                  placeholder="0.00"
                />
              </div>
            ) : (
              <p className="text-2xl font-medium text-[#C0A078]">
                ${parseFloat(price).toFixed(2)}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              className={`block text-sm font-medium text-[#3E2E1C] mb-2 ${notoSansFont.className}`}
            >
              Description
            </label>
            {isEditing ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full rounded-lg border border-[#E9DFCF] bg-white px-4 py-3 text-[#3E2E1C] focus:border-[#C0A078] focus:outline-none resize-none ${notoSansFont.className}`}
                placeholder="Description"
              />
            ) : (
              <p className={`text-[#574C3E]/90 ${notoSansFont.className}`}>
                {description}
              </p>
            )}
          </div>

          {/* Upload Progress Bar */}
          {loading && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span
                  className={`text-[#3E2E1C] font-medium ${notoSansFont.className}`}
                >
                  {uploadProgress < 50
                    ? "Uploading image..."
                    : uploadProgress < 80
                    ? "Saving item..."
                    : "Almost done..."}
                </span>
                <span
                  className={`text-[#C0A078] font-bold ${notoSansFont.className}`}
                >
                  {uploadProgress}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C0A078] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-4">
              {!isNewItem && (
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                  className={`flex-1 rounded-lg border border-[#E9DFCF] bg-white px-6 py-3 font-medium text-[#3E2E1C] transition hover:bg-[#E9DFCF] disabled:opacity-50 ${notoSansFont.className}`}
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={loading}
                className={`${
                  isNewItem ? "w-full" : "flex-1"
                } rounded-lg bg-[#C0A078] px-6 py-3 font-medium text-white transition hover:bg-[#b99c71] disabled:opacity-50 ${
                  notoSansFont.className
                }`}
              >
                {loading ? "Saving..." : isNewItem ? "Add Item" : "Save"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
