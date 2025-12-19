"use client";

import menu1 from "@/public/new_menu/menu1.webp";
import menu2 from "@/public/new_menu/menu2.webp";
import back_1 from "@/public/new_menu/back_1.webp";
import back_2 from "@/public/new_menu/back_2.webp";
import cover from "@/public/new_menu/cover.webp";
import front_1 from "@/public/new_menu/front_1.webp";
import front_2 from "@/public/new_menu/front_2.webp";
import Image from "next/image";
import img_1 from "@/public/new_menu/1.webp";
import img_2 from "@/public/new_menu/2.webp";
import img_3 from "@/public/new_menu/3.webp";
import img_4 from "@/public/new_menu/4.webp";
import img_5 from "@/public/new_menu/5.webp";
import img_6 from "@/public/new_menu/6.webp";

const NewMenu = () => {
  const menuImages = [
    { src: cover, alt: "Menu Cover" },
    { src: front_1, alt: "Menu Front Page 1" },
    { src: front_2, alt: "Menu Front Page 2" },

    { src: back_1, alt: "Menu Back Page 1" },
    { src: back_2, alt: "Menu Back Page 2" },
  ];
  const menuImages2 = [
    // Inner menu pages (mapped from 1.webp → 6.webp)
    { src: img_1, alt: "Menu Inner Page 1" },
    { src: img_2, alt: "Menu Inner Page 2" },
    { src: img_3, alt: "Menu Inner Page 3" },
    { src: img_4, alt: "Menu Inner Page 4" },
    { src: img_5, alt: "Menu Inner Page 5" },
    { src: img_6, alt: "Menu Inner Page 6" },
  ];

  return (
    <>
      <div className="md:w-[100rem] flex flex-col gap-12 min-h-40 w-full mx-auto  md:px-0 px-3   pb-20 pt-32 md:max-w-[96%]">
        <div className="w-full lg:flex-row justify-center  lg:gap-6 gap-7  grid md:grid-cols-3 items-center">
          {menuImages.map((image, index) => (
            <div key={index} className="w-full ">
              <Image
                src={image.src}
                alt={image.alt}
                width={200}
                className="w-full max-w-full h-auto "
              />
            </div>
          ))}
        </div>
        <hr />
        <div className="w-full lg:flex-row justify-center lg:gap-6 gap-7  grid md:grid-cols-3 items-center">
          {menuImages2.map((image, index) => (
            <div key={index}>
              <Image
                src={image.src}
                alt={image.alt}
                width={200}
                className="w-full max-w-full h-auto "
              />
            </div>
          ))}{" "}
        </div>
      </div>
    </>
  );
};

export default NewMenu;
