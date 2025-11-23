import { Forum, Noto_Sans } from "next/font/google";
// import { twMerge } from 'tailwind-merge';
import Image from "next/image";

import bgImage from "@/public/about/feasttable.webp";
import {
  forumFont,
  notoSansFont,
  Optima_bold,
  Optima_medium,
} from "@/app/utils/font";
import Link from "next/link";

export const FeastInStyle = () => {
  return (
    <div className=" h-[100vh] overflow-hidden md:h-[110vh]  relative w-full">
      <Image
        src={bgImage}
        alt="Feast table"
        className="w-full object-center h-full object-cover"
        style={{ filter: "brightness(0.6)" }}
      />
      <div className="absolute inset-0 z-20 bg-transparent h-full w-full flex items-center justify-center">
        <div className="w-full lg:w-[60%] min-w-[300px] aspect-square mx-auto flex flex-col items-center justify-center gap-5">
          <h3
            className={`text-[#FEFAF4] text-[3rem] md:text-7xl text-center tracking-wider w-full ${forumFont.className}`}
          >
            FEAST IN <br className="hidden lg:block" />
            STYLE
          </h3>
          <p
            className={`text-[#FEFAF4] tracking-widest font-light text-lg -mt-5 lg:mt-0 ${notoSansFont.className}`}
          >
            Taste The Wasabi Experience
          </p>

          <Link
            href={"/contact"}
            style={{ transition: "0.4s ease" }}
            className={`${Optima_bold.className} bg-[#C0A078] border-white/30 hover:border-[#C0A078] border text-black px-[2rem] tracking-widest cursor-pointer hover:bg-white hover:text-black py-[0.6rem]  rounded-full w-fit`}
          >
            RESERVE{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};
