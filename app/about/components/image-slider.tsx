"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

import cheers from "@/public/about/Cheers.png";
import firstImage from "@/public/about/slide1.webp";
import secondImage from "@/public/about//slide2.webp";
import thirdImage from "@/public/about//slide3.webp";
import fourthImage from "@/public/about/slide4.webp";
import fifthImage from "@/public/about/slide5.webp";
import { forumFont, notoSansFont, Optima_bold } from "@/app/utils/font";
const sixthItem = () => {
  return (
    <div className="w-full h-full text-white flex items-center justify-center gap-8">
      <motion.div
        className="w-[90%] lg:w-[40%] mx-auto flex flex-col justify-center gap-y-7"
        layout
      >
        <motion.div
          className="h-7 w-7 flex items-center justify-center mx-auto"
          initial={{ translateX: 80, opacity: 0.5 }}
          whileInView={{ translateX: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0 }}
        >
          <Image
            src={cheers}
            alt="cheers"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <motion.p
          className={`text-[20px] text-center font-extralight ${forumFont.className}`}
          initial={{ translateX: 80, opacity: 0.5 }}
          whileInView={{ translateX: 0, opacity: 1 }}
          transition={{
            type: "spring",
            bounce: 0,
            delay: 0.1,
          }}
        >
          Discover dishes designed to delight the senses—crafted with precision,
          inspired by tradition, and served with intention.
        </motion.p>
        <motion.button
          initial={{ translateX: 80, opacity: 0.5 }}
          whileInView={{ translateX: 0, opacity: 1 }}
          transition={{
            type: "spring",
            bounce: 0,

            delay: 0.3,
          }}
          className={`text-sm text-nowrap px-6 py-3 text-black rounded-3xl text-center w-[45%] mx-auto ${notoSansFont.className}`}
          style={{ backgroundColor: "#C0A078" }}
        >
          SEE MENU
        </motion.button>
      </motion.div>
    </div>
  );
};

const CARD_COUNT = 6;

const STACK_MARGIN = 32;

const cardColors = [
  "black",
  "black",
  "black",
  "black",
  "black",
  "black",
  "black",
];

export const ImagesSlider = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [cardWidths, setCardWidths] = useState<number[]>([]);
  const [totalWidth, setTotalWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  const staticHeader = (
    <div className="text-center mt-28 mb-10 overflow-hidden">
      <motion.h3
        className={`text-5xl ${forumFont.className}`}
        initial={{ translateY: -50, scale: 1.3 }}
        whileInView={{ translateY: 0, scale: 1 }}
        transition={{ delay: 0.1, stiffness: 70 }}
      >
        BROWSE OUR <br /> CURATED MENU
      </motion.h3>
    </div>
  );

  useEffect(() => {
    function recalcWidths() {
      const BASE_WIDTH = 340;
      const EXTRA_WIDTH = 80;
      const STACK_MARGIN = 32;
      let widths: number[] = [];
      let total = 0;
      for (let i = 0; i < CARD_COUNT; i++) {
        let width = BASE_WIDTH;
        if (i === CARD_COUNT - 1) width += EXTRA_WIDTH * 2;
        else if (i === CARD_COUNT - 2) width += EXTRA_WIDTH;
        else if (i === CARD_COUNT - 3) width += 40;
        if (i === 4) width += 40;
        if (i === 5) width += 80;
        widths.push(width);
        total += width;
      }
      setCardWidths(widths);
      setTotalWidth(total);
      setViewportWidth(window.innerWidth);
    }
    recalcWidths();
    window.addEventListener("resize", recalcWidths);
    return () => window.removeEventListener("resize", recalcWidths);
  }, []);

  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ["start start", "end end"],
  });

  // For each card, calculate its own translateX
  let lefts: number[] = [];
  let acc = 0;
  for (let i = 0; i < CARD_COUNT; i++) {
    lefts.push(acc);
    acc += cardWidths[i] || 0;
  }

  const maxScroll = totalWidth - viewportWidth;

  const scrollPx = useTransform(
    scrollYProgress,
    [0, 1],
    [0, maxScroll > 0 ? maxScroll : 0]
  );

  const cards = Array.from({ length: CARD_COUNT }).map((_, i) => {
    const width = cardWidths[i];
    const cardLeft = lefts[i];
    const zIndex = 10 + i;
    let marginLeft = 0;
    let marginRight = 0;

    // For the last card, add marginRight when stuck
    const translateX = useTransform(scrollPx, (v) => {
      const scrolledLeft = cardLeft - v;
      if (scrolledLeft <= (i === 0 ? 0 : i * STACK_MARGIN)) {
        if (i === CARD_COUNT - 1) {
          marginRight = STACK_MARGIN;
        } else {
          marginRight = 0;
        }
        return (i === 0 ? 0 : i * STACK_MARGIN) - cardLeft;
      }
      marginRight = 0;
      return -v;
    });
    const springX = useSpring(translateX, {
      stiffness: 250,
      damping: 17,
      mass: 1,
      bounce: 0,
    });

    return (
      <motion.div
        key={i}
        style={{
          position: "absolute",
          top: "0",
          left: cardLeft,
          width,
          height: "100vh",
          background: cardColors[i],
          color: i === CARD_COUNT - 1 ? "#fff" : "#222",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          zIndex,
          marginLeft,
          marginRight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          fontWeight: 600,
          transition: "box-shadow 0.3s, background 0.3s",
          overflow: "hidden",
          x: springX,
        }}
      >
        {i < CARD_COUNT - 1 ? (
          <>
            <Image
              src={
                i === 0
                  ? firstImage.src
                  : i === 1
                  ? secondImage.src
                  : i === 2
                  ? thirdImage.src
                  : i === 3
                  ? fourthImage.src
                  : i === 4
                  ? fifthImage.src
                  : ""
              }
              alt={`Card ${i + 1}`}
              width={1000}
              height={1000}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 1,
              }}
            />
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              width: "100%",
              zIndex: 2,
              position: "relative",
            }}
          >
            {sixthItem()}
          </div>
        )}
      </motion.div>
    );
  });

  return (
    <>
      <div className="w-full overflow-x-hidden hidden lg:block bg-white">
        {staticHeader}
      </div>
      <div className="relative w-full overflow-x-clip lg:hidden bg-black">
        <div className="w-full overflow-x-hidden h-fit lg:hidden relative z-20 bg-black  text-white">
          <h3
            className={`text-4xl ${forumFont.className} text-center text-[#C0A078] my-12`}
          >
            {" "}
            BROWSE OUR <br /> CURATED MENU
          </h3>
        </div>
        <div className="relative h-[45vh] min-h-[20rem] flex">
          <div
            // variants={imageUpVariant}
            className="absolute left-[-35%] w-[45%] rotate-[-30deg] top-[20vw] min-w-[13rem] aspect-[1/1.15] overflow-hidden"
          >
            <img
              src={firstImage.src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            // variants={imageUpVariant}
            className="absolute left-[4%] top-[5%] rotate-[-15deg] z-10 w-[45%] min-w-[13rem] aspect-[1/1.15] overflow-hidden"
          >
            <img
              src={secondImage.src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            //center
            className="absolute inset-x-0 mx-auto  z-20 w-[45%] min-w-[13rem] aspect-[1/1.15] overflow-hidden"
          >
            <img
              src={thirdImage.src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute right-[4%] top-[5%] w-[45%]  rotate-[15deg] min-w-[13rem] aspect-[1/1.15] overflow-hidden">
            <img
              src={fourthImage.src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            // variants={imageUpVariant}
            className="absolute right-[-35%] z-10 top-[20vw] w-[45%] rotate-[30deg] min-w-[13rem] aspect-[1/1.15] overflow-hidden"
          >
            <img
              src={fifthImage.src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="relative -top-[11vh] sm:-top-[2vh] -mb-6 min-h-[25rem] flex flex-col justify-evenly pt-2">
          <div className="size-[4.8rem] flex items-center justify-center mx-auto">
            <Image
              src={cheers}
              alt="cheers"
              className="h-full w-full object-cover text-[#FEFAF4]"
            />
          </div>
          <div
            className={`text-lg text-center tracking-widest uppercase font-light text-[#FEFAF4] ${forumFont.className}`}
          >
            Discover dishes designed to <br />
            delight the senses—crafted
            <br /> with precision, inspired by
            <br />
            tradition, and served with <br /> intention.
          </div>
          <button
            className={`font-medium text-nowrap px-5 py-3 text-black rounded-4xl text-center min-w-[10rem] mx-auto ${Optima_bold.className}`}
            style={{ backgroundColor: "#C0A078" }}
          >
            SEE MENU
          </button>
        </div>
      </div>
      <motion.div
        className="hidden lg:block"
        ref={parentRef}
        style={{ height: "300vh", position: "relative" }}
        initial={{ translateY: -8, scale: 0.95 }}
        whileInView={{ translateY: 0, scale: 1 }}
        transition={{ stiffness: 70 }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <div
            style={{ position: "relative", width: totalWidth, height: "100vh" }}
          >
            {cards}
          </div>
        </div>
      </motion.div>
    </>
  );
};
