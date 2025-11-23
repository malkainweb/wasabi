"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { forumFont, notoSansFont } from "@/app/utils/font";
import gourmentImage from "@/public/home/close-up-shiny-glassware-standing-dinner-plate.webp";

type Props = {
  image?: StaticImageData | string;
  title?: string; // use "\n" to force a line break
  subcopy?: string;
  schedule?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

export default function MobileGourmetBliss({
  image = gourmentImage,
  title = "EXPERIENCE\nGOURMET BLISS",
  subcopy = "Savor Elegance, Flavor, And\nAmbiance Like Never Before.",
  schedule = "Now Open: Tuesday – Sunday\n | 5 PM – 11 PM",
  ctaHref = "  tel:+12509841632",
  ctaLabel = "RESERVE A TABLE",
  className = "",
}: Props) {
  const titleLines = title.split("\n");

  return (
    <div
      className={`relative md:hidden  pt-20 mx-auto flex flex-col  w-full overflow-hidden bg-black shadow-[0_10px_30px_rgba(0,0,0,0.25)] ${className}`}
      // style={{ aspectRatio: "9/17" }}
    >
      <div className="  px-6 pt-12 pb-9 flex flex-col items-center text-center gap-4">
        <h2
          className={`${forumFont.className} text-white uppercase tracking-[0.32em] text-2xl leading-tight`}
        >
          Experience <span className="block text-nowrap">Gourmet Bliss</span>
        </h2>

        <p
          className={`${notoSansFont.className} text-white text-xs whitespace-pre-line leading-[150%] font-light tracking-[0.2em]`}
        >
          {subcopy}
          <span className="block">{schedule}</span>
        </p>

        <a
          href={ctaHref}
          className={`${notoSansFont.className} mt-1 inline-flex items-center justify-center rounded-full border border-white/80  text-white px-5 py-3.5 text-xs tracking-[0.12em] hover:bg-white hover:text-black transition-colors`}
        >
          {ctaLabel}
        </a>
      </div>

      <div className="aspect-[1/0.9] overflow-hidden  pt-10 ">
        <Image
          src={image}
          alt=""
          priority
          className=" w-full h-full  object-cover"
        />
      </div>
    </div>
  );
}
