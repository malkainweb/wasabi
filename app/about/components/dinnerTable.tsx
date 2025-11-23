"use client";

import { useRef } from "react";
import Image from "next/image";
import aboutmenu from "@/public/about/aboutMenu.webp";
import { motion, useScroll, useTransform } from "framer-motion";

export const DinnerTable = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  return (
    <>
      <div ref={targetRef} className="relative h-screen w-full mb-10">
        <div
          className="absolute inset-0 z-20 w-full h-full"
          style={{
            background: `linear-gradient(to bottom, black 0%, black 80%, white 80%, white 100%)`,
          }}
        />

        <div className="relative overflow-hidden inset-0 z-30 h-full w-[96%] m-auto">
          <motion.div
            className="absolute inset-0 z-50 w-full h-full blur-2xl"
            style={{
              background: `linear-gradient(to bottom, black 0%, black 35%, transparent 35%, transparent 100%)`,
              opacity,
            }}
          />
          <div>
            <Image
              src={aboutmenu}
              alt="about"
              className="h-full w-full object-cover absolute top-[10%] left-0 z-40"
            />
          </div>
        </div>
      </div>
    </>
  );
};
