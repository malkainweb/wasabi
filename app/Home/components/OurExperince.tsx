"use client";
import mainImg from "@/public/home/ourExperience/ExpMain.webp";
import foodimg from "@/public/home/foodimg.webp";
import logo from "@/public/logo.webp";
import ExpThree from "@/public/home/ourExperience/ExpThree.webp";
import ExpFour from "@/public/home/ourExperience/ExpFour.webp";

import ExpTwo from "@/public/home/ourExperience/ExpTwo.webp";

import ExpOne from "@/public/home/ourExperience/ExpOne.webp";
import Image from "next/image";
import { useMemo, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  forumFont,
  notoSansFont,
  Optima_bold,
  Optima_regular,
} from "@/app/utils/font";
import Link from "next/link";
import MobileLocationCard from "./MobileLocationCard";

const OurExperince = () => {
  const arr = [
    { bg: "bg-yellow-400", label: "B", img: ExpOne },
    { bg: "bg-blue-400", label: "C", img: ExpTwo },
  ];
  const arr2 = [
    { bg: "bg-yellow-400", label: "B", img: ExpThree },
    { bg: "bg-blue-400", label: "C", img: ExpFour },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  // Observe the main sticky flex row
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0.35 1", "0.9 1"], // Start at 20%, end at 70%
  });

  // Map progress [0, 1] to width ["10%", "100%"]
  const translateY = useTransform(scrollYProgress, [0.04, 0.2], ["20%", "0%"]);

  const fromValues = ["-30%", "-80%"];
  const fromValues2 = ["80%", "30%"];
  const fromYValues = ["0%", "6%"];
  const fromYValues2 = ["6%", "0%"];

  const arr2StepY = [
    ["0%", "0%"], // first image: from "50%" to "0%"
    ["-20%", "6%"], // second image: from "60%" to "10%"
    // ...add as needed
  ];
  const arrStepY = [
    ["60%", "6%"], // first image: from "50%" to "0%"
    ["40%", "0%"], // second image: from "60%" to "10%"
    // ...add as needed
  ];

  // For arr (first side)
  const arrTranslateX = fromValues2.map((val, idx) =>
    useTransform(scrollYProgress, [0.3, 0.45], [val, "0%"])
  );
  //   const arrTranslateY = fromYValues2.map((val, idx) =>
  //     useTransform(scrollYProgress, [0.3, 0.4], [val, "0%"])
  //   );
  const arrTranslateY = arrStepY.map(([from, to]) =>
    useTransform(scrollYProgress, [0, 0.3, 0.4], [from, to, "0%"])
  );

  // For arr2 (second side)
  const arr2TranslateX = fromValues.map((val, idx) =>
    useTransform(scrollYProgress, [0.3, 0.45], [val, "0%"])
  );
  //   const arr2TranslateY = fromYValues.map((val, idx) =>
  //     useTransform(scrollYProgress, [0, 0.3, 0.4], [val, "0%"])
  //   );
  const arr2TranslateY = arr2StepY.map(([from, to]) =>
    useTransform(scrollYProgress, [0, 0.3, 0.4], [from, to, "0%"])
  );

  const animatedWidth = useTransform(
    scrollYProgress,
    [0.3, 1],
    ["22%", "100%"]
  );
  const animatedHeight = useTransform(
    scrollYProgress,
    [0.3, 0.5],
    ["56%", "100vh"]
  );
  const animatedOpacity = useTransform(scrollYProgress, [0.33, 0.4], [1, 0]);
  const secondAnimatedOpactiy = useTransform(
    scrollYProgress,
    [0.6, 0.8],
    [0, 1]
  );

  const bgOpacity = useTransform(scrollYProgress, [0.4, 0.9], [0, 0.2]);

  const bgColor = useMotionTemplate`rgba(0,0,0,${bgOpacity})`;

  const animatedTranslateY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4],
    ["20%", "-5%", "0%"]
  );

  return (
    <>
      <MobileLocationCard bgImage={mainImg} />
      <motion.div
        ref={containerRef}
        initial={{ scale: 1.4, opacity: 0, y: "-4rem" }}
        animate={{
          scale: [1.4, 0.98, 1],
          opacity: [0, 1, 1],
          y: ["-4rem", "0rem", "0rem"],
        }}
        transition={{
          duration: 1.1,
          times: [0, 0.65, 1],
          ease: "easeOut", // or use a custom [0.5,1.5,0.2,1] for more bounce
        }}
        className={` bg-[#FEFAF4] pt-[12rem] overflow-clip w-full md:flex flex-col h-[350vh] relative hidden`}
      >
        <motion.div className="flex w-full  justify-center items-center overflow-clip  sticky top-0 left-0 h-[100vh] z-[10]     ">
          {/* left hand side solid */}
          <div className="w-full shrink-0 h-full    max-w-[70%] bg-[#FEFAF4] px-5 flex items-center">
            <div className="flex justify-end  items-center gap-5 w-full h-full  max-h-[70%]">
              {arr.map((item, idx) => (
                <motion.div
                  key={item.label}
                  style={{
                    translateX: arrTranslateX[idx],
                    translateY: arrTranslateY[idx],
                  }}
                  className={` overflow-hidden w-fit  relative h-[100%] max-h-[26rem]   aspect-[1/1.5] bg-black  `}
                >
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill // Use fill instead of className sizing
                    className="w-full h-full object-cover"
                  />{" "}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            style={{
              //   width,
              backgroundColor: bgColor,
              width: animatedWidth,
              height: animatedHeight,
              translateY: animatedTranslateY,
            }}
            className="w-fit  z-[100] aspect-[1/1.4] overfl flex gap-1 justify-center items-center flex-col text-white relative  h-[70%] max-h-[100vh] shrink-0"
          >
            <motion.div
              style={{ backgroundColor: bgColor }}
              className="w-full h-full  absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] "
            ></motion.div>
            <Image
              src={mainImg}
              alt="Header Image"
              className="w-full h-full object-cover"
              priority
              draggable={false}
            />
            <motion.h2
              style={{ opacity: animatedOpacity }}
              className={`text-7xl tracking-widest ${forumFont.className} text-[#E9DFCF] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]`}
            >
              THE WASABI <br /> EXPERIENCE
            </motion.h2>

            <motion.div
              style={{ opacity: secondAnimatedOpactiy }}
              className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
            >
              <p
                className={`${forumFont.className} text-[#E9DFCF] text-center mb-3 tracking-widest text-6xl`}
              >
                LOCATION
              </p>
              <div
                className={`bg-[black]/40 rounded-[30px]  backdrop-blur-md z-[100]`}
              >
                <div className="relative  z-10 flex pb-[1rem] pt-[1rem] flex-col gap-2">
                  {/* Title */}
                  <div
                    className={`text-lg md:text-xl  md:px-8 font-medium tracking-widest py-[0.3rem] uppercase ${forumFont.className}`}
                  >
                    Canada
                  </div>
                  {/* Divider */}
                  <div className="border-b border-[white]/20 mb-4"></div>

                  {/* Address */}
                  <div className="  md:px-8  font-normal mb-2  tracking-[0.25rem]">
                    <p className={`${Optima_regular.className}`}>
                      102-1020 Talasa way,
                      <br />
                      Kamloops BC V2H 03C.
                    </p>
                  </div>

                  {/* Details Row */}
                  <div
                    className={`flex flex-col md:px-8  text-sm tracking-[0.2rem] gap-2 text-[white] mb-2 ${notoSansFont.className}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className=" text-[white]/60">Opening Days</span>
                      <span className="  border-b border-[white]/50 w-[6rem] mx-2"></span>
                      <span className="text-[white]/80  font-normal">
                        Mon - Sat
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className=" text-[white]/60">Opening Time</span>
                      <span className=" border-b border-[white]/50 w-[6rem] mx-2"></span>
                      <span className="text-[white]/80 font-normal">
                        9AM - 10PM
                      </span>
                    </div>
                  </div>
                  {/* Divider */}
                </div>
              </div>
            </motion.div>

            {/* <motion.div
              style={{
                opacity,
                scale: Textscale,
              }}
              className="flex flex-col   items-center justify-center gap-1"
            >
              <motion.h1
                className={`uppercase tracking-widest text-center ${forumFont.className} text-7xl`}
              >
                MAke a<br /> reservation
              </motion.h1>
              <Link
                href={"/menu"}
                style={{ transition: "0.4s ease" }}
                className={`${notoSansFont.className} bg-[#C0A078] text-black px-[1.5rem] tracking-widest cursor-pointer hover:bg-white hover:text-black py-[0.6rem]  rounded-full w-fit`}
              >
                SEE MENU{" "}
              </Link>
            </motion.div> */}
          </motion.div>

          {/* right hand side solid */}

          <div className="w-full shrink-0 h-full    max-w-[70%] bg-[#FEFAF4] px-5 flex items-center">
            <div className="flex   items-center gap-5 w-full h-full  max-h-[70%]">
              {arr2.map((item, idx) => (
                <motion.div
                  key={item.label}
                  style={{
                    translateX: arr2TranslateX[idx],
                    translateY: arr2TranslateY[idx],
                    zIndex: arr2.length - idx, // ← This line gives higher z-index to lower idx
                  }}
                  className={` overflow-hidden w-fit relative  h-[100%] max-h-[26rem]   aspect-[1/1.5] bg-black  `}
                >
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill // Use fill instead of className sizing
                    className="w-full h-full object-cover"
                  />{" "}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default OurExperince;
