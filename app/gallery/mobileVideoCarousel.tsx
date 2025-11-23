"use client";

import Image, { StaticImageData } from "next/image";
import { Play } from "lucide-react";
import { forumFont, notoSansFont } from "@/app/utils/font";
import React from "react";

import gallery1 from "@/public/gallery/gallery1.webp";
import gallery2 from "@/public/gallery/gallery2.webp";
import gallery3 from "@/public/gallery/gallery3.webp";
import gallery4 from "@/public/gallery/gallery4.webp";
import gallery5 from "@/public/gallery/gallery5.webp";
import playIcon from "@/public/gallery/playIcon.webp";
import firstImage from "@/public/gallery/firstImageOutside.webp";
import secondImage from "@/public/gallery/secondImageBuild.webp";
import thirdImage from "@/public/gallery/chairsOutside.webp";
import fourthImage from "@/public/gallery/desert.webp";
import fifthImage from "@/public/gallery/beach.webp";
import sixthImage from "@/public/gallery/boatLove.webp";

type VideoItem = {
  id?: string | number;
  title: string;
  author: string; // e.g. "kelvin adams"
  thumbnail: StaticImageData | string;
  href?: string; // optional link to video
  onClick?: () => void; // optional handler instead of href
};

export const galleryImagesMobile: VideoItem[] = [
  {
    thumbnail: firstImage,
    title: "STACYS WEDDING PROPOSAL",
    author: "by kelvin adams",
    href: "#",
  },
  {
    thumbnail: secondImage,
    title: "STACYS WEDDING PROPOSAL",
    author: "by kelvin adams",
    href: "#",
  },
  {
    thumbnail: thirdImage,
    title: "STACYS WEDDING PROPOSAL",
    author: "by kelvin adams",
    href: "#",
  },
  {
    thumbnail: fourthImage,
    title: "STACYS WEDDING PROPOSAL",
    author: "by kelvin adams",
    href: "#",
  },
  {
    thumbnail: fifthImage,
    title: "STACYS WEDDING PROPOSAL",
    author: "by kelvin adams",
    href: "#",
  },
  {
    thumbnail: sixthImage,
    title: "STACYS WEDDING PROPOSAL",
    author: "by kelvin adams",
    href: "#",
  },
];

function VideoCard({ item }: { item: VideoItem }) {
  const handleClick = () => {
    if (item.onClick) return item.onClick();
    if (item.href) window.open(item.href, "_blank");
  };

  return (
    <div
      className="rounded-[1.25rem]  bg-[#E9DECA] p-1.5 sm:p-2 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
      role="group"
    >
      {/* thumb */}
      <div className="relative overflow-hidden  rounded-3xl aspect-[1.15/1]">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover"
          unoptimized
        />
        <button
          onClick={handleClick}
          aria-label={`Play ${item.title}`}
          className="absolute inset-0 grid place-items-center focus:outline-none"
        >
          <span className="rounded-full bg-white/85 shadow-md grid place-items-center transition group-hover:scale-105">
            <Image
              src={playIcon}
              width={200}
              height={200}
              alt="play icon"
              className="size-8"
            />
          </span>
        </button>
      </div>

      {/* text */}
      <div className="pt-3 px-1.5 pb-3 font-medium">
        <h3
          className={`text-xs font-medium leading-snug uppercase tracking-[0.12em] text-[#2B2218] ${notoSansFont.className}`}
        >
          {item.title}
        </h3>
        <p
          className={`mt-1 text-[12px] text-[#574C3E]/90 ${notoSansFont.className}`}
        >
          By {item.author}
        </p>
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
