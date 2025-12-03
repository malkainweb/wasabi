"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import aboutmenu from "@/public/about/aboutMenu.webp";
import line from "@/public/about/line.svg";

import Logo from "@/public/about/White 2.png";
import backgroundImage from "@/public/about/aboutHero.webp";
import NotClearbackgroundImage from "@/public/about/aboutheronotclear.webp";
import backgroundImageFilter from "@/public/about/AboutOverlay.webp";
import chefHat from "@/public/about/ChefHat.svg";
import building from "@/public/about/Building.svg";
import stars from "@/public/about/PersonArmsSpread.svg";
import {
  forumFont,
  notoSansFont,
  Optima_medium,
  Optima_regular,
} from "@/app/utils/font";

export const AboutAndBelief = ({ setCanShow }: any) => {
  const beliefRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: beliefRef,
    offset: ["0.3 1", "0.9 1"], // Start at 20%, end at 70%
  });

  const aboutX = useTransform(scrollYProgress, [0, 0.4], [0, 150]);
  const wasabiX = useTransform(scrollYProgress, [0, 0.4], [0, -150]);
  const filterScale = useTransform(scrollYProgress, [0, 0.7], [1, 2]);
  const ReversefilterScale = useTransform(scrollYProgress, [0, 0.3], [1.3, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);

  // Listen to the motion value
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCanShow(v > 0.9);
  });

  const stats = [
    {
      icon: stars, // import stars from "@/public/..." etc
      alt: "stars",
      label: "21 Years experience",
    },
    {
      icon: building,
      alt: "locations",
      label: "Across over 10 Japanese restaurant",
    },
    {
      icon: chefHat,
      alt: "chef hats",
      label: "13 years as an owner chef",
    },
  ];

  return (
    <div ref={beliefRef} className="h-[350vh] w-full relative hidden lg:block">
      {/* First sticky section */}
      <div className="h-[100vh] w-full sticky top-0 overflow-hidden z-10">
        <motion.div className="relative inset-0 z-20 h-full">
          <motion.div
            style={{ scale: ReversefilterScale }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.3 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="w-full  h-full absolute top-0 left-0 z-0 "
          >
            <Image
              src={backgroundImage}
              alt="about"
              className="h-full w-full object-cover "
              draggable={false}
            />
          </motion.div>
          <motion.div
            initial={{ scale: 2.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{ scale: filterScale }}
            className="w-full flex  z-30 h-full "
          >
            <Image
              src={backgroundImageFilter}
              alt="aesthetic view"
              className="h-full w-full object-cover relative"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        <div
          className={`h-full w-full flex flex-col justify-center px-6 md:px-16 py-12 absolute top-0 left-0 z-50 pointer-events-none ${forumFont.className}`}
        >
          <motion.span
            initial={{ x: 150 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{ x: aboutX }}
            className="text-gray-100 font-bold tracking-wide text-[9vw] max-w-[45vw] break-words leading-none self-start ml-9"
          >
            ABOUT
          </motion.span>
          <motion.span
            initial={{ x: -150 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{ x: wasabiX }}
            className="text-gray-100 font-bold tracking-wide text-[9vw] max-w-[45vw] break-words leading-none self-end text-right mr-9"
          >
            WASABI
          </motion.span>
        </div>
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black/90 z-50 pointer-events-none"
        />
      </div>

      {/* Belief Section */}
      <div
        ref={beliefRef}
        className="w-full absolute lg:left-0 lg:bottom-0  lg:pt-[7rem] z-20 flex items-center justify-center bg-black"
      >
        <motion.div
          className="lg:w-[150rem]  gap-10  max-w-full relative  mx-auto flex flex-col items-center text-center "
          layout
          transition={{ delayChildren: 0.3 }}
        >
          <div className="h-[100vh]  lg:h-[95%] w-full absolute top-0 left-0  bg-gradient-to-b  from-black via-black" />
          <div className=" z-[10] flex flex-col items-center">
            <Image
              src={Logo}
              alt={"Wasabi-logo"}
              className="object-contain h-24 w-24"
            />

            <p className={`text-gray-100 z-[10]  ${forumFont.className}`}>
              ABOUT US
            </p>
          </div>
          <p className={`text-white/30 z-[10] ${forumFont.className}`}>
            OUR PHILOSOPHY
          </p>

          <motion.p
            className={`text-[#FEFAF4] z-[10]  text-lg md:text-4xl font-normal   text-balance uppercase max-w-5xl mx-auto ${forumFont.className}`}
            initial={{ translateY: 70 }}
            whileInView={{ translateY: 0 }}
            transition={{ type: "spring", bounce: 0.1 }}
          >
            Wasabi Modern Kitchen is built on the belief that excellent food
            should be accessible everywhere—not only in large cities. We honor
            the traditions of Japanese cuisine while embracing the modern
            flavors of Asia and the Pacific Northwest.Our goal is simple:
            precision, authenticity, and creativity, served with warmth.
          </motion.p>
          <Image
            src={line}
            alt="line"
            className=" max-w-4xl z-[10] -my-2  h-auto"
          />
          <motion.p
            className={`text-[#FEFAF4]/80 -mb-4 capitalize max-w-2xl  text-balance z-[10] text-sm md:text-xl  ${Optima_regular.className}`}
            initial={{ translateY: 70 }}
            whileInView={{ translateY: 0 }}
            transition={{ type: "spring", bounce: 0.1 }}
          >
            OUR CHEF
          </motion.p>
          <motion.p
            className={`text-[#FEFAF4] capitalize max-w-2xl  text-balance z-[10] text-sm md:text-xl  ${Optima_regular.className}`}
            initial={{ translateY: 70 }}
            whileInView={{ translateY: 0 }}
            transition={{ type: "spring", bounce: 0.1 }}
          >
            Our chef began his culinary journey at twenty-four, training under
            Japanese chefs in Korea and building a strong foundation in
            traditional Japanese technique.He has spent more than Every dish at
            Wasabi is shaped by his lifelong discipline, experience, and
            creative spirit.
          </motion.p>
          <motion.div
            className="flex flex-row justify-center mb-8 z-[10] items-center gap-[7rem]  text-gray-200"
            initial={{ translateY: 70 }}
            whileInView={{ translateY: 0 }}
            transition={{ type: "spring", bounce: 0.1 }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex items-center   z-[10]  gap-2 ${Optima_medium.className}`}
              >
                <Image
                  className="w-[1.5rem] h-fit"
                  src={stat.icon}
                  alt={stat.alt}
                />
                <span className=" mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <div className="w-full hidden lg:block">
            <Image src={aboutmenu} alt="foodimg" className="w-full h-fit" />
          </div>
          <div className="w-full lg:hidden">
            <Image src={aboutmenu} alt="foodimg" className="w-full h-fit" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
