"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import line from "@/public/about/line.svg";

import backgroundImage from "@/public/about/aboutHero.webp";
import backgroundImageFilter from "@/public/about/AboutOverlay.webp";
import Logo from "@/public/about/White 2.png";
import aboutmenu from "@/public/about/aboutMenu.webp";
import chefHat from "@/public/about/ChefHat.svg";
import building from "@/public/about/Building.svg";
import stars from "@/public/about/PersonArmsSpread.svg";
import {
  forumFont,
  notoSansFont,
  Optima_medium,
  Optima_regular,
} from "@/app/utils/font";

export function AboutAndBeliefMobile({
  setCanShow,
}: {
  setCanShow: (v: boolean) => void;
}) {
  // Animate only within the hero (no giant parent height)
  const heroRef = useRef<HTMLDivElement | null>(null);

  // progress = 0 when hero top hits viewport top; 1 when hero bottom hits viewport top
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Subtle mobile motions (smaller distances than desktop)
  const aboutX = useTransform(scrollYProgress, [0, 0.6], [0, 60]); // slide right
  const wasabiX = useTransform(scrollYProgress, [0, 0.6], [0, -60]); // slide left
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]); // gentle zoom-out
  const fxScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]); // overlay zoom-out
  const overlayOpacity = useTransform(scrollYProgress, [0.25, 0.8], [0, 1]); // fade to black

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // keep your top-nav logic if you need it
    setCanShow?.(v > 0.92);
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
    <section className="lg:hidden w-full">
      {/* HERO (100vh, self-contained animation) */}
      <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
        {/* Base image */}
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0"
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={backgroundImage}
            alt="about"
            draggable={false}
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>

        {/* Filter layer */}
        <motion.div
          style={{ scale: fxScale }}
          className="absolute inset-0"
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={backgroundImageFilter}
            alt="overlay"
            draggable={false}
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>

        {/* Headings */}
        <div
          className={`pointer-events-none absolute inset-0 space-y-6 z-10 flex flex-col justify-center px-4 ${forumFont.className}`}
        >
          <motion.span
            style={{ x: aboutX }}
            className="self-start ml-2 text-[17vw] leading-none tracking-[0.02em] text-gray-100"
          >
            ABOUT
          </motion.span>
          <motion.span
            style={{ x: wasabiX }}
            className="self-end mr-2 text-right text-[17vw] leading-none tracking-[0.02em] text-gray-100"
          >
            WASABI
          </motion.span>
        </div>

        {/* Darken as we scroll through hero */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 -mb-[5%] z-20 bg-black/90"
        />
      </div>

      {/* BELIEF (immediately after hero; no gap) */}
      <div className="w-full bg-black">
        <div className="relative mx-auto  text-center px-10 flex w-full flex-col items-center  pt-10">
          <div className="relative   gap-6 flex  flex-col">
            <div className="z-[10]  ">
              <Image
                src={Logo}
                alt="Wasabi-logo"
                className="w-14 mx-auto h-auto"
              />
            </div>

            <p className={`z-[10] text-xl  text-white ${forumFont.className}`}>
              OUR BELIEF
            </p>
            <p
              className={`z-[10] text-base -my-1  text-white/30 ${forumFont.className}`}
            >
              OUR PHILOSOPHY
            </p>

            <p
              className={`z-[10] mx-auto  w-full  text-lg  text-[#FEFAF4] uppercase text-balance ${forumFont.className}`}
            >
              Wasabi Modern Kitchen is built on the belief that excellent food
              should be accessible everywhere—not only in large cities. We honor
              the traditions of Japanese cuisine while embracing the modern
              flavors of Asia and the Pacific Northwest. Our goal is
              simple: precision, authenticity, and creativity, served with
              warmth.
            </p>

            {/* Stats: stacked & compact on mobile */}
            <div className="z-[10] flex flex-col  w-full  gap-2 text-gray-200">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center gap-2 text-base w-full  ${Optima_medium.className}`}
                >
                  <Image src={s.icon} alt={s.alt} className="size-5" />
                  <span className="mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>

            <Image src={line} alt="line" className=" w-full z-[10] h-auto" />

            <p
              className={`z-[10] w-full text-lg font-light leading-[127%]  text-[#FEFAF4] ${forumFont.className}`}
            >
              OUR CHEF
            </p>
            <p
              className={`z-[10] w-full text-lg leading-[127%]  text-[#FEFAF4] ${Optima_regular.className}`}
            >
              Our chef began his culinary journey at twenty-four, training under
              Japanese chefs in Korea and building a strong foundation in
              traditional Japanese technique.He has spent more than  Every dish
              at Wasabi is shaped by his lifelong discipline, experience, and
              creative spirit.
            </p>
          </div>
        </div>

        <div className=" relative w-full pt-10">
          <div className="absolute h-full from-18% w-full bg-gradient-to-b left-0 top-0  from-black z-[10]"></div>
          <Image src={aboutmenu} alt="foodimg" className="h-auto w-full  " />
        </div>
      </div>
    </section>
  );
}
