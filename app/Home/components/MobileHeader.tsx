"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { forumFont, notoSansFont } from "@/app/utils/font";
import homeImage from "@/public/home/low-angle-friends-drinking-coffee.webp";
import MobileGourmetBliss from "./MobileGourmentBliss";

type Props = {
  image?: StaticImageData | string;
  title?: string; // use "\n" to force a break like the mock
  ctaHref?: string;
  ctaLabel?: string;
  className?: string; // for external margins, etc.
};

export default function MobileHeader({
  image = homeImage,
  title = "REDEFINED\nINDULGENCE",
  ctaHref = "/menu",
  ctaLabel = "SEE MENU",
  className = "",
}: Props) {
  const lines = title.split("\n");

  return (
    <div className="">
      <div
        className={` sticky top-[1.5vw] mb-[4vw] max-w-[97vw] mx-auto md:hidden  rounded-[30px]   aspect-[1/1.6]  min-h-[90vh] overflow-hidden bg-[#2B2218] shadow-[0_10px_30px_rgba(0,0,0,0.25)] ${className}`} // keeps the tall card proportion
        aria-label="Redefined Indulgence"
      >
        {/* background image */}
        <div className="px-4 w-full h-full overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 h-full bg-gradient-to-b from-transparent to-[87%] via-transparent to-[#291B10]" />
        </div>

        {/* content */}
        <div className="absolute inset-x-0 bottom-12 flex flex-col items-center pb-6 sm:pb-8 gap-6">
          {/* heading */}
          <div className="px-6 text-center ">
            <h2
              className={`${forumFont.className} flex flex-col items-center justify-center text-white uppercase tracking-[0.22em] leading-tight mx-auto `}
              style={{
                fontSize: "clamp(9.8vw, 6.2vw, 3rem)",
              }}
            >
              {lines.map((l, i) => (
                <span key={i} className="block pl-3">
                  {l}
                </span>
              ))}
            </h2>
          </div>

          {/* CTA */}
          <Link
            href={ctaHref}
            className={`${notoSansFont.className} inline-flex items-center justify-center rounded-full px-8 py-4 sm:px-9 sm:py-3.5 bg-[#C0A078] text-[#1B140D] font-semibold tracking-[0.22em] shadow-[0_6px_18px_rgba(0,0,0,0.25)] hover:brightness-95 transition`}
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
      </div>
      <MobileGourmetBliss />
    </div>
  );
}
