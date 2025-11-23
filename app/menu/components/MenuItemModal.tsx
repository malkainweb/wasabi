"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { notoSansFont, Optima_bold } from "@/app/utils/font";
import { X } from "lucide-react";
import { MenuItem } from "@/app/types/menu";

type MenuItemModalProps = {
  item: any;
  onClose: () => void;
};

export function MenuItemModal({ item, onClose }: MenuItemModalProps) {
  const [startAnime, setstartAnime] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Hide overflow on mount, restore on unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    setstartAnime(true);
  }, []);

  const close = () => {
    setstartAnime(false);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{ transition: "0.7s ease" }}
        className={`fixed inset-0 z-[1000000]  md:pb-0 flex justify-center items-end pb-[5%] md:items-center ${
          startAnime ? "backdrop-blur-2xl bg-black/60" : "bg-black-0"
        }`}
        onClick={close}
      >
        {/* Panel: bottom sheet on mobile, centered on desktop */}
        <div
          style={{ transition: "0.7s ease", opacity: startAnime ? 1 : 0 }}
          className={`w-[30rem] max-w-[90%] relative  py-4 rounded-4xl bg-[#FEFAF4] shadow-2xl   ${
            startAnime ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4.5 left-4.5 h-8 w-8 p-1.5 flex items-center justify-center rounded-full bg-[#E9DFCF] text-[#8B724F]"
          >
            <X stroke="black" />
          </button>

          {/* Image */}
          <div className="pt-16  md:pt-10 px-5 md:px-8 py-7">
            <div className="mx-auto -mt-10 md:-mt-4 mb-2 w-[170px] md:w-[220px] aspect-square rounded-full overflow-hidden">
              <Image
                src={item.image_url}
                alt={item.name}
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Text block */}
          <div className="border-t-[0.5px] border-black/10" />
          <div className="px-5 md:px-6 pb-5 md:pb-6">
            <div className="flex items-center justify-between gap-3 pt-3">
              <h3
                className={`${Optima_bold.className} font-semibold tracking-[0.22em] uppercase text-[#1e1b16] text-sm md:text-base`}
              >
                {item.name}
              </h3>
              <span
                className={`${notoSansFont.className} font-semibold text-[#443d33] text-base`}
              >
                ${item.price.toFixed(2)}
              </span>
            </div>

            <p
              className={`${notoSansFont.className} mt-2 text-xs md:text-sm leading-5 tracking-wide text-black/70`}
            >
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
