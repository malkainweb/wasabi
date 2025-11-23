"use client";

import { categories } from "@/app/constants/menu-items";
import { MenuItem } from "@/app/types/menu";
import { Optima_bold } from "@/app/utils/font";

type SegmentedProps = {
  value: MenuItem["tag"];
  onChange: (v: MenuItem["tag"]) => void;
  className?: string;
};

export function Segmented({ value, onChange, className = "" }: SegmentedProps) {
  return (
    <div
      className={`flex items-center w-full md:justify-between  justify-evenly gap-1 rounded-[20px] backdrop-blur-md bg-black/40  md:p-2 px-1 py-2 shadow-[0_6px_20px_rgba(0,0,0,0.18)] ${className}`}
    >
      {categories.map((c) => {
        const active = c === value;
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`${
              Optima_bold.className
            } relative rounded-[16px] cursor-pointer px-3.5 py-2 w-full text-base tracking-[0.1em] transition ${
              active ? "bg-[#E9DFCF] text-[#C0A078]" : "text-[#E9DFCF]"
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
