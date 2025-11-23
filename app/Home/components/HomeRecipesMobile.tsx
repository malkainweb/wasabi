"use client";

import Image from "next/image";
import Link from "next/link";
import { forumFont, notoSansFont } from "@/app/utils/font";

import RecipeOne from "@/public/home/recipes/RecipeOne.webp";
import RecipeTwo from "@/public/home/recipes/RecipeTwo.webp";
import RecipeThree from "@/public/home/recipes/RecipeThree.webp";
import RecipeFour from "@/public/home/recipes/RecipeFour.webp";

export default function HomeRecipesMobile() {
  const imgs = [RecipeOne, RecipeTwo, RecipeThree, RecipeFour];

  return (
    <section className="md:hidden w-full bg-[#FBF6F0] aspect-[9/16] h-screen px-6 pt-10 pb-12 flex items-center justify-center flex-col">
      {/* BIG GHOST TITLE */}
      <h2
        className={`${forumFont.className} text-center uppercase leading-none tracking-[0.06em] text-[#C9C3BA]`}
        style={{ fontSize: "22vw" }} // scales like the mock
      >
        RESERVE
      </h2>

      {/* CTA */}
      <div className="mt-3 flex justify-center">
        <Link
          href="/reserve"
          className={`${notoSansFont.className} rounded-full bg-[#C0A078] px-6 py-3 text-[#1B140D] font-semibold tracking-[0.12em] text-[0.94rem] hover:brightness-95 transition`}
        >
          RESERVE A TABLE
        </Link>
      </div>

      {/* 2 x 2 dishes */}
      <div className="mt-8 grid grid-cols-2 gap-6 place-items-center">
        {imgs.map((src, i) => (
          <div
            key={i}
            className="w-[34vw] max-w-[160px] aspect-square overflow-hidden rounded-full shadow-[0_12px_28px_rgba(0,0,0,0.18)]"
          >
            <Image
              src={src}
              alt={`Dish ${i + 1}`}
              className="h-full w-full object-cover"
              priority={i < 2}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
