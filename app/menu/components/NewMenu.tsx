"use client";

import menu1 from "@/public/new_menu/menu1.webp";
import menu2 from "@/public/new_menu/menu2.webp";
import Image from "next/image";
const NewMenu = () => {
  return (
    <>
      <div className="md:w-[100rem] w-full mx-auto lg:flex-row justify-center lg:gap-8 flex flex-col items-center pb-20 pt-32  max-w-[96%]">
        <div className="">
          <Image
            src={menu1}
            alt="New Menu Page 1"
            className="w-full  max-w-full h-auto mb-4 "
          />
        </div>
        <div className="">
          <Image
            src={menu2}
            alt="New Menu Page 2"
            className="w-full  max-w-full h-auto mb-4 "
          />
        </div>
      </div>
    </>
  );
};

export default NewMenu;
