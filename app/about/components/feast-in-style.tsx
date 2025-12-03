import Image from "next/image";
import bgImage from "@/public/about/feasttable.webp";
import {
  forumFont,
  notoSansFont,
  Optima_medium,
  Optima_regular,
} from "@/app/utils/font";

export const FeastInStyle = () => {
  return (
    <div
      className={`h-[100vh] md:h-[110vh] text-white  text-center  text-balance relative w-full overflow-hidden ${Optima_regular.className}`}
    >
      {/* Background Image */}
      <Image
        src={bgImage}
        alt="The Space"
        className="w-full h-full object-cover"
        style={{ filter: "brightness(0.45)" }}
      />

      {/* CONTENT */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        {/* MAIN TITLE */}
        <h3 className={`  text-5xl md:text-7xl  mb-4 ${forumFont.className}`}>
          THE SPACE
        </h3>

        {/* SUBTITLE TEXT */}
        <p className={` max-w-2xl  mb-6 font-light ${notoSansFont.className}`}>
          Located In The Sun Rivers Community Of Kamloops, Beside Big Horn Golf
          Course. Our Restaurant Features:
        </p>

        {/* CENTER BOX */}
        <div
          className="
          bg-[#4D4E4D99]/60 
          backdrop-blur-2xl 
          rounded-3xl 
          p-6
          max-w-md 
          w-full
        "
        >
          {/* FEATURES TITLE */}
          <p className={` opacity-50 mb-4 ${Optima_medium.className}`}>
            FEATURES
          </p>

          {/* FEATURES LIST */}
          <div className="space-y-1 md:space-y-2 text-sm font-light ">
            <p>55-Seat Licensed Space (60+ Physical Seating)</p>
            <p>Dedicated Sushi Bar</p>
            <p>Full Drink Bar</p>
            <p>Warm And Modern Interiors</p>
            <p>Designed For Comfort And Connection</p>
          </div>
        </div>
      </div>
    </div>
  );
};
