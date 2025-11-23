"use client";
import mainImg from "@/public/home/headerImg.webp";
import foodimg from "@/public/home/foodimg.webp";
import rightCenter from "@/public/home/rightCenter.webp";
import rightbottom from "@/public/home/rightbottom.webp";
import logo from "@/public/logo.webp";
import righttop from "@/public/home/righttop.webp";
import leftBottom from "@/public/home/leftBottom.webp";
import leftCenter from "@/public/home/leftCenter.webp";
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
import { forumFont, notoSansFont, Optima_bold } from "../utils/font";
import Link from "next/link";
import { useScrollDirection } from "../utils/ScrollDirection";
import { usePathname } from "next/navigation";
import { MobileNavBar } from "../Home/components/MobileNavBar";

const GeneralHeader = ({ canShow }: any) => {
  const scrollDirection = useScrollDirection();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "Menu", href: "/menu" },
    { label: "About", href: "/about" },
  ];

  const pathname = usePathname();
  const [canShowMobileNav, setCanShowMobileNav] = useState(false);

  return (
    <>
      <motion.nav
        // animate={{
        //   top: canShow && scrollDirection === "down" ? "-6rem" : "1rem",
        // }}
        style={{
          // top: canShow && scrollDirection === "down" ? "-6rem" : "1rem",
          transition: "top 0.8s cubic-bezier(.76,0,.24,1)",
        }}
        className=" md:flex  justify-center left-[50%] hidden  translate-x-[-50%] fixed top-[1rem] w-[100rem] max-w-[95%] z-[99999] items-center "
      >
        <motion.div className="flex items-center w-full relative bg-[#4D4E4D]/70  rounded-[20px] backdrop-blur-[20px] p-2 justify-between shadow-sm">
          <motion.div className="absolute top-[50%] h-[100%]  left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
            <Link href={"/"} className="h-full ">
              <Image src={logo} alt="Logo" className="h-full w-fit " />
            </Link>
          </motion.div>
          {/* Left: Menu and Links */}
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button className="flex ml-2 items-center justify-center rounded-full border border-[#C0A078] w-10 h-10 bg-[#EFE0CD] hover:bg-[#f5efde] transition">
              <i className="bi bi-list text-xl text-[#c0a078]" />
            </button>
            {/* Nav links */}
            <ul
              className={`flex gap-4  tracking-widest text-sm text-[#EFE0CD] uppercase ${Optima_bold.className}`}
            >
              {navLinks.map((item) => (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`hover:text-[#a89065] cursor-pointer  transition ${
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
          <a
            href="tel:+12509841632"
            className={`rounded-full px-6 py-3 text-base font-normal bg-[#C0A078] text-black uppercase  shadow hover:bg-[#b99c71] transition ${notoSansFont.className}  tracking-widest`}
          >
            Book a reservation
          </a>
        </motion.div>
      </motion.nav>

      {/* Mobile nav */}
      <nav
        className="md:hidden  fixed top-[2rem] left-1/2 -translate-x-1/2 z-50 w-[92%]"
        aria-label="Mobile navigation"
      >
        <div className="flex border border-white/30 items-center justify-between rounded-full px-4 py-2 bg-[#4D4E4D]/10  backdrop-blur-lg">
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
    </>
  );
};

export default GeneralHeader;
