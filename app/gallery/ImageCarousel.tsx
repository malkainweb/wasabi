"use client";
import { useEffect, useRef, useState } from "react";
import gallery1 from "@/public/gallery/gallery1.webp";
import gallery2 from "@/public/gallery/gallery2.webp";
import gallery3 from "@/public/gallery/gallery3.webp";
import gallery4 from "@/public/gallery/gallery4.webp";
import gallery5 from "@/public/gallery/gallery5.webp";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { notoSansFont } from "@/app/utils/font";
import VideoGallery, { galleryImagesMobile } from "./mobileVideoCarousel";

const ImageCarousel = ({ show, margin }: any) => {
  // Step 1: Build your array
  const galleryImages = [
    {
      src: gallery1,
      text: "STACYS WEDDING PROPOSAL",
      author: "by kelvin adams",
    },
    {
      src: gallery2,
      text: "DINNER DATE",
      author: "by kelvin adams",
    },
    {
      src: gallery3,
      text: "BUSINESS MEET UP",
      author: "by kelvin adams",
    },
    {
      src: gallery4,
      text: "ROMANTIC EVENING",
      author: "by kelvin adams",
    },
    {
      src: gallery5,
      text: "FAMILY CELEBRATION",
      author: "by kelvin adams",
    },
  ];

  const [firstImageFullyScaled, setFirstImageFullyScaled] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Track active index in state (default 0)
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate the scroll "zone" for each image
  const imageZone = 1 / galleryImages.length;

  // Attach scroll progress to the container section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0.2 1", "0.96 1"], // Start at 20%, end at 100% scroll
  });

  // Animate X translation and scale based on scroll position
  const x = useTransform(scrollYProgress, [0.27, 1], ["50%", "-80%"]);
  const scale = useTransform(scrollYProgress, [0, 0.26], [0.85, 1]);

  // Keep a ref for last index so we only update state when it changes
  const lastIndexRef = useRef(activeIndex);

  // As scrollYProgress changes, update activeIndex
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let newIndex = Math.round(latest / imageZone - 1.35);
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= galleryImages.length) newIndex = galleryImages.length - 1;
    if (newIndex !== lastIndexRef.current) {
      lastIndexRef.current = newIndex;
      setActiveIndex(newIndex);
    }
  });

  // Scroll to the image's position when a thumbnail is clicked
  const handleThumbnailClick = (index: number) => {
    // Figure out where the container starts in the document
    if (!containerRef.current) return;
    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY;
    // Each image is a "zone" in the scroll, so calculate the target scroll position
    const vhPerImage = 60; // Each image zone is 60vh (per your height logic)
    const targetY =
      containerTop + index * ((window.innerHeight * vhPerImage) / 120);

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    // Listen for scale changes only when activeIndex === 0
    if (activeIndex !== 0) {
      setFirstImageFullyScaled(false);
      return;
    }
    const unsubscribe = scale.on("change", (latest) => {
      if (latest >= 0.995) {
        setFirstImageFullyScaled(true);
      } else {
        setFirstImageFullyScaled(false);
      }
    });
    return unsubscribe;
  }, [activeIndex, scale]);
  return (
    <>
      <div
        ref={containerRef}
        className="relative hidden lg:block w-full"
        style={{ height: `${galleryImages.length * 60}vh` }}
      >
        {!show && <div className="h-[20vh]"></div>}
        <div className="h-[100vh] flex justify-end pb-[5vh] items-end w-full sticky top-0 left-0">
          <AnimatePresence mode="wait">
            {activeIndex !== 0 || firstImageFullyScaled ? (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute left-[6vw] top-1/3 z-10 max-w-[75vw] flex flex-row items-start gap-2"
                style={{ pointerEvents: "none" }}
              >
                <span
                  className={` ${notoSansFont.className}  text-4xl md:text-6xl text-white  tracking-tight`}
                >
                  {galleryImages[activeIndex].text}
                </span>
                <span
                  className={`text-base md:text-xl text-white font-light ml-4 self-center translate-y-[-0.7em] capitalize ${notoSansFont.className}`}
                  style={{
                    letterSpacing: "0.01em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {galleryImages[activeIndex].author}
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                scale,
              }}
              className="w-full h-[100vh] absolute bottom-0 left-0 z-0 origin-bottom"
            >
              <Image
                src={galleryImages[activeIndex].src}
                alt="Gallery Background"
                className="object-cover h-full w-full"
                style={{ filter: "brightness(0.6)" }}
                priority
                sizes="100vw"
                fill
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            <motion.div
              key="thumbnails"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.3, // Stagger the reveal (optional)
              }}
              style={{ x }}
              className="w-fit gap-[1%] flex z-[10]"
            >
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  style={{ transition: "0.3s ease-in-out" }}
                  className={`flex flex-col bg-white rounded-[15px] overflow-hidden items-center justify-center aspect-[1/0.5] cursor-pointer h-fit shrink-0 w-[25%]
          ${index === activeIndex ? "ring-4 ring-[white]" : ""}`}
                >
                  <Image
                    src={image.src}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <VideoGallery
        showdivider={false}
        items={galleryImagesMobile}
        className={`lg:hidden ${margin ? "mt-[9rem]" : " "}`}
      />
    </>
  );
};

export default ImageCarousel;
