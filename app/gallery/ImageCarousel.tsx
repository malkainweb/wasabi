"use client";
import { useEffect, useRef, useState } from "react";
import DSC04282 from "@/public/gallery/updated/DSC04282.webp";
import DSC04289 from "@/public/gallery/updated/DSC04289.webp";
import DSC04299 from "@/public/gallery/updated/DSC04299.webp";
import DSC04316 from "@/public/gallery/updated/DSC04316.webp";
import DSC04320 from "@/public/gallery/updated/DSC04320.webp";
import IMG_6464 from "@/public/gallery/updated/IMG_6464.webp";
import IMG_6465 from "@/public/gallery/updated/IMG_6465.webp";
import IMG_6466 from "@/public/gallery/updated/IMG_6466.webp";

const defaultGalleryImages = [
  DSC04282,
  DSC04289,
  DSC04299,
  DSC04316,
  DSC04320,
  IMG_6464,
  IMG_6465,
  IMG_6466,
];

import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import VideoGallery from "./mobileVideoCarousel";
import { GalleryData } from "@/app/sanity/lib/types";
import { urlFor } from "@/app/sanity/lib/image";

interface ImageCarouselProps {
  show?: boolean;
  margin?: boolean;
  galleryData: GalleryData | null;
}

const ImageCarousel = ({ show, margin, galleryData }: ImageCarouselProps) => {
  const [firstImageFullyScaled, setFirstImageFullyScaled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Create arrays with both URL and alt text
  const galleryImages = galleryData?.images
    ? galleryData.images.map((img) => ({
        url: urlFor(img).url(),
        alt: img.alt,
      }))
    : defaultGalleryImages.map((img, index) => ({
        url: img.src,
        alt: `Gallery Image ${index + 1}`,
      }));

  const imageZone = 1 / galleryImages.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0.2 1", "0.96 1"],
  });

  const x = useTransform(scrollYProgress, [0.21, 1], ["50%", "-80%"]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.85, 1]);

  const lastIndexRef = useRef(activeIndex);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let newIndex = Math.round(latest / imageZone - 1.35);
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= galleryImages.length) newIndex = galleryImages.length - 1;
    if (newIndex !== lastIndexRef.current) {
      lastIndexRef.current = newIndex;
      setActiveIndex(newIndex);
    }
  });

  const handleThumbnailClick = (index: number) => {
    if (!containerRef.current) return;
    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY;
    const vhPerImage = 60;
    const targetY =
      containerTop + index * ((window.innerHeight * vhPerImage) / 120);

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  useEffect(() => {
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
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                scale,
              }}
              className="w-full h-[100vh] absolute bottom-0 left-0 z-0 origin-bottom"
            >
              <Image
                src={galleryImages[activeIndex].url}
                alt={galleryImages[activeIndex].alt}
                className="object-cover h-full w-full"
                style={{ filter: "brightness(0.6)" }}
                priority
                sizes="100vw"
                fill
                quality={85}
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            <motion.div
              key="thumbnails"
              initial={{ y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ y: 60 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.3,
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
                    src={image.url}
                    alt={image.alt}
                    width={100}
                    height={150}
                    className="w-full h-full object-cover"
                    quality={75}
                  />
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <VideoGallery
        showdivider={false}
        items={galleryImages.map((img) => ({
          thumbnail: img.url,
          alt: img.alt,
        }))}
        className={`lg:hidden ${margin ? "mt-[9rem]" : " "}`}
      />
    </>
  );
};

export default ImageCarousel;
