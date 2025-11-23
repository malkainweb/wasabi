"use client";
import RecipeOne from "@/public/home/recipes/RecipeOne.webp";
import RecipeTwo from "@/public/home/recipes/RecipeTwo.webp";
import RecipeThree from "@/public/home/recipes/RecipeThree.webp";
import RecipeFour from "@/public/home/recipes/RecipeFour.webp";
import RecipeFive from "@/public/home/recipes/RecipeFive.webp";
import RecipeSix from "@/public/home/recipes/RecipeSix.webp";

import Image from "next/image";
import hoverMe from "@/../public/recipe/hoverme.webp";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { forumFont, notoSansFont } from "@/app/utils/font";
import Link from "next/link";
import HomeRecipesMobile from "./HomeRecipesMobile";

const recipes = [
  {
    id: 1,

    image: RecipeOne,
  },
  {
    id: 2,
    image: RecipeTwo,
  },
  {
    id: 3,
    image: RecipeThree,
  },
  {
    id: 4,
    image: RecipeFour,
  },
  {
    id: 5,
    image: RecipeFive,
  },
  {
    id: 6,
    image: RecipeSix,
  },
];

const HomeRecipes = () => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // ✅ Track Scroll Progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["10% 100%", ` ${isMobile ? "100%" : "130%"} 100%`],
  });
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const getTranslateX = (
    desktop: [string, string],
    mobile?: [string, string]
  ) => {
    // desktop = [A, B]
    const [A, B] = desktop;
    return useTransform(
      scrollYProgress,
      [0, 0.5, 0.7, 1],
      isMobile && mobile ? ["0%", "0%", "0%", "0%"] : [A, B, B, A]
    );
  };

  const getTranslateY = (
    desktop: [string, string],
    mobile?: [string, string]
  ) => {
    const [A, B] = desktop;
    return useTransform(
      scrollYProgress,
      [0, 0.5, 0.7, 1],
      isMobile && mobile ? ["0%", "0%", "0%", "0%"] : [A, B, B, A]
    );
  };

  const getScale = (desktop: [number, number], mobile?: [number, number]) => {
    return useTransform(
      scrollYProgress,
      [0, 1],
      isMobile && mobile ? [1, 1] : desktop
    );
  };

  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  const translateXValues = [
    getTranslateX(["-20%", "5%"]), // 1st element
    getTranslateX(["15%", "0%"]), // 2nd element
    getTranslateX(["0%", "-10%"]), // 3rd element (center)
    getTranslateX(["-10%", "-5%"]), // 4th element
    getTranslateX(["-10%", "-10%"]), // 4th element
    getTranslateX(["20%", "-20%"]), // 5th element
  ];

  const translateYValues = [
    getTranslateY(["-30%", "0%"]), // 1st (same on all screens)
    getTranslateY(["10%", "0%"]), // 2nd (mobile override)
    getTranslateY(["0%", "25%"]), // 3rd (same)
    getTranslateY(["-20%", "-20%"]), // 4th (mobile override)
    getTranslateY(["-10%", "0%"]), // 4th (mobile override)
    getTranslateY(["5%", "-25%"]), // 5th (same)
  ];

  //   const scaleValues = [
  //     getScale([1, 1]), // 1st element (same)
  //     getScale([1, 0.8], [0.7, 1]), // 2nd element (optional mobile override)
  //     getScale([1, 0.93]), // 3rd element (same)
  //     getScale([1, 1.2], [1, 1.3]), // 4th element (optional mobile override)
  //     getScale([1, 1.06], [1, 1.2]), // 5th element (same)
  //   ];

  // ✅ Add Rotation Transform (Slight Tilt Effect)
  const rotateValues = [
    useTransform(
      scrollYProgress,
      [0, 0.5, 0.7, 1],
      ["288deg", "32deg", "32deg", "144deg"]
    ),
    useTransform(
      scrollYProgress,
      [0, 0.5, 0.7, 1],
      ["-216deg", "-36deg", "-36deg", "36deg"]
    ),
    useTransform(
      scrollYProgress,
      [0, 0.5, 0.7, 1],
      ["180deg", "0deg", "0deg", "-72deg"]
    ),
    useTransform(
      scrollYProgress,
      [0, 0.5, 0.7, 1],
      ["144deg", "72deg", "72deg", "216deg"]
    ),
    useTransform(
      scrollYProgress,
      [0, 0.5, 0.7, 1],
      ["-108deg", "-12deg", "-12deg", "72deg"]
    ),
    useTransform(
      scrollYProgress,
      [0, 0.5, 0.7, 1],
      ["432deg", "18deg", "18deg", "-144deg"]
    ),
  ];
  const zIndexValues = [2, 5, 6, 6, 3, 4];
  const [groupHovered, setGroupHovered] = useState(false);

  const [hoverIndex, setHoverIndex] = useState<any>(null);
  const [openModal, setopenModal] = useState(true);
  const [activeIndex, setactiveIndex] = useState(1); //   // ✅ Modal Animation State
  const [modalState, setModalState] = useState("entering"); // Tracks modal position
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // const scrollContainerRef = useRef<any>(null);

  // ✅ Handle Modal Open/Close
  const handleHover = (index: any) => {
    setModalState("entering"); // Move modal left
    setTimeout(() => {
      setModalState("leaving"); // Move modal left
    }, 200);
    timeoutRef.current = setTimeout(() => {
      setModalState("center"); // Bring modal back from right
      setactiveIndex(index);
    }, 270);
  };

  const handleHoverLeave = () => {
    // setModalState("entering");
    // if (timeoutRef.current) clearTimeout(timeoutRef.current); // Prevent unintended animations
    // setModalState("entering"); // Ensure it goes left
  };

  // ✅ On Mount, move modal from right to center
  useEffect(() => {
    setTimeout(() => setModalState("center"), 500); // Center it after mount
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      return;
    } else {
    }
  }, [activeIndex]);
  const scrollContainerRef = useRef<any>(null);
  const recipeCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        let closestIndex = -1;
        let closestDistance = Infinity;

        recipeCardRefs.current.forEach((card, index) => {
          if (!card) return;

          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(containerCenter - cardCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex !== -1) {
          console.log("🛑 Scrolled to rest. Centered index:", closestIndex);
          handleHover(closestIndex);
        }
      }, 50); // Wait 120ms after last scroll before acting
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isMobile]);
  const scrollToCard = (direction: "prev" | "next") => {
    if (!scrollContainerRef.current || !recipeCardRefs.current.length) return;

    let newIndex = activeIndex;

    if (direction === "prev" && activeIndex > 0) {
      newIndex = activeIndex - 1;
    } else if (direction === "next" && activeIndex < recipes.length - 1) {
      newIndex = activeIndex + 1;
    }

    const targetCard = recipeCardRefs.current[newIndex];
    const container = scrollContainerRef.current;

    if (targetCard && container) {
      const cardOffsetLeft = targetCard.offsetLeft;
      const cardWidth = targetCard.offsetWidth;
      const containerWidth = container.offsetWidth;

      const scrollTo = cardOffsetLeft - (containerWidth - cardWidth) / 2;

      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });

      // handleHover(newIndex);
    }
  };

  return (
    <>
      <HomeRecipesMobile />
      <div className="md:flex flex-col gap-[2rem] hidden">
        {/* Show edit button only if logged in */}

        {/* Render the modal */}
        <div
          className=" relative
        "
        >
          <div
            ref={ref}
            className=" w-full mx-auto  relative justify-center py-[0rem] flex md:pb-[8rem] md:pt-[10rem]"
          >
            <div
              ref={scrollContainerRef}
              className="grid grid-cols-3 w-full    justify-center md:flex-wrap scrollbar-hidden   z-[200]  md:w-[150rem] md:max-w-full  overflow-x-auto md:overflow-visible snap-mandatory snap-x relative md:gap-0 gap-[1rem] md:px-0  px-[3%] md:pb-0 pb-[2rem]  "
            >
              <div
                onMouseEnter={() => setGroupHovered(true)}
                onMouseLeave={() => setGroupHovered(false)}
                className="absolute top-[50%] z-[5] group cursor-pointer translate-x-[-50%]  left-[50%] translate-y-[-50%]"
              >
                <h2
                  style={{ transition: "0.8s ease" }}
                  className={` group-hover:rotate-[-5deg] group-hover:scale-110 text-[#B2AFAB] md:text-[180px] ${forumFont.className}  leading-[100%]  uppercase `}
                >
                  Reserve
                </h2>
                <Link
                  href={"/reserve"}
                  style={{ transition: "0.6s ease" }}
                  className={`${notoSansFont.className}   group-hover:opacity-100 opacity-0  absolute top-[50%] translate-x-[-50%]  left-[50%] translate-y-[-50%] px-[1rem] tracking-widest cursor-pointer bg-[#C0A078] hover:text-white text-black hover:bg-black border border-[#C0A078] hover:border-white py-[0.7rem] font-semibold rounded-full w-fit`}
                >
                  RESERVE A TABLE{" "}
                </Link>
              </div>
              {recipes.map((recipe, index) => (
                <motion.div
                  ref={(el) => {
                    recipeCardRefs.current[index] = el;
                  }}
                  data-recipe-index={index}
                  key={recipe.id}
                  //   onMouseEnter={() => {
                  //     setHoverIndex(index);
                  //     handleHover(index);
                  //   }}
                  //   onMouseLeave={() => {
                  //     setHoverIndex(null);
                  //     handleHoverLeave();
                  //   }}
                  style={{
                    translateX:
                      index === recipes.length - 1 && groupHovered
                        ? "0%"
                        : isMobile
                        ? 0
                        : translateXValues[index],
                    translateY:
                      index === recipes.length - 1 && groupHovered
                        ? "-20%"
                        : isMobile
                        ? 0
                        : translateYValues[index],
                    zIndex: zIndexValues[index], // 👈 Add this line

                    transition: "0.4s ease-out",
                  }}
                  className={` relative  md:p-[12%] w-[60%] snap-center shrink-0 md:shrink   cursor-pointer group flex justify-center ${
                    index > 2 ? "" : " md:mb-[27vh] lg:mb-[7rem]"
                  }  md:w-[100%]`}
                >
                  <motion.div
                    style={{
                      rotate: rotateValues[index],
                      transition: "0.4s ease-out",
                      //   scale: isMobile
                      //     ? 1
                      //     : hoverIndex === index
                      //     ? index % 2 === 0
                      //       ? 1.15
                      //       : scaleValues[index]
                      //     : scaleValues[index],
                    }}
                    className="  rounded-[100%] overflow-hidden aspect-square sha h-fit md:w-[70%]"
                  >
                    <Image
                      src={recipe.image}
                      width={200}
                      height={200}
                      alt={"Recipe Image"}
                      className=" rounded-[100%] shadow-xl h-full object-cover w-full"
                    />{" "}
                  </motion.div>
                </motion.div>
              ))}
              <motion.div
                className={` relative  w-[20%] snap-center shrink-0 md:shrink   cursor-pointer group flex justify-center md:hidden   md:w-[30%]`}
              ></motion.div>
            </div>
          </div>{" "}
        </div>
        <div className="flex  md:hidden justify-center max-w-[90%] rounded-full p-[0.3rem]  gap-[5rem]    w-fit mx-auto mb-[4rem] bg-[#E1DAD1]">
          <button
            onClick={() => scrollToCard("prev")}
            className=" text-xl w-[3rem] aspect-square border rounded-full bg-[#F3EEE6]  text-[#F94141] hover:bg-gray-100"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            onClick={() => scrollToCard("next")}
            className=" text-xl w-[3rem] aspect-square border rounded-full bg-[#F3EEE6]  text-[#F94141] hover:bg-gray-100"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeRecipes;
