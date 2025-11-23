'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

import firstImage from '@/public/about/person-holding-sushi-with-sticks.png';
import secondImage from '@/public/about/delicious-caviar-with-spoon-ginger-vasabi-marble.png';
import thirdImage from '@/public/about/barista-team-coffee-shop.png';
import fourthImage from '@/public/about/friends-making-barbecue-close-up.png';
import fifthImage from '@/public/about/close-up-male-chef-preparing-food-kitchen.png';
import sixthImage from '@/public/about/front-view-delicious-thanksgiving-meal.png';
import seventhImage from '@/public/about/woman-making-spring-roll-cutting-board.png';
import Image from 'next/image';
import { forumFont, notoSansFont } from '@/app/utils/font';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const timelineEvents = [
  {
    year: '2019',
    title: 'INSPIRATION',
    description:
      "Inspired By The Balance Of Tokyo's Street-Side Sushi And Kyoto's Serene Kaiseki Traditions, The Vision Was Clear: To Create A Place Where Elegance And Intensity Meet On The Plate.",
    image: firstImage,
  },
  {
    year: '2020',
    title: 'RESEARCH',
    description:
      'While the World paused, The Dream Moved Forward Behind The Scenes--Refining Recipes, Sourcing Ingredients, And Sketching The Spirit Of What Wasabi Could be.',
    image: secondImage,
  },
  {
    year: '2021',
    title: 'THE TEAM',
    description:
      'In 2021, A Team Began To Form. Chefs, Designers And Artisans Joined The Journey, Drawn By A Shared Belief In Excellence. The Name Wasabi Was Chosen Deliberately--Pure, Potent, And Unapologetically Bold',
    image: thirdImage,
  },
  {
    year: '2022',
    title: 'THE VISION',
    description:
      'The Vision Took Shape. A Forgotten Brick Building In The Heart Of The City Was Selected. Every Inch Was Reimagined--Wood, Stone, Light, And Sound Chosen With Obessive Attension To Detail',
    image: fourthImage,
  },
  {
    year: '2023',
    title: 'COMING TO LIFE',
    description:
      'Construction Began. Walls Went Up, Tiles Went In, And The Scent Of Cedar Began To Fill The Space. Behind The Scenes, Tastings Turned Into Rituals--Each Dish Refined Over And Over Until It Was Both Beautiful And Unforgettable',
    image: fifthImage,
  },
  {
    year: '2024',
    title: 'POLISHING',
    description:
      'Was A Year Of Polishing. The Team Trained Daily, Preparing Not Just To Serve Food, But To Deliver An Experience. The Interiors Were Softened, The Plating Perfected. Private Dinners Gave Birth To Public Anticipation',
    image: sixthImage,
  },
  {
    year: '2025',
    title: 'WASABI',
    description:
      'Wasabi Opened Its Doors. Not Just A Restaurant, But A Destination. A Space Where Tradition Meets Imagination, And Every Meal Is A Moment Worth Remembering.',
    image: seventhImage,
  },
];

let textBelowContent =
  'FROM A SPARK OF BOLDNESS TO A SYMPHONY OF TASTE. THE WASABI STORY';

export const Timeline = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [eventWidth, setEventWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );

  useEffect(() => {
    function recalcWidths() {
      const vw = window.innerWidth;
      setEventWidth(vw * 0.5);
      setViewportWidth(vw);
      setContentWidth(timelineEvents.length * vw * 0.5 + vw * 0.5);
    }
    recalcWidths();
    window.addEventListener('resize', recalcWidths);
    return () => window.removeEventListener('resize', recalcWidths);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0px', `-${Math.max(0, contentWidth - viewportWidth)}px`]
  );

  const activeItemProgress = useTransform(
    scrollYProgress,
    (progress) => progress * (timelineEvents.length - 1)
  );

  // --- Mobile helpers (no animations) ---
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [step, setStep] = useState(0);

  const [baselineLeft, setBaselineLeft] = useState(0);
  const [baselineWidth, setBaselineWidth] = useState(0);

  useEffect(() => {
    const el = mobileTrackRef.current;
    if (!el) return;

    const measure = () => {
      setTrackWidth(el.scrollWidth);
      const firstCard = el.querySelector('[data-card]') as HTMLElement | null;
      setStep(firstCard ? firstCard.clientWidth + 16 : el.clientWidth);

      // NEW: measure baseline start/end so it doesn't pass last year
      const cards = el.querySelectorAll(
        '[data-card]'
      ) as NodeListOf<HTMLElement>;
      if (cards.length) {
        const YEAR_COL_LOCAL = 112; // matches your mobile constants
        const BASELINE_OFFSET = YEAR_COL_LOCAL - 32;

        const first = cards[0];
        const last = cards[cards.length - 1];

        const start = first.offsetLeft + BASELINE_OFFSET; // after first year
        const end = last.offsetLeft + BASELINE_OFFSET; // before last year

        setBaselineLeft(start);
        setBaselineWidth(Math.max(0, end - start));
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scrollByCard = (dir: 'prev' | 'next') => {
    const el = mobileTrackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
  };

  return (
    <>
      {/* ===== Desktop / Tablet (unchanged) ===== */}
      <div className="hidden lg:block">
        <div className="h-[300vh] relative bg-white w-full" ref={targetRef}>
          <div className="sticky top-0 h-screen flex items-center overflow-hidden pb-32">
            <h2
              className={`absolute top-[7%] left-[10vw] text-5xl font-light text-black z-20 ${forumFont.className}`}
            >
              OUR STORY
            </h2>

            {/* Horizontal div */}
            <motion.div
              ref={contentRef}
              className="relative flex flex-row flex-nowrap items-stretch px-[10vw] w-full mb-12"
              style={{
                x,
                paddingRight: eventWidth,
                transform: 'translateY(-160px) scale(0.95)',
              }}
            >
              {/* Main Horizontal line */}
              {viewportWidth > 0 && timelineEvents.length > 1 && (
                <motion.div
                  className="absolute top-1/2 h-[1px] bg-gray-300 z-0"
                  initial={{ backgroundColor: 'gray' }}
                  animate={{ backgroundColor: 'black' }}
                  style={{
                    left: `calc(10vw + ${eventWidth / 2}px)`,
                    width: `${(timelineEvents.length - 1) * eventWidth}px`,
                    transform: 'translateY(-50%)',
                  }}
                />
              )}

              {timelineEvents.map((event, index) => {
                const activeScale = useTransform(
                  activeItemProgress,
                  [index - 0.5, index],
                  [1, 1.2]
                );
                const activeCircleColor = useTransform(
                  activeItemProgress,
                  [index - 0.5, index],
                  ['#d1d5db', '#000000']
                );
                const activeLineColor = useTransform(
                  activeItemProgress,
                  [index - 0.5, index],
                  ['#d1d5db', '#000000']
                );
                const activeYearColor = useTransform(
                  activeItemProgress,
                  [index - 0.5, index],
                  ['#9ca3af', '#000000']
                );
                const activeImageOpacity = useTransform(
                  activeItemProgress,
                  [index - 0.5, index],
                  [0, 1]
                );

                return (
                  <div
                    key={index}
                    className="flex-shrink-0 flex flex-col items-center relative py-16"
                    style={{ width: eventWidth }}
                  >
                    {/* Year */}
                    <motion.span
                      className={`absolute bottom-[calc(45%+2rem)] mr-28 -mt-8 text-5xl font-normal whitespace-nowrap z-10 ${forumFont.className}`}
                      style={{ color: activeYearColor }}
                    >
                      {event.year}
                    </motion.span>

                    {/* Dot */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{ scale: activeScale }}
                    >
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 border-white"
                        style={{ backgroundColor: activeCircleColor }}
                      />
                    </motion.div>

                    {/* Vertical line + content */}
                    <div className="absolute top-[calc(50% + 0.75rem)]  max-h-[280px] flex flex-col items-center">
                      <motion.div
                        className="w-[1px] bg-gray-300 min-h-[50px]"
                        style={{
                          height: '50px',
                          backgroundColor: activeLineColor,
                        }}
                      />
                      <motion.div
                        className={`flex flex-col items-start text-left max-w-[250px] translate-x-[45%] ${notoSansFont.className}`}
                      >
                        <h3 className="text-sm font-bold text-black uppercase mb-[1px]">
                          {event.title}
                        </h3>
                        <p className="text-xs text-gray-900 leading-[1.4]">
                          {event.description}
                        </p>
                        {event.image && (
                          <motion.div
                            style={{ opacity: activeImageOpacity }}
                            className="w-full"
                          >
                            <Image
                              src={event.image}
                              alt={event.title}
                              className="w-full h-auto object-cover shadow-md"
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                );
              })}

              {/* background phrase (desktop only) */}
              <div
                className="flex-shrink-0 flex items-end justify-start w-full translate-y-[300%]"
                style={{
                  width: `${contentWidth}px`,
                  position: 'absolute',
                  left: '20vw',
                  bottom: '0vh',
                  pointerEvents: 'none',
                }}
              >
                <span
                  className={`text-[105px] font-extrabold tracking-tight text-black opacity-20 w-full ${forumFont.className}`}
                  style={{
                    letterSpacing: '0.05em',
                    userSelect: 'none',
                    lineHeight: 1,
                  }}
                >
                  {textBelowContent}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== Mobile timeline (no animations) ===== */}
      <section className="lg:hidden bg-[#FBF6F0] text-[#2B2218]">
        <div className="px-5 pt-8">
          <h2
            className={`text-3xl font-light ${forumFont.className} mt-13 -mb-4`}
          >
            OUR STORY
          </h2>
        </div>

        {(() => {
          // layout constants to match desktop rhythm
          const YEAR_COL = 112; // px reserved for the year before the line starts
          const LINE_Y = 100; // px from card top where the baseline sits
          const DOT_OFFSET = 96; // px from the baseline start to the dot
          const VLINE_H = 60; // vertical line height below the dot
          const CARD_W = '85vw'; // card width (snap size)

          return (
            <div className="relative mt-4 px-5">
              {/* Scrollable track */}
              <div
                ref={mobileTrackRef}
                className="relative flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-16"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {/* Long horizontal baseline across ALL cards (skip 1st & last year) */}
                <hr
                  className="absolute border-0 h-px bg-gray-800"
                  style={{
                    top: LINE_Y,
                    left: baselineLeft + 15,
                    width: baselineWidth + 65,
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />

                {/* Big phrase (non-wrapping; reveals as you scroll) */}
                <div
                  className="pointer-events-none absolute z-0 opacity-20"
                  style={{ bottom: -4, left: '14vw' }}
                >
                  <span
                    className={`whitespace-nowrap leading-none ${forumFont.className}`}
                    style={{ fontSize: '18vw', letterSpacing: '0.05em' }}
                  >
                    {textBelowContent}
                  </span>
                </div>

                {/* Cards */}
                {timelineEvents.map((event) => (
                  <div
                    key={event.year}
                    data-card
                    className="relative shrink-0 max-w-[500px] mx-9"
                    style={{ width: CARD_W, height: 460 }}
                  >
                    {/* Year (shares the baseline) */}
                    <span
                      className={`${forumFont.className} absolute`}
                      style={{
                        left: 20,
                        top: LINE_Y - 24,
                        fontSize: 40,
                        lineHeight: 1,
                      }}
                    >
                      {event.year}
                    </span>

                    {/* Dot on the baseline (measured from the baseline start) */}
                    <span
                      className="absolute rounded-full bg-[#2B2218] z-10"
                      style={{
                        left: YEAR_COL + DOT_OFFSET - 52,
                        top: LINE_Y - 4,
                        width: 8,
                        height: 8,
                      }}
                    />

                    {/* Vertical line connected to the dot */}
                    <span
                      className="absolute bg-gray-900"
                      style={{
                        left: YEAR_COL + DOT_OFFSET - 49,
                        top: LINE_Y,
                        width: 1,
                        height: VLINE_H,
                      }}
                    />

                    {/* Content block aligned to the vertical line */}
                    <div
                      className={`${notoSansFont.className} absolute`}
                      style={{
                        left: YEAR_COL + DOT_OFFSET - 52,
                        top: LINE_Y + VLINE_H + 10,
                        width: 220,
                      }}
                    >
                      <h3 className="text-sm font-semibold text-[#3E2E1C] uppercase mb-[1px]">
                        {event.title}
                      </h3>
                      <p className="text-[10px] text-[#3E2E1C] leading-[1.6] max-w-[12.2rem]">
                        {event.description}
                      </p>
                      <div className="w-full mt-2 overflow-hidden rounded-[2px] shadow">
                        <Image
                          src={event.image}
                          alt={event.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* nav buttons */}
              <div className="mt-6 mb-10 flex items-center justify-center gap-4">
                <button
                  onClick={() => scrollByCard('prev')}
                  className="h-10 w-10 rounded-full flex justify-center items-center border border-[#4A3A2A]/20 bg-white/70 text-[#4A3A2A]"
                  aria-label="Previous"
                >
                  <ArrowLeft strokeWidth={1.3} />
                </button>
                <button
                  onClick={() => scrollByCard('next')}
                  className="h-10 w-10 rounded-full border border-[#4A3A2A]/20 bg-white/70 text-[#4A3A2A] flex justify-center items-center"
                  aria-label="Next"
                >
                  <ArrowRight strokeWidth={1.3} />
                </button>
              </div>
            </div>
          );
        })()}
      </section>
    </>
  );
};
