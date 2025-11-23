'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { notoSansFont, forumFont } from '@/app/utils/font';
import EventInvite from '@/public/reserve/eventInvite.png';

export default function EventInviteSection() {
  const ref = useRef<HTMLDivElement | null>(null);

  // Setup scroll tracking for this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // starts when top of section hits bottom of viewport, ends when bottom hits top
  });

  // Headline animates in as you scroll
  const headlineY = useTransform(scrollYProgress, [0, 0.22], [50, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Icon scales up as you scroll
  const iconScale = useTransform(scrollYProgress, [0.12, 0.28], [0.82, 1.05]);
  const iconOpacity = useTransform(scrollYProgress, [0.12, 0.18], [0, 1]);

  // Description slides in a bit after the rest
  const descY = useTransform(scrollYProgress, [0.2, 0.34], [32, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.23, 0.35], [0, 1]);

  return (
    <section
      ref={ref}
      className="w-full gap-[3rem] flex flex-col items-center justify-center pb-[5rem] pt-[10rem] relative"
    >
      {/* Headline */}
      <motion.h1
        style={{
          y: headlineY,
          opacity: headlineOpacity,
        }}
        className={`text-center -mt-10 md:-mt-0 px-4 text-[#201C17] tracking-[.14em] leading-tight 
        font-light text-3xl md:text-5xl lg:text-6xl ${forumFont.className}`}
      >
        HOST WITH DISTINCTION.
        <br />
        CELEBRATE WITH FLAVOR.
      </motion.h1>

      {/* Icon */}
      <motion.span
        style={{
          scale: iconScale,
          opacity: iconOpacity,
        }}
        className="will-change-transform"
      >
        <Image
          src={EventInvite}
          alt="Event Invite Icon"
          className="w-[6rem]"
          priority
        />
      </motion.span>

      {/* Description */}
      <motion.p
        style={{
          y: descY,
          opacity: descOpacity,
        }}
        className={`w-[55rem] max-w-[90%] mx-auto text-center text-[black]/60 text-sm md:text-[1.12rem] font-medium tracking-wide ${notoSansFont.className}`}
      >
        Booking Your Event At Wasabi Means <br className="sm:hidden" /> Stepping
        Into A World Where Every Detail Is <br className="sm:hidden" /> Refined,
        Every Flavor Is Intentional, And <br className="sm:hidden" /> Every
        Guest Leaves Impressed. Whether <br className="sm:hidden" /> You're
        Planning An Intimate Celebration, A <br className="sm:hidden" />
        High-Profile Launch, Or A Private Corporate <br className="sm:hidden" />
        Dinner, Wasabi Offers More Than Just A <br className="sm:hidden" />
        Venue — It Delivers A Full Sensory Experience.
      </motion.p>
    </section>
  );
}
