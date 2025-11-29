"use client";

import menu1 from "@/public/new_menu/menu1.webp";
import menu2 from "@/public/new_menu/menu2.webp";
import back_1 from "@/public/new_menu/back_1.webp";
import back_2 from "@/public/new_menu/back_2.webp";
import cover from "@/public/new_menu/cover.webp";
import front_1 from "@/public/new_menu/front_1.webp";
import front_2 from "@/public/new_menu/front_2.webp";
import Image from "next/image";

const NewMenu = () => {
  const menuImages = [
    { src: cover, alt: "Menu Cover" },
    { src: front_1, alt: "Menu Front Page 1" },
    { src: front_2, alt: "Menu Front Page 2" },

    { src: back_1, alt: "Menu Back Page 1" },
    { src: back_2, alt: "Menu Back Page 2" },
  ];

  return (
    <>
      <div className="md:w-[100rem] min-h-40 w-full mx-auto lg:flex-row justify-center lg:gap-8 grid md:grid-cols-3 md:px-0 px-3  gap-7 items-center pb-20 pt-32 max-w-[96%]">
        {menuImages.map((image, index) => (
          <div key={index}>
            <Image
              src={image.src}
              alt={image.alt}
              className="w-full max-w-full h-auto "
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default NewMenu;
