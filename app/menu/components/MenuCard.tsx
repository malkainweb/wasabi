"use client";

import Image from "next/image";
import { notoSansFont, Optima_bold } from "@/app/utils/font";
import { MenuItem } from "@/app/types/menu";

type MenuCardProps = {
  item: any;
  onClick?: (item: MenuItem) => void;
  index: number;
};

export function MenuCard({ item, onClick, index }: MenuCardProps) {
  return (
    <article
      onClick={() => onClick?.(item)}
      className={` group   cursor-pointer h-full justify-between md:border border-[#E9DFCF]  bg-[#FEFAF4] backdrop-blur-[2px] flex flex-col -m-[0.2px] ${
        index == 1 || index == 0
          ? "border-x  border-x-[#E9DFCF]"
          : "border border-[#E9DFCF]"
      } `}
      role="button"
      aria-label={item.title}
    >
      <div className="mx-auto mb-4  grid place-items-center  py-6">
        <div className="relative   w-[120px] md:w-[60%] overflow-hidden rounded-full">
          <Image
            src={item.image_url}
            alt={item.name}
            width={200}
            height={200}
            className="h-full w-full   object-cover rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col   border-t border-t-[#E9DFCF] w-full  p-2 md:p-4   h-fit">
        <div className="flex items-start md:flex-row flex-col justify-between md:gap-3">
          <h3
            className={`${Optima_bold.className} max-w-full truncate  mb-1 text-sm tracking-[0.1em] uppercase `}
          >
            {item.name}
          </h3>
          <span
            className={`${notoSansFont.className} font-medium   text-sm  text-[black]/60`}
          >
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p
          className={`${notoSansFont.className}   truncate mt-2 hidden md:block text-xs leading-5 tracking-wide text-black/60 line-clamp-1`}
        >
          {item.description}
        </p>
      </div>
    </article>
  );
}
