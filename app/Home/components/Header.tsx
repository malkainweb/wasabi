"use client";
import mainImg from "@/public/home/headerImg.webp";
import rightCenter from "@/public/home/rightcenter.webp";
import rightbottom from "@/public/home/rightbottom.webp";
import logo from "@/public/logo.webp";
import righttop from "@/public/home/righttop.webp";
import leftBottom from "@/public/home/leftbottom.webp";
import leftCenter from "@/public/home/leftcenter.webp";
import lefttop from "@/public/home/lefttop.webp";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // For unique keys, install with: npm i uuid

import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { forumFont, notoSansFont, Optima_bold } from "@/app/utils/font";
import Link from "next/link";
import { useScrollDirection } from "@/app/utils/ScrollDirection";
import { usePathname } from "next/navigation";
import MobileHeader from "./MobileHeader";
import MobileGourmetBliss from "./MobileGourmentBliss";
import { MenuIcon } from "lucide-react";
import { MobileNavBar } from "./MobileNavBar";

const Header = () => {
  const arr = [
    { bg: "bg-red-400", label: "A", img: leftCenter },
    { bg: "bg-yellow-400", label: "B", img: lefttop },
    { bg: "bg-blue-400", label: "C", img: leftBottom },
  ];
  const arr2 = [
    { bg: "bg-red-400", label: "A", img: righttop },
    { bg: "bg-yellow-400", label: "B", img: rightCenter },
    { bg: "bg-blue-400", label: "C", img: rightbottom },
  ];
  const scrollDirection = useScrollDirection();

  const gridClasses = [
    // Index 2: bottom right
    "flex items-center justify-center text-3xl font-semibold rounded",
    // Index 0: large left block
    "row-span-2 flex items-center justify-center text-white text-4xl font-bold rounded",
    // Index 1: top right
    "flex items-center justify-center text-3xl font-semibold rounded",
  ];
  const gridClasses2 = [
    // Index 0: large left block
    "row-span-2 flex items-center justify-center text-white text-4xl font-bold rounded", // Index 1: top right

    "flex items-center justify-center text-3xl font-semibold rounded",

    // Index 2: bottom right
    "flex items-center justify-center text-3xl font-semibold rounded",
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  // Observe the main sticky flex row
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0.2 1", "0.9 1"], // Start at 20%, end at 70%
  });

  // Map progress [0, 1] to width ["10%", "100%"]
  const translateY = useTransform(scrollYProgress, [0.04, 0.2], ["20%", "0%"]);
  const width = useTransform(scrollYProgress, [0.25, 0.58], ["30%", "100%"]);
  const navWidth = useTransform(scrollYProgress, [0, 0.2], ["10rem", "100rem"]);
  // Animate bg opacity from 0.1 (10%) to 0.8 (80%) between scrollYProgress 0 and 0.2
  const navBgOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0.1, 0.8]);
  const navBgColor = useMotionTemplate`rgba(77, 78, 77, ${navBgOpacity})`;

  const scale = useTransform(scrollYProgress, [0.58, 1], [1, 1.8]);

  // Opacity: from 0 to 1 between 0.58 and 0.6
  const opacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  // Scale: from 1 to 0.8 between 0.58 and 1
  const Textscale = useTransform(scrollYProgress, [0.58, 1], [1, 0.7]);
  // Background opacity: from 0 to 0.4 between 0.58 and 0.8
  const bgOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.55, 0.8],
    [0, 0.4, 0.7]
  );
  const bgColor = useMotionTemplate`rgba(0,0,0,${bgOpacity})`;

  const logoTranslateY = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["23rem", "0rem"]
  );

  const canShowNavbar = useTransform(scrollYProgress, (v) => v > 0.5);

  const [canShow, setCanShow] = useState(false);
  const [canShowMobileNav, setCanShowMobileNav] = useState(false);

  // Listen to the motion value
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCanShow(v > 0.5);
  });

  // Track a navVisibleId so we can trigger a fade every time it’s re-shown
  const [navVisibleId, setNavVisibleId] = useState(() => uuidv4());

  // Every time nav should reappear (from scrollDirection and canShow), change the key
  useEffect(() => {
    if (!(canShow && scrollDirection === "down")) {
      // Navbar is hidden
      return;
    }
    setNavVisibleId(uuidv4());
    // eslint-disable-next-line
  }, [canShow, scrollDirection]);

  const navLinks = [
    { label: "Home", href: "/" },

    { label: "Gallery", href: "/gallery" },
    { label: "Menu", href: "/menu" },
    { label: "About", href: "/about" },
  ];

  const pathname = usePathname();

  return (
    <>
      <motion.nav
        animate={
          {
            // top: canShow && scrollDirection === "down" ? "-6rem" : "1rem",
          }
        }
        style={{
          width: navWidth,
          // top: canShow && scrollDirection === "down" ? "-6rem" : "1rem",
          transition: "top 0.5s cubic-bezier(.76,0,.24,1)",
        }}
        className=" md:flex justify-center left-[50%] hidden  translate-x-[-50%] fixed top-[1rem] w-[100rem] max-w-[95%] z-[99999] items-center "
      >
        <motion.div
          style={{ backgroundColor: navBgColor }}
          className="flex items-center w-full relative bg-[#4D4E4D]/10  rounded-[20px] backdrop-blur-[20px] p-2 justify-between shadow-sm"
        >
          <motion.div className="absolute top-[50%] h-[100%]  left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
            <motion.div style={{ y: logoTranslateY }} className="h-full ">
              <Image src={logo} alt="Logo" className="h-full w-fit " />
            </motion.div>
          </motion.div>
          {/* Left: Menu and Links */}
          <div className="flex items-center gap-4 ">
            {/* Hamburger */}
            <button className="flex ml-2 items-center justify-center rounded-full border border-[#C0A078] w-10 h-10 bg-[#EFE0CD] hover:bg-[#f5efde] transition">
              <i className="bi bi-list text-xl text-[#c0a078]" />
            </button>
            {/* Nav links */}
            <ul
              className={`flex gap-4 tracking-widest text-sm text-[#C0A078] uppercase ${Optima_bold.className}`}
            >
              {navLinks.map((item) => (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`hover:text-[#a89065] cursor-pointer transition ${
                    pathname === item.href
                      ? "underline-offset-4 underline border-[#a89065] font-semibold"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </ul>
          </div>
          {/* Right: CTA */}
          <Link
            href="/reserve"
            className={`rounded-full px-6 py-3 text-base font-normal bg-[#C0A078] text-black uppercase  shadow hover:bg-[#b99c71] transition ${notoSansFont.className}  tracking-widest`}
          >
            Book a reservation
          </Link>
        </motion.div>
      </motion.nav>
      {/* Mobile nav */}
      <nav
        className="md:hidden  fixed top-[2rem] left-1/2 -translate-x-1/2 z-50 w-[92%]"
        aria-label="Mobile navigation"
      >
        <div className="flex border border-white/30 items-center justify-between rounded-full px-4 py-2 bg-black/30 backdrop-blur-lg">
          {/* round menu button */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setCanShowMobileNav(true)}
            className="relative inline-flex items-center justify-center rounded-full  backdrop-blur-xs cursor-pointer"
          >
            <span className="sr-only">Open menu</span>
            <span className="flex items-center justify-center rounded-full border-[1.5px] border-[#C0A078] size-11 bg-[#EFE0CD] hover:bg-[#f5efde] transition">
              <i className="bi bi-list text-xl text-[#c0a078]" />
            </span>
          </button>
          <Image
            src={logo}
            alt="Wasabi"
            className="h-12 w-auto select-none"
            priority
            draggable={false}
          />
        </div>
      </nav>
      {canShowMobileNav && (
        <MobileNavBar
          onClose={() => setCanShowMobileNav(false)}
          items={navLinks}
          onStartAnime={canShowMobileNav}
        />
      )}
      {/* Mobile hero */}
      <MobileHeader />

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
        className={` bg-[#FEFAF4] pt-[12rem] overflow-clip w-full  flex-col h-[400vh] hidden md:flex relative`}
      >
        <h1
          className={`uppercase   z-[20] text-center text-[80px] leading-[120%] mb-[-5vh] text-[#3E2E1C] ${forumFont.className} tracking-widest`}
        >
          Refined <br /> Indulgence
        </h1>{" "}
        <motion.div
          className="w-full  sticky bg-[#FEFAF4] top-0 shrink-0 left-0 h-[100vh]"
          style={{ translateY }}
        >
          {/* The scale animation is on this wrapper for the image */}
          <motion.div
            style={{ scale }}
            className="w-full  overflow-clip h-full"
          >
            <Image
              src={mainImg}
              alt="Header Image"
              className="w-full h-full object-cover"
              priority
              draggable={false}
            />
          </motion.div>
        </motion.div>
        <motion.div className="flex w-full  mt-[-100vh] justify-center items-center overflow-hidden  sticky top-0 left-0 h-[100vh] z-[10]    ">
          <div className="hidden md:flex w-full shrink-0 h-full  max-w-[50%] bg-[#FEFAF4] px-8 items-center">
            <div className="grid grid-cols-2  grid-rows-[40%_60%] gap-6 w-full h-full  max-h-[70%]">
              {arr.map((item, idx) => (
                <div
                  key={item.label}
                  className={` bg-black ${gridClasses2[idx]}`}
                >
                  <Image
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />{" "}
                </div>
              ))}
            </div>
          </div>
          <motion.div
            style={{
              width,
              backgroundColor: bgColor,
            }}
            className="w-full md:w-[30%] min-w-0 flex gap-1 justify-center items-center flex-col text-white h-full md:shrink-0"
          >
            <motion.div
              style={{
                opacity,
                scale: Textscale,
              }}
              className="flex flex-col items-center justify-center gap-1"
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
            </motion.div>
          </motion.div>

          <div className="hidden  md:flex w-full shrink-0 h-full  max-w-[50%] bg-[#FEFAF4] px-8 items-center">
            <div className="grid grid-cols-2 overflow-hidden  grid-rows-[30%_70%] gap-6 w-full h-full  max-h-[70%]">
              {arr2.map((item, idx) => (
                <div
                  key={item.label}
                  className={`bg-black ${gridClasses[idx]}`}
                >
                  <Image
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <div className=" w-full text-white bg-black sticky top-[100%] left-0 z-[100]">
          <div className="flex flex-col relative">
            <div className="h-[90%] w-full absolute top-0 left-0  bg-gradient-to-b  from-black via-black"></div>
            <div className="flex z-[100] items-center  py-[10rem]  gap-[2rem] flex-col">
              <h2
                className={`"z-[10] text-white tracking-widest text-7xl text-center font-light uppercase ${forumFont.className}`}
              >
                Experience <br /> Gourmet Bliss
              </h2>
              <p
                className={`${notoSansFont.className} z-[10] tracking-widest capitalize text-white  font-light text-center text-lg`}
              >
                Savor elegance, flavor, and ambiance like never before. <br />{" "}
                Now Open: Tuesday – Sunday | 5 PM – 11 PM
              </p>

              <button
                style={{ transition: "0.4s ease" }}
                className={`${notoSansFont.className} px-[2.4rem] tracking-widest cursor-pointer hover:bg-white hover:text-black py-[0.7rem] border border-white rounded-full w-fit`}
              >
                <Link href="/reserve">RESERVE A TABLE</Link>
              </button>
            </div>

            {/* <div className="w-full ">
              <Image src={foodimg} alt="foodimg" className="w-full h-fit" />
            </div> */}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
