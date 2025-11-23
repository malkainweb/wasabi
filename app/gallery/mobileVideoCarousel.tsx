"use client";

import Image, { StaticImageData } from "next/image";
import { Play } from "lucide-react";
import { forumFont, notoSansFont } from "@/app/utils/font";
import React from "react";

type VideoItem = {
  id?: string | number;
  title?: string; // Make optional
  author?: string; // Make optional
  thumbnail: StaticImageData | string;
  href?: string;
  onClick?: () => void;
};
// export const galleryImagesMobile: VideoItem[] = [
//   {
//     thumbnail: firstImage,
//     title: "STACYS WEDDING PROPOSAL",
//     author: "by kelvin adams",
//     href: "#",
//   },
//   {
//     thumbnail: secondImage,
//     title: "STACYS WEDDING PROPOSAL",
//     author: "by kelvin adams",
//     href: "#",
//   },
//   {
//     thumbnail: thirdImage,
//     title: "STACYS WEDDING PROPOSAL",
//     author: "by kelvin adams",
//     href: "#",
//   },
//   {
//     thumbnail: fourthImage,
//     title: "STACYS WEDDING PROPOSAL",
//     author: "by kelvin adams",
//     href: "#",
//   },
//   {
//     thumbnail: fifthImage,
//     title: "STACYS WEDDING PROPOSAL",
//     author: "by kelvin adams",
//     href: "#",
//   },
//   {
//     thumbnail: sixthImage,
//     title: "STACYS WEDDING PROPOSAL",
//     author: "by kelvin adams",
//     href: "#",
//   },
// ];

function VideoCard({ item }: { item: VideoItem }) {
  const handleClick = () => {
    if (item.onClick) return item.onClick();
    if (item.href) window.open(item.href, "_blank");
  };

  return (
    <div
      className="rounded-[1.25rem] bg-[#E9DECA] p-1.5 sm:p-2 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
      role="group"
    >
      {/* thumb */}
      <div className="relative overflow-hidden rounded-3xl aspect-[1/1.3]">
        <Image
          src={item.thumbnail}
          alt={item.title || "Gallery image"} // Fallback alt text
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function VideoGallery({
  items,
  className = "",
  showdivider = true,
}: {
  items: VideoItem[];
  className?: string;
  showdivider?: Boolean;
}) {
  return (
    <section className={`w-full  ${className}`}>
      {/* optional divider to match screenshot */}
      {showdivider && (
        <div className="mx-4 mb-12  -mt-4 h-[1px] bg-[#E9DECA]" />
      )}

      <div className="px-3  mb-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {items.map((item, i) => (
            <VideoCard key={item.id ?? i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
