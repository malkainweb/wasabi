import { Forum, Noto_Sans } from "next/font/google";
import localFont from "next/font/local";

export const forumFont = Forum({ subsets: ["latin"], weight: "400" });
export const notoSansFont = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "900"],
});

export const Optima_regular = localFont({
  src: "../fonts/optima/optima.ttf",
  weight: "400",
  style: "normal",
});
export const Optima_bold = localFont({
  src: "../fonts/optima/optima_b.ttf",
  weight: "700",
  style: "normal",
});
export const Optima_medium = localFont({
  src: "../fonts/optima/optimal_medium.ttf",
  weight: "500",
  style: "normal",
});
export const Optima_italic = localFont({
  src: "../fonts/optima/optima_Italic.ttf",
  weight: "400",
  style: "italic",
});
