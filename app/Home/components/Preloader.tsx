"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/public/logo.webp";
import { forumFont } from "@/app/utils/font";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Hide preloader after completion
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  // Generate floating boxes
  const floatingBoxes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.2,
            filter: "blur(20px)",
          }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[999999] bg-gradient-to-br from-[#FEFAF4] via-[#F5EFE6] to-[#E9DFCF] overflow-hidden"
        >
          {/* Animated Background Boxes */}
          {floatingBoxes.map((box) => (
            <motion.div
              key={box.id}
              initial={{
                x: `${box.x}vw`,
                y: `${box.y}vh`,
                opacity: 0,
                rotate: 0,
              }}
              animate={{
                x: [`${box.x}vw`, `${(box.x + 20) % 100}vw`, `${box.x}vw`],
                y: [`${box.y}vh`, `${(box.y + 30) % 100}vh`, `${box.y}vh`],
                opacity: [0, 0.15, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: box.duration,
                delay: box.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-xl bg-[#C0A078]"
              style={{
                width: box.size,
                height: box.size,
                filter: "blur(40px)",
              }}
            />
          ))}

          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            {/* Logo with Complex Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                rotate: [-180, 10, 0],
                opacity: 1,
              }}
              transition={{
                duration: 1.2,
                ease: [0.6, 0.05, 0.01, 0.9],
                times: [0, 0.6, 1],
              }}
              className="relative mb-8"
            >
              {/* Rotating Ring Around Logo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] border-2 border-dashed border-[#C0A078] rounded-full opacity-30"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-30px] border border-[#C0A078] rounded-full opacity-20"
              />

              <Image
                src={logo}
                alt="Wasabi Logo"
                width={140}
                height={140}
                priority
                className="w-[140px] h-auto relative z-10"
              />
            </motion.div>

            {/* Staggered Text Animation */}
            <div className="flex flex-col items-center mb-8">
              {["WASABI", "MODERN KITCHEN"].map((text, index) => (
                <motion.h2
                  key={text}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.5 + index * 0.2,
                    duration: 0.8,
                    ease: [0.6, 0.05, 0.01, 0.9],
                  }}
                  className={`${forumFont.className} text-[#3E2E1C] ${
                    index === 0 ? "text-3xl" : "text-lg"
                  } tracking-[0.3em] uppercase`}
                >
                  {text}
                </motion.h2>
              ))}
            </div>

            {/* Creative Loading Indicator - Orbiting Dots */}
            <div className="relative w-24 h-24 mb-8">
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                  className="absolute w-3 h-3 rounded-full bg-[#C0A078]"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${index * 90}deg) translateX(40px)`,
                  }}
                />
              ))}

              {/* Center Pulse */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#C0A078]"
              />
            </div>

            {/* Progress Bar with Percentage */}
            <div className="w-[280px] flex flex-col items-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className={`${forumFont.className} text-[#3E2E1C] text-sm tracking-widest`}
              >
                {progress}%
              </motion.div>

              <div className="w-full h-1 bg-[#E9DFCF] rounded-full overflow-hidden relative">
                {/* Background shimmer effect */}
                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />

                {/* Progress fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C0A078] via-[#D4B896] to-[#C0A078] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glowing effect */}
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute right-0 top-0 w-8 h-full bg-white/50 blur-sm"
                  />
                </motion.div>
              </div>

              {/* Loading message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`${forumFont.className} text-[#3E2E1C]/60 text-xs tracking-[0.2em] uppercase mt-2`}
              >
                Preparing your experience
              </motion.div>
            </div>
          </div>

          {/* Corner Decorative Elements */}
          {[
            { top: "5%", left: "5%", rotate: 0 },
            { top: "5%", right: "5%", rotate: 90 },
            { bottom: "5%", left: "5%", rotate: 270 },
            { bottom: "5%", right: "5%", rotate: 180 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0],
                rotate: pos.rotate,
              }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-16 h-16 border-2 border-[#C0A078] rounded-lg"
              style={pos}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
