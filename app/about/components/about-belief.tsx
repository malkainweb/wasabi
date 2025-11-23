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

import Logo from "@/public/about/White 2.png";
import backgroundImage from "@/public/about/aboutHero.webp";
import backgroundImageFilter from "@/public/about/AboutOverlay.webp";
import chefHat from "@/public/about/ChefHat.svg";
import building from "@/public/about/Building.svg";
import stars from "@/public/about/PersonArmsSpread.svg";
import { forumFont, notoSansFont, Optima_medium } from "@/app/utils/font";

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
      label: "45 Staffs",
    },
    {
      icon: building,
      alt: "locations",
      label: "3 Locations",
    },
    {
      icon: chefHat,
      alt: "chef hats",
      label: "23 Chefs",
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
          className="lg:w-[150rem] max-w-full relative  mx-auto flex flex-col items-center text-center "
          layout
          transition={{ delayChildren: 0.3 }}
        >
          <div className="h-[100vh] lg:h-[95%] w-full absolute top-0 left-0  bg-gradient-to-b  from-black via-black" />
          <div className="mb-4 z-[10] flex flex-col items-center">
            <span className="h-24 w-24">
              <Image
                src={Logo}
                alt={"Wasabi-logo"}
                className="object-cover h-full w-full"
              />
            </span>
          </div>

          <div
            className={`text-gray-100 z-[10] tracking-widest text-sm mb-8 ${forumFont.className}`}
          >
            OUR BELIEF
          </div>

          <motion.p
            className={`text-[#FEFAF4] z-[10] capitalize text-lg md:text-[30px] font-normal md:leading-relaxed mb-8 tracking-widest max-w-4xl mx-auto ${forumFont.className}`}
            initial={{ translateY: 70 }}
            whileInView={{ translateY: 0 }}
            transition={{ type: "spring", bounce: 0.1 }}
          >
            <span className={forumFont.className}>Because</span>{" "}
            <span className="italic">Bold Deserves Beauty</span>.{" "}
            <span className={forumFont.className}>
              At Wasabi, Every Detail Is A
            </span>{" "}
            <span className="italic font-semibold">
              Statement—Of Taste, Elegance, And Fire.
            </span>{" "}
            <span className={forumFont.className}>We Exist To Turn</span>{" "}
            <span className="italic">Dining Into Art.</span>
          </motion.p>

          <motion.div
            className="flex flex-row justify-center z-[10] items-center gap-[7rem] mb-8 text-gray-200"
            initial={{ translateY: 70 }}
            whileInView={{ translateY: 0 }}
            transition={{ type: "spring", bounce: 0.1 }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex items-center text-lg tracking-[0.2rem] z-[10]  gap-2 ${Optima_medium.className}`}
              >
                <Image
                  className="w-[1.5rem] h-fit"
                  src={stat.icon}
                  alt={stat.alt}
                />
                <span className="text-sm mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.p
            className={`text-[#FEFAF4] capitalize  z-[10] text-sm md:text-lg tracking-widest mt-2 ${notoSansFont.className}`}
            initial={{ translateY: 70 }}
            whileInView={{ translateY: 0 }}
            transition={{ type: "spring", bounce: 0.1 }}
          >
            We're Not Just Serving Meals—We're Curating Moments
            <br />
            Of Indulgence, Artistry, And Unforgettable Taste.
          </motion.p>

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
