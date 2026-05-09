"use client";

import Image from "next/image";
import { forumFont, notoSansFont, Optima_regular } from "@/app/utils/font";
import { OurExperienceData } from "@/app/sanity/lib/types";

interface MobileLocationCardProps {
  bgImage: string;
  ourExperienceData: OurExperienceData | null;
}

export default function MobileLocationCard({
  bgImage,
  ourExperienceData,
}: MobileLocationCardProps) {
  return (
    <section
      className="relative w-full h-[92vh] md:hidden overflow-hidden"
      aria-label="Location"
    >
      {/* Background image */}
      <Image
        src={bgImage}
        alt="Location"
        fill
        className="object-cover"
        priority
        quality={85}
      />

      <div className="absolute inset-0 bg-black/10" />

      {/* Title */}
      <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full flex justify-center items-center flex-col">
        <h2
          className={`${forumFont.className} text-[#E9DFCF] uppercase tracking-[0.35em] text-[2rem] mb-6`}
        >
          {ourExperienceData?.locationTitle || "LOCATION"}
        </h2>

        {/* Glass card - SAME AS DESKTOP */}
        <div className="w-[90%] max-w-[28rem] rounded-[30px] overflow-hidden backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
          <div className="bg-[black]/40 backdrop-blur-md">
            <div className="relative z-10 flex pb-[1rem] pt-[1rem] flex-col gap-2">
              {/* Country */}
              <div
                className={`text-lg px-5  text-white font-medium tracking-widest py-[0.3rem] uppercase ${forumFont.className}`}
              >
                {ourExperienceData?.locationCountry || "Canada"}
              </div>

              <div className="border-b border-[white]/20 mb-4"> </div>

              {/* Address */}
              <div className="px-5 font-normal mb-2 tracking-[0.25rem]">
                <p className={`${Optima_regular.className} text-white`}>
                  {ourExperienceData?.addressLine1 || "102-1020 Talasa way,"}
                  <br />
                  {ourExperienceData?.addressLine2 || "Kamloops BC V2H 03C"}
                </p>
              </div>

              {/* Hours Info */}
              <div
                className={`flex flex-col px-5 text-sm tracking-[0.2rem] gap-2 text-[white] mb-2 ${notoSansFont.className}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[white]/60">
                    {ourExperienceData?.hoursLabel || "Hours of Operation"}
                  </span>
                  <span className="border-b border-[white]/50 flex-1 mx-2"></span>
                  <span className="text-[white]/80 font-normal whitespace-nowrap">
                    {ourExperienceData?.operatingHours || "11:30 AM – 9:00 PM"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[white]/60">
                    {ourExperienceData?.openDaysLabel || "Open"}
                  </span>
                  <span className="border-b border-[white]/50 flex-1 mx-2"></span>
                  <span className="text-[white]/80 font-normal">
                    {ourExperienceData?.openDays || "Seven days a week"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
