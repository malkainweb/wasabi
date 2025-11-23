'use client';
import basil from '@/public/home/menu/basil.webp';
import chesseCake from '@/public/home/menu/chesseCake.webp';
import mochi from '@/public/home/menu/mochi.webp';
import pumpkin from '@/public/home/menu/pumpkin.webp';
import safron from '@/public/home/menu/safron.webp';
import steak from '@/public/home/menu/steak.webp';
import mainImg from '@/public/home/menu/mainImg.webp';
import Image from 'next/image';
import { forumFont, notoSansFont } from '@/app/utils/font';
import { useEffect, useRef } from 'react';
import { useInView, motion, useAnimation } from 'framer-motion';
import { MenuMobile } from './MenuMobile';

const Menu = () => {
  // Example: separate as "Mains" and "Desserts"
  const mains = [
    { src: basil, name: 'Basil' },
    { src: pumpkin, name: 'Pumpkin' },
    { src: safron, name: 'Safron' },
  ];

  const desserts = [
    { src: chesseCake, name: 'Chesse Cake' },
    { src: mochi, name: 'Mochi' },
    { src: steak, name: 'Steak' },
  ];
  const mainsRef = useRef<HTMLDivElement>(null);
  const mainsInView = useInView(mainsRef, { margin: '-20% 0px -60% 0px' });

  const mainsControls = useAnimation();

  // Opacity blink for mains

  // Right (desserts)
  const dessertsRef = useRef<HTMLDivElement>(null);
  const dessertsInView = useInView(dessertsRef, {
    margin: '-20% 0px -60% 0px',
  });
  const dessertsControls = useAnimation();

  useEffect(() => {
    mainsControls.set({ opacity: 0 });
    mainsControls.start({ opacity: 1, transition: { duration: 0.5 } });
  }, [mainsInView, mainsControls]);

  useEffect(() => {
    dessertsControls.set({ opacity: 0 });
    dessertsControls.start({ opacity: 1, transition: { duration: 0.5 } });
  }, [dessertsInView, dessertsControls]);

  return (
    <>
      <MenuMobile />
      <div className="  bg-black w-full justify-center relative overflow-hidden  max-h-fit hidden md:flex">
        <div className=" absolute top-0 left-0 md:w-[20%] border-r-[#E9DFCF] border-r shrink-0 lg:w-[12%]  overflow-hidden">
          <motion.div
            ref={mainsRef}
            animate={mainsControls}
            initial={{ opacity: 1 }}
            className={`w-full flex flex-col gap-[5%] h-fit ${
              mainsInView ? 'infinite-scroll-container' : ''
            }`}
          >
            {mains.map((e, index) => {
              return (
                <div key={index} className=" w-full ">
                  <Image
                    src={e.src}
                    alt="Menu Item"
                    className="w-full h-auto object-cover"
                  />
                  <p
                    className={` uppercase tracking-widest text-white text-center md:py-[2rem] ${forumFont.className}`}
                  >
                    {e.name}
                  </p>
                </div>
              );
            })}
            {mains.map((e, index) => {
              return (
                <div key={index} className=" w-full ">
                  <Image
                    src={e.src}
                    alt="Menu Item"
                    className="w-full h-auto object-cover"
                  />
                  <p
                    className={` uppercase tracking-widest text-white text-center md:py-[2rem] ${forumFont.className}`}
                  >
                    {e.name}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
        <div className="w-full lg:w-[76%] md:w-[60%]  flex flex-col py-[8rem] justify-center items-center ">
          <h1
            className={`uppercase  z-[20] text-center text-[60px] leading-[120%] mb-[-2%] text-[#E9DFCF] ${forumFont.className}  tracking-widest`}
          >
            BROWSE OUR <br />
            CURATED MENU{' '}
          </h1>{' '}
          <div className="w-[45rem] aspect-[2.3/1] h-[20rem]  overflow-hidden  max-w-[80%]">
            <Image
              src={mainImg}
              alt="Main Menu Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col relative">
            <div className="flex z-[100] items-center py-[2rem] gap-[2rem] flex-col">
              <p
                className={`${notoSansFont.className} z-[10] tracking-widest capitalize text-[#E9DFCF]  font-light text-center md:w-[30rem] max-w-[90%]`}
              >
                Discover a handpicked selection of dishes crafted with premium
                ingredients, bold flavors, and refined technique
              </p>

              <button
                style={{ transition: '0.4s ease' }}
                className={`${notoSansFont.className} px-[2.4rem] tracking-widest cursor-pointer bg-[#C0A078] hover:text-white text-black hover:bg-black border border-[#C0A078] hover:border-white py-[0.7rem] font-semibold rounded-full w-fit`}
              >
                SEE MENU{' '}
              </button>
            </div>
          </div>
        </div>

        <div className=" absolute top-0 right-0 md:w-[20%] border-l-[#E9DFCF] border-l shrink-0 lg:w-[12%]  overflow-hidden">
          {/* <div
          ref={dessertsRef}
          className={` w-full  flex flex-col gap-[5%] h-fit ${
            dessertsInView ? "Reverse_infinite-scroll-container" : ""
          }`}
        > */}
          <motion.div
            ref={dessertsRef}
            animate={dessertsControls}
            initial={{ opacity: 1 }}
            className={`w-full flex flex-col gap-[5%] h-fit ${
              dessertsInView ? 'Reverse_infinite-scroll-container' : ''
            }`}
          >
            {desserts.map((e, index) => {
              return (
                <div key={index} className=" w-full ">
                  <Image
                    src={e.src}
                    alt="Menu Item"
                    className="w-full h-auto object-cover"
                  />
                  <p
                    className={` uppercase tracking-widest text-white text-center md:py-[2rem] ${forumFont.className}`}
                  >
                    {e.name}
                  </p>
                </div>
              );
            })}
            {desserts.map((e, index) => {
              return (
                <div key={index} className=" w-full ">
                  <Image
                    src={e.src}
                    alt="Menu Item"
                    className="w-full h-auto object-cover"
                  />
                  <p
                    className={` uppercase tracking-widest text-white text-center md:py-[2rem] ${forumFont.className}`}
                  >
                    {e.name}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Menu;
