"use client";

import Image from "next/image";
import { forumFont, notoSansFont } from "@/app/utils/font";
import mobMainImg from "@/public/home/ourstory/mob_story.webp";
import abouutButton from "@/public/home/ourstory/abouutButton.webp";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { OurStoryData } from "@/app/sanity/lib/types";
import { urlFor } from "@/app/sanity/lib/image";

interface OurStoryProps {
  ourStoryData: OurStoryData | null;
}

const OurStory = ({ ourStoryData }: OurStoryProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 1],
    [1.2, 1, 1, 1.2]
  );

  const mainImageUrl = ourStoryData?.mainImage
    ? urlFor(ourStoryData.mainImage).url()
    : mobMainImg.src;

  const buttonImageUrl = ourStoryData?.buttonImage
    ? urlFor(ourStoryData.buttonImage).url()
    : abouutButton.src;

  return (
    <div className="w-full bg-black text-white">
      {/* Mobile layout */}
      <div className="md:hidden px-5 pt-10 pb-14 flex flex-col items-center text-center">
        <p
          className={`opacity-50 text-base tracking-[0.15em] mb-2 ${forumFont.className}`}
        >
          {ourStoryData?.subtitle || "WASABI LEGACY"}
        </p>

        <h2
          className={`${forumFont.className} text-[#E9DFCF] uppercase leading-tight tracking-[0.32em]`}
          style={{ fontSize: "clamp(2rem, 9vw, 3rem)" }}
        >
          {ourStoryData?.title || "OUR STORY"}
        </h2>

        <p
          className={`mt-3 max-w-[26rem] font-light text-[0.92rem] leading-6 tracking-[0.16em] text-[#FEFAF4] ${notoSansFont.className}`}
        >
          {ourStoryData?.description ||
            "Born from a passion for bold flavors and modern flair, Wasabi blends the vibrant essence of Japanese cuisine with an upscale dining experience."}
        </p>

        <div className="w-full mt-6">
          <div ref={ref} className="w-full overflow-hidden rounded-none">
            <motion.div style={{ scale }} className="w-full h-full">
              <Image
                src={mainImageUrl}
                alt="Our Story"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
                quality={85}
              />
            </motion.div>
          </div>
        </div>

        <Link
          href={ourStoryData?.buttonLink || "/about"}
          style={{ transition: "0.6s ease" }}
          className={`${notoSansFont.className} tracking-[0.18em] bg-[#C0A078] text-black hover:text-white hover:bg-black border border-[#C0A078] hover:border-white mt-9 pl-1 pr-3 py-2 text-sm flex items-center gap-2 rounded-full`}
        >
          <span className="w-10 aspect-square rounded-full overflow-hidden">
            <Image
              src={buttonImageUrl}
              alt="about button"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </span>
          {ourStoryData?.buttonText || "ABOUT WASABI"}
        </Link>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex w-full bg-black text-white">
        <div className="w-full overflow-hidden" ref={ref}>
          <motion.div style={{ scale }} className="w-full h-full">
            <Image
              src={mainImageUrl}
              alt="Our Story"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              priority
              quality={85}
            />
          </motion.div>
        </div>

        <div className="w-full gap-[1rem] flex flex-col md:py-[12rem] justify-center items-center">
          <p className={`opacity-50 ${forumFont.className} tracking-widest`}>
            {ourStoryData?.subtitle || "WASABI LEGACY"}
          </p>
          <h2
            className={`${forumFont.className} text-[#E9DFCF]  text-center text-7xl tracking-widest font-bold`}
          >
            {ourStoryData?.title || "OUR STORY"}
          </h2>
          <p
            className={`w-[30rem] md:max-w-[80%] lg:text-base text-sm ${notoSansFont.className} tracking-widest text-center text-[#FEFAF4]`}
          >
            {ourStoryData?.description ||
              "Born from a passion for bold flavors and modern flair, Wasabi blends the vibrant essence of Japanese cuisine with an upscale dining experience."}
          </p>

          <Link
            href={ourStoryData?.buttonLink || "/about"}
            style={{ transition: "0.6s ease" }}
            className={`${notoSansFont.className} tracking-widest cursor-pointer bg-[#C0A078] hover:text-white text-black hover:bg-black border border-[#C0A078] hover:border-white py-[0.3rem] mt-8 pl-[0.3rem] pr-[0.7rem] text-sm flex items-center gap-[0.5rem] rounded-full w-fit`}
          >
            <div className="aspect-square w-[2.8rem] rounded-full">
              <Image
                src={buttonImageUrl}
                alt="about button"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            {ourStoryData?.buttonText || "ABOUT WASABI"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
