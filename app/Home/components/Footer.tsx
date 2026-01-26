"use client";

import Link from "next/link";
import footerLogo from "@/public/footerLogo.webp";
import { forumFont, notoSansFont, Optima_regular } from "@/app/utils/font";
import Image from "next/image";

const Footer = () => {
  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "MENU", href: "/menu" },
    { label: "RESERVE", href: "/reserve" },
    { label: "GALLERY", href: "/gallery" },
  ];

  const currentYear = new Date().getFullYear();

  const iconLinks = [
    {
      href: "tel:+1-250-984-1632",
      label: "Phone",
      target: "_blank",
      rel: "noopener noreferrer",
      iconClass: "bi bi-telephone",
    },
    {
      href: "mailto:Info@wasabimodernkitchen.com",
      label: "Email",
      rel: "noopener noreferrer",
      target: "_blank",
      iconClass: "bi bi-envelope",
    },
  ];

  return (
    <footer
      className={`flex bg-[#000000] md:pb-[2rem] -mb-[2px] -mt-[1px] md:pt-[4rem] flex-col ${forumFont.className}`}
    >
      <div className="flex md:w-[150rem] w-full flex-col justify-center mx-auto items-center max-w-full">
        {/* Mobile Logo */}
        <div className="md:hidden w-full">
          <div className="flex items-center justify-center mb-4 w-[40%] mx-auto">
            <Image
              src={footerLogo}
              alt="Wasabi"
              className="w-full h-auto"
              priority
            />
          </div>
          <hr className="bg-[#C0A079] mt-4 w-full h-[1px] mb-8" />
        </div>

        {/* Navigation Links */}
        <nav className="w-full">
          <ul className="flex md:flex-row px-4 md:px-0 flex-col md:gap-0 gap-4 justify-between w-full">
            {navLinks.map((link) => (
              <li key={link.label} className="w-full md:py-0 py-2 uppercase">
                <a
                  href={link.href}
                  className="text-[#C0A079] md:w-fit mx-auto flex md:justify-center justify-between w-full hover:underline tracking-wide"
                >
                  {link.label}
                  <i className="bi bi-chevron-right md:hidden text-[#C0A079]/70" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Location Card */}
        <div className="mt-[4rem] w-[90%] md:w-fit mb-[0rem] relative">
          <Image
            src={footerLogo}
            alt="footer logo"
            className="w-[13rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-fit"
          />
          <div
            className="relative md:max-w-[600px] w-full bg-[#4D4E4D]/25 backdrop-blur-[50px] rounded-[30px] py-7 px-7 md:px-0 md:py-10 text-[#C0A079] mx-auto"
            style={{ boxShadow: "0 6px 40px 0 #0009" }}
          >
            <div className="relative z-10 flex flex-col gap-2">
              {/* Title */}
              <div
                className={`text-lg md:text-xl md:px-8 font-medium tracking-widest mb-3 uppercase ${forumFont.className}`}
              >
                Canada
              </div>

              {/* Divider */}
              <div className="border-b border-[#35302a] mb-4"></div>

              {/* Address */}
              <div className="md:px-8 font-normal mb-2 tracking-[0.25rem]">
                <p className={`${Optima_regular.className}`}>
                  102-1020 Talasa way,
                  <br />
                  Kamloops BC V2H 03C
                </p>
              </div>

              {/* Hours - Simplified */}
              <div
                className={`flex flex-col md:px-8 text-sm tracking-[0.2rem] gap-2 text-[#b2afab] mb-2 ${notoSansFont.className}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#C0A079]/50">Hours of Operation</span>
                  <span className="flex-1 border-b border-[white]/10 mx-2"></span>
                  <span className="text-[#C0A079]/80 font-normal whitespace-nowrap">
                    11:30 AM – 9:00 PM
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#C0A079]/50">Open</span>
                  <span className="flex-1 border-b border-[white]/10 mx-2"></span>
                  <span className="text-[#C0A079]/80 font-normal">
                    Seven days a week
                  </span>
                </div>
              </div>

              {/* Bottom Divider */}
              <div className="border-b border-[#35302a] my-3"></div>
            </div>
          </div>
        </div>

        <hr className="bg-[#C0A079] mt-7 md:hidden w-full h-[1px] mb-10" />

        {/* Footer Bottom */}
        <div className="w-full max-w-[94%] flex-col relative md:flex-row items-center gap-3 md:pb-0 pb-10 flex justify-between md:items-end md:mt-[9rem]">
          <div className="flex flex-col md:absolute left-[50%] md:translate-x-[-50%] -bottom-2 items-center mb-2 gap-4">
            <div className="flex gap-7 mt-1">
              {iconLinks.map((icon) => (
                <a
                  key={icon.label}
                  href={icon.href}
                  target={icon.target}
                  rel={icon.rel}
                  className="rounded-full aspect-square text-sm w-[3rem] border border-[#C0A079] p-2 flex items-center justify-center text-[#C0A079] hover:bg-[#1b1711] transition"
                  aria-label={icon.label}
                >
                  <i className={icon.iconClass}></i>
                </a>
              ))}
            </div>
          </div>

          <span className="text-[#C0A079] text-sm">
            © {currentYear} Wasabi. All rights reserved.
          </span>

          <a
            href="https://www.malkain.com/"
            className="text-[#C0A079] underline underline-offset-4 text-sm text-right whitespace-nowrap"
          >
            Designed by Malakin Designs
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
