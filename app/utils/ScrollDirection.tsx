// utils/useScrollDirection.ts
import { useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

/**
 * useScrollDirection
 * Returns "up" if user scrolls up, "down" if scrolling down.
 * Usage: const scrollDirection = useScrollDirection();
 */
export function useScrollDirection(
  initial: ScrollDirection = "up"
): ScrollDirection {
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>(initial);
  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  useEffect(() => {
    function updateScrollDirection() {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY.current && scrollY > 20) {
        setScrollDirection("down");
      } else if (scrollY < lastScrollY.current) {
        setScrollDirection("up");
      }
      lastScrollY.current = scrollY;
    }
    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  return scrollDirection;
}
