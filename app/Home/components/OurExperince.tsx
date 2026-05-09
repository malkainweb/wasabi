"use client";
import mainImg from "@/public/home/ourExperience/ExpMain.webp";
import mobmainImg from "@/public/home/ourExperience/mob_location.webp";
import ExpThree from "@/public/home/ourExperience/ExpThree.webp";
import ExpFour from "@/public/home/ourExperience/ExpFour.webp";
import ExpTwo from "@/public/home/ourExperience/ExpTwo.webp";
import ExpOne from "@/public/home/ourExperience/ExpOne.webp";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { forumFont, notoSansFont, Optima_regular } from "@/app/utils/font";
import MobileLocationCard from "./MobileLocationCard";
import { OurExperienceData } from "@/app/sanity/lib/types";
import { urlFor } from "@/app/sanity/lib/image";

interface OurExperinceProps {
  ourExperienceData: OurExperienceData | null;
}

const OurExperince = ({ ourExperienceData }: OurExperinceProps) => {
  const defaultLeftImages = [ExpOne, ExpTwo];
  const defaultRightImages = [ExpThree, ExpFour];

  const arr = ourExperienceData?.leftImages
    ? ourExperienceData.leftImages.map((img) => ({
        img: urlFor(img).url(),
      }))
    : defaultLeftImages.map((img) => ({ img: img.src }));

  const arr2 = ourExperienceData?.rightImages
    ? ourExperienceData.rightImages.map((img) => ({
        img: urlFor(img).url(),
      }))
    : defaultRightImages.map((img) => ({ img: img.src }));

  const mainImageUrl = ourExperienceData?.mainImage
    ? urlFor(ourExperienceData.mainImage).url()
    : mainImg.src;

  const mobileImageUrl = ourExperienceData?.mobileImage
    ? urlFor(ourExperienceData.mobileImage).url()
    : mobmainImg.src;

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0.35 1", "0.9 1"],
  });

  const translateY = useTransform(scrollYProgress, [0.04, 0.2], ["20%", "0%"]);

  const fromValues2 = ["80%", "30%"];
  const fromValues = ["-30%", "-80%"];

  const arr2StepY = [
    ["0%", "0%"],
    ["-20%", "6%"],
  ];
  const arrStepY = [
    ["60%", "6%"],
    ["40%", "0%"],
  ];

  const arrTranslateX = fromValues2.map((val) =>
    useTransform(scrollYProgress, [0.3, 0.45], [val, "0%"])
  );
  const arrTranslateY = arrStepY.map(([from, to]) =>
    useTransform(scrollYProgress, [0, 0.3, 0.4], [from, to, "0%"])
  );

  const arr2TranslateX = fromValues.map((val) =>
    useTransform(scrollYProgress, [0.3, 0.45], [val, "0%"])
  );
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
      <MobileLocationCard
        bgImage={mobileImageUrl}
        ourExperienceData={ourExperienceData}
      />{" "}
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
          ease: "easeOut",
        }}
        className={`bg-[#FEFAF4] pt-[12rem] overflow-clip w-full md:flex flex-col h-[350vh] relative hidden`}
      >
        <motion.div className="flex w-full justify-center items-center overflow-clip sticky top-0 left-0 h-[100vh] z-[10]">
          {/* Left side */}
          <div className="w-full shrink-0 h-full max-w-[70%] bg-[#FEFAF4] px-5 flex items-center">
            <div className="flex justify-end items-center gap-5 w-full h-full max-h-[70%]">
              {arr.map((item, idx) => (
                <motion.div
                  key={idx}
                  style={{
                    translateX: arrTranslateX[idx],
                    translateY: arrTranslateY[idx],
                  }}
                  className={`overflow-hidden w-fit relative h-[100%] max-h-[26rem] aspect-[1/1.5] bg-black`}
                >
                  <Image
                    src={item.img}
                    alt={`Left Image ${idx + 1}`}
                    fill
                    className="w-full h-full object-cover"
                    quality={85}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Center */}
          <motion.div
            style={{
              backgroundColor: bgColor,
              width: animatedWidth,
              height: animatedHeight,
              translateY: animatedTranslateY,
            }}
            className="w-fit z-[100] aspect-[1/1.4] flex gap-1 justify-center items-center flex-col text-white relative h-[70%] max-h-[100vh] shrink-0"
          >
            <motion.div
              style={{ backgroundColor: bgColor }}
              className="w-full h-full absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
            ></motion.div>
            <Image
              src={mainImageUrl}
              alt="Main Experience"
              width={800}
              height={800}
              className="object-cover absolute top-0 left-0 w-full h-full"
              priority
              quality={85}
            />
            <motion.h2
              style={{ opacity: animatedOpacity }}
              className={`text-7xl tracking-widest ${forumFont.className} text-[#E9DFCF] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]`}
            >
              {ourExperienceData?.mainTitle || "THE WASABI EXPERIENCE"}
            </motion.h2>

            <motion.div
              style={{ opacity: secondAnimatedOpactiy }}
              className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
            >
              <p
                className={`${forumFont.className} text-[#E9DFCF]  text-center mb-3 tracking-widest text-6xl`}
              >
                {ourExperienceData?.locationTitle || "LOCATION"}
              </p>
              <div
                className={`bg-[black]/40 rounded-[30px] backdrop-blur-md z-[100]`}
              >
                <div className="relative z-10 flex pb-[1rem] pt-[1rem] flex-col gap-2">
                  <div
                    className={`text-lg md:text-xl md:px-8 font-medium tracking-widest py-[0.3rem] uppercase ${forumFont.className}`}
                  >
                    {ourExperienceData?.locationCountry || "Canada"}
                  </div>
                  <div className="border-b border-[white]/20 mb-4"></div>
                  <div className="md:px-8 font-normal mb-2 tracking-[0.25rem]">
                    <p className={`${Optima_regular.className}`}>
                      {ourExperienceData?.addressLine1 ||
                        "102-1020 Talasa way,"}
                      <br />
                      {ourExperienceData?.addressLine2 || "Kamloops BC V2H 03C"}
                    </p>
                  </div>
                  <div
                    className={`flex flex-col md:px-8 text-sm tracking-[0.2rem] gap-2 text-[white] mb-2 ${notoSansFont.className}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[white]/60">
                        {ourExperienceData?.hoursLabel || "Hours of Operation"}
                      </span>
                      <span className="border-b border-[white]/50 flex-1 mx-2"></span>
                      <span className="text-[white]/80 font-normal whitespace-nowrap">
                        {ourExperienceData?.operatingHours ||
                          "11:30 AM – 9:00 PM"}
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
            </motion.div>
          </motion.div>

          {/* Right side */}
          <div className="w-full shrink-0 h-full max-w-[70%] bg-[#FEFAF4] px-5 flex items-center">
            <div className="flex items-center gap-5 w-full h-full max-h-[70%]">
              {arr2.map((item, idx) => (
                <motion.div
                  key={idx}
                  style={{
                    translateX: arr2TranslateX[idx],
                    translateY: arr2TranslateY[idx],
                    zIndex: arr2.length - idx,
                  }}
                  className={`overflow-hidden w-fit relative h-[100%] max-h-[26rem] aspect-[1/1.5] bg-black`}
                >
                  <Image
                    src={item.img}
                    alt={`Right Image ${idx + 1}`}
                    fill
                    className="w-full h-full object-cover"
                    quality={85}
                  />
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
