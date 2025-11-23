"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { setLenisInstance } from "./enistance";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      });

      setLenisInstance(lenis); // 🔁 store globally

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
        setLenisInstance(null);
      };
    }
  }, []);

  return <>{children}</>;
}
