"use client";

import Image from "next/image";
import { forumFont, notoSansFont } from "@/app/utils/font";

import basil from "@/public/home/menu/basil.webp";
import chesseCake from "@/public/home/menu/chesseCake.webp";
import mochi from "@/public/home/menu/mochi.webp";
import pumpkin from "@/public/home/menu/pumpkin.webp";
import safron from "@/public/home/menu/safron.webp";
import steak from "@/public/home/menu/steak.webp";
import Link from "next/link";

export function MenuMobile() {
  const tiles = [
    { src: chesseCake, name: "CHEESECAKE" },
    { src: mochi, name: "MOCHI TRIO" },
    { src: steak, name: "STEAK" },
    { src: basil, name: "Basil" },
    { src: pumpkin, name: "Pumpkin" },
    { src: safron, name: "Safron" },
  ];

  return (
    <section className="md:hidden w-full py-14 bg-black text-[#E9DFCF] ">
      <div className="px-5">
        <h1
          className={`${forumFont.className} text-center uppercase tracking-[0.22em] leading-tight`}
          style={{ fontSize: "clamp(8.6vw, 8.5vw, 3rem)" }}
        >
          <span className="text-nowrap block">BROWSE OUR</span>
          <span className="text-nowrap block">CURATED MENU</span>
        </h1>
      </div>
      <div className="mt-1 h-[0.6px] w-full bg-[#E9DFCF]/20" />

      {/* ---- Marquee (seamless, single row) ---- */}
      <div className="mt-5">
        <div className="relative w-full overflow-hidden">
          <div className="mx-auto will-change-transform">
            <div className="flex items-center gap-4 w-full relative overflow-hidden min-h-[18rem] scrollX-container">
              {tiles.map((t, i) => (
                <div
                  key={`A-${i}`}
                  className="flex flex-col items-center    shrink-0 w-[13rem] aspect-square absolute scrollX"
                  style={{
                    animationDelay: `${(30 / 6) * (6 - i) * -1}s`,
                  }}
                >
                  <div className="w-full aspect-square overflow-hidden ">
                    <Image
                      src={t.src}
                      alt={t.name}
                      className="h-full w-full object-cover"
                      priority={i < 3}
                    />
                  </div>
                  <p
                    className={`${forumFont.className} mt-6 text-sm tracking-[0.2em] uppercase text-[#E9DFCF]/90 text-center`}
                  >
                    {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 ">
        <p
          className={`${notoSansFont.className} text-center text-sm leading-[140%] tracking-[0.12em] text-[#E9DFCF]`}
        >
          <span className="block text-nowrap">
            Discover A Handpicked Selection
          </span>{" "}
          <span className="block text-nowrap">
            Of Dishes Crafted With Premium
          </span>
          <span className="text-nowrao block">
            Ingredients, Bold Flavors, And
          </span>{" "}
          Refined Technique
        </p>

        <div className="mt-5 flex justify-center">
          <button
            className={`${notoSansFont.className} rounded-full bg-[#C0A078] px-7 py-3 text-[#1A140D] font-semibold text-sm tracking-[0.12em] hover:brightness-95 transition`}
          >
            <Link href="/menu">SEE MENU</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
