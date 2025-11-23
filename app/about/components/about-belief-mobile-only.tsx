'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';

import backgroundImage from '@/public/about/aboutHero.webp';
import backgroundImageFilter from '@/public/about/AboutOverlay.webp';
import Logo from '@/public/about/White 2.png';
import aboutmenu from '@/public/about/aboutMenu.webp';
import chefHat from '@/public/about/ChefHat.svg';
import building from '@/public/about/Building.svg';
import stars from '@/public/about/PersonArmsSpread.svg';
import { forumFont, notoSansFont, Optima_medium } from '@/app/utils/font';

export function AboutAndBeliefMobile({
  setCanShow,
}: {
  setCanShow: (v: boolean) => void;
}) {
  // Animate only within the hero (no giant parent height)
  const heroRef = useRef<HTMLDivElement | null>(null);

  // progress = 0 when hero top hits viewport top; 1 when hero bottom hits viewport top
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Subtle mobile motions (smaller distances than desktop)
  const aboutX = useTransform(scrollYProgress, [0, 0.6], [0, 60]); // slide right
  const wasabiX = useTransform(scrollYProgress, [0, 0.6], [0, -60]); // slide left
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]); // gentle zoom-out
  const fxScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]); // overlay zoom-out
  const overlayOpacity = useTransform(scrollYProgress, [0.25, 0.8], [0, 1]); // fade to black

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // keep your top-nav logic if you need it
    setCanShow?.(v > 0.92);
  });

  const stats = [
    { icon: stars, alt: 'stars', label: '45 Staffs' },
    { icon: building, alt: 'locations', label: '3 Locations' },
    { icon: chefHat, alt: 'chefs', label: '23 Chefs' },
  ];

  return (
    <section className="lg:hidden w-full">
      {/* HERO (100vh, self-contained animation) */}
      <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
        {/* Base image */}
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0"
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            src={backgroundImage}
            alt="about"
            draggable={false}
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>

        {/* Filter layer */}
        <motion.div
          style={{ scale: fxScale }}
          className="absolute inset-0"
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            src={backgroundImageFilter}
            alt="overlay"
            draggable={false}
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>

        {/* Headings */}
        <div
          className={`pointer-events-none absolute inset-0 space-y-6 z-10 flex flex-col justify-center px-4 ${forumFont.className}`}
        >
          <motion.span
            style={{ x: aboutX }}
            className="self-start ml-2 text-[17vw] leading-none tracking-[0.02em] text-gray-100"
          >
            ABOUT
          </motion.span>
          <motion.span
            style={{ x: wasabiX }}
            className="self-end mr-2 text-right text-[17vw] leading-none tracking-[0.02em] text-gray-100"
          >
            WASABI
          </motion.span>
        </div>

        {/* Darken as we scroll through hero */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 -mb-[5%] z-20 bg-black/90"
        />
      </div>

      {/* BELIEF (immediately after hero; no gap) */}
      <div className="w-full bg-black">
        <div className="relative mx-auto flex w-full flex-col items-center text-center pt-10">
          {/*  <div className="absolute left-0 top-0 h-[95%] w-full bg-gradient-to-b from-black via-black to-black" /> */}
          <div className="relative h-[90vh] flex justify-evenly flex-col items-center">
            <div className="z-[10] mb-4">
              <span className="inline-block size-36">
                <Image
                  src={Logo}
                  alt="Wasabi-logo"
                  className="h-full w-full object-cover"
                />
              </span>
            </div>

            <div
              className={`z-[10] text-lg tracking-[0.3em] text-gray-100 ${forumFont.className}`}
            >
              OUR BELIEF
            </div>

            <p
              className={`z-[10] mx-auto -mt-[5%] mb-6 max-w-[22rem] text-lg tracking-[0.3em] text-[#FEFAF4] capitalize ${forumFont.className}`}
            >
              Because{' '}
              <span className="italic">
                Bold Deserves <br /> Beauty{' '}
              </span>
              At Wasabi, Every <br /> Detail Is A{' '}
              <span className="italic font-semibold">
                Statement—Of <br /> Taste, Elegance, And <br /> Fire.
              </span>{' '}
              We Exist To Turn <br />
              <span className="italic">Dining Into Art.</span>
            </p>

            {/* Stats: stacked & compact on mobile */}
            <div className="z-[10] mb-6 flex flex-nowrap items-center justify-center gap-2 text-gray-200">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 text-xs tracking-[0.18rem] ${Optima_medium.className}`}
                >
                  <Image src={s.icon} alt={s.alt} className="size-5" />
                  <span className="mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>

            <p
              className={`z-[10] max-w-[22rem] font-light tracking-[0.12em] leading-7 text-[#FEFAF4] ${notoSansFont.className}`}
            >
              <span className="block">
                We&apos;re Not Just Serving Meals—We&apos;re
              </span>
              <span className="block"> Curating Moments Of Indulgence,</span>
              <span className="block"> Artistry, And Unforgettable Taste.</span>
            </p>
          </div>

          <div className="mt-6 h-[60vh] w-full relative">
            <div className="h-[40%] w-full rounded-2xl absolute -top-[5%] backdrop-blur-[0.5px] left-0  bg-gradient-to-b  from-black via-black/[97%]" />

            <Image
              src={aboutmenu}
              alt="foodimg"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
