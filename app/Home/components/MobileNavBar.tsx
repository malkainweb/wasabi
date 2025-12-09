import Link from "next/link";
import React, { useEffect, useState } from "react";

type NavLink = {
  label: string;
  href: string;
};

type Props = {
  items: NavLink[];
  onClose: () => void;
  onStartAnime: boolean;
};

export const MobileNavBar = ({ items, onClose, onStartAnime }: Props) => {
  const [startAnime, setstartAnime] = useState(false);

  useEffect(() => {
    if (onStartAnime) {
      setstartAnime(true);
    }
  }, [onStartAnime]);

  const handleClose = () => {
    setstartAnime(false);
    setTimeout(() => onClose(), 500); // Wait for animation to complete
  };
  return (
    <div
      style={{ transition: "0.5s ease" }}
      onClick={handleClose}
      className={`md:hidden fixed inset-0 z-[99999] flex items-end ${
        startAnime ? " bg-black/50  backdrop-blur-xl" : ""
      } justify-center `}
    >
      {/* Panel: slide from bottom -> 0 */}
      <div
        style={{ transition: "0.5s ease" }}
        className={`relative w-[92%] border border-white/20 max-w-[26rem] mb-[max(25px,env(safe-area-inset-bottom))]
                   rounded-[30px] bg-black/50 backdrop-blur-lg shadow-2xl text-[#AAE1FD] p-6 ${
                     startAnime ? "  " : "translate-y-[130%]"
                   }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button (floating) */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="
             w-10 h-10 rounded-full bg-[#C0A078] border border-white/30
             flex items-center justify-center mx-auto mb-4 text-black"
        >
          <i className="bi bi-x text-xl"></i>
        </button>

        <nav className="w-full">
          <ul className="flex flex-col items-center text-center font-social tracking-wide">
            {items.map((item) => (
              <li key={item.href} className="w-full">
                <Link
                  href={item.href}
                  onClick={handleClose}
                  className="block py-2 text-xl font-social  font-bold uppercase text-[#c0a078]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className="mt-3 px-2">
          <Link
            href="/reserve"
            onClick={handleClose}
            className="block w-full rounded-full bg-[#C0A078]
                       text-center text-black font-social font-semibold uppercase
                       py-3.5 text-lg"
          >
            Reserve Now
          </Link>
        </div>
      </div>
    </div>
  );
};
