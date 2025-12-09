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
import NotClearbackgroundImage from "@/public/about/aboutheronotclear.webp";
import backgroundImage from "@/public/about/wasabiAbout.webp";
import mobAbout from "@/public/about/mobAbout.webp";

import chefHat from "@/public/about/ChefHat.svg";
import building from "@/public/about/Building.svg";
import stars from "@/public/about/PersonArmsSpread.svg";
import {
  forumFont,
  notoSansFont,
  Optima_medium,
  Optima_regular,
} from "@/app/utils/font";

export const NewAboutBelief = ({ setCanShow }: any) => {
  const beliefRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: beliefRef,
    offset: ["0.3 1", "0.9 1"], // Start at 20%, end at 70%
  });

  const ReversefilterScale = useTransform(
    scrollYProgress,
    [0.05, 0.5],
    [1, 1.3]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 0.8]);

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
    <div
      ref={beliefRef}
      className="w-full overflow-x-clip flex flex-col relative  lg:block"
    >
      {/* First sticky section */}
      <div className="h-[100vh] w-full sticky top-0 left-0 overflow-hidden z-10">
        <motion.div
          style={{ scale: ReversefilterScale }}
          className="w-full  h-[100vh]  "
        >
          <motion.div
            style={{ opacity }}
            className="bg-black w-full backdrop-blur-md absolute top-0 left-0 h-full"
          />
          <Image
            src={backgroundImage}
            alt="about"
            className="h-full w-full md:block hidden object-center object-cover "
            draggable={false}
          />
          <Image
            src={mobAbout}
            alt="about"
            className="h-full w-full md:hidden object-center object-cover "
            draggable={false}
          />
        </motion.div>
      </div>

      {/* Belief Section */}
      <div
        ref={beliefRef}
        className="w-full  z-[100] lg:pt-[7rem] pt-20  relative flex items-center justify-center bg-black"
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
          >
            Wasabi Modern Kitchen is built on the belief that excellent food
            should be accessible everywhere—not only in large cities. We honor
            the traditions of Japanese cuisine while embracing the modern
            flavors of Asia and the Pacific Northwest.Our goal is simple:
            precision, authenticity, and creativity, served with warmth.
          </motion.p>
          <Image src={line} alt="line" className=" max-w-4xl z-[10]  h-auto" />
          <motion.p
            className={`text-[#FEFAF4]/80  capitalize max-w-2xl  text-balance z-[10] text-sm md:text-xl  ${Optima_regular.className}`}
            transition={{ type: "spring", bounce: 0.1 }}
          >
            OUR CHEF
          </motion.p>
          <motion.p
            className={`text-[#FEFAF4] capitalize max-w-2xl  text-balance z-[10] text-sm md:text-xl  ${Optima_regular.className}`}
          >
            Our chef began his culinary journey at twenty-four, training under
            Japanese chefs in Korea and building a strong foundation in
            traditional Japanese technique.He has spent more than Every dish at
            Wasabi is shaped by his lifelong discipline, experience, and
            creative spirit.
          </motion.p>
          <motion.div className="flex mb-20 flex-col md:flex-row justify-center mb-8 z-[10] items-center md:gap-[5rem] gap-10  text-gray-200">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex items-center md:flex-row flex-col    z-[10]  md:gap-2 ${Optima_medium.className}`}
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
