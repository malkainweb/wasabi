import RecipeSix from "@/public/home/recipes/RecipeSix.webp";
import RecipeThree from "@/public/home/recipes/RecipeThree.webp";
import RecipeTwo from "@/public/home/recipes/RecipeTwo.webp";
import { MenuItem } from "../types/menu";

export const ALL_ITEMS: MenuItem[] = [
  {
    id: 1,
    title: "CHICKEN RISOTO",
    price: 35.73,
    desc: "Comforting classic with a modern, elegant twist — perfect for when you crave warmth and flavor in every bite.",
    src: RecipeTwo,
    tag: "DINNER",
  },
  {
    id: 2,
    title: "GRILLED FILET",
    price: 41.25,
    desc: "Charred to perfection and finished with brown butter herbs.",
    src: RecipeSix,
    tag: "DINNER",
  },
  {
    id: 3,
    title: "SEARED MEDLEY",
    price: 33.5,
    desc: "Golden sear, bright textures, and a savory finish.",
    src: RecipeThree,
    tag: "LUNCH",
  },
  {
    id: 4,
    title: "HOUSE PASTA",
    price: 28.2,
    desc: "Hand-tossed with a rich tomato emulsion and basil oil.",
    src: RecipeTwo,
    tag: "LUNCH",
  },
  {
    id: 5,
    title: "PUMPKIN GNOCCHI",
    price: 31.6,
    desc: "Velvety pumpkin, toasted seeds, and sage butter.",
    src: RecipeSix,
    tag: "DINNER",
  },
  {
    id: 6,
    title: "CHEESECAKE",
    price: 15.9,
    desc: "Silky, tangy, and elegantly finished for the nightcap.",
    src: RecipeThree,
    tag: "WINE",
  },
  {
    id: 7,
    title: "CHICKEN RISOTO",
    price: 35.73,
    desc: "Comforting classic with a modern, elegant twist — perfect for when you crave warmth and flavor in every bite.",
    src: RecipeTwo,
    tag: "DINNER",
  },
  {
    id: 8,
    title: "GRILLED FILET",
    price: 41.25,
    desc: "Charred to perfection and finished with brown butter herbs.",
    src: RecipeSix,
    tag: "DINNER",
  },
  {
    id: 9,
    title: "SEARED MEDLEY",
    price: 33.5,
    desc: "Golden sear, bright textures, and a savory finish.",
    src: RecipeThree,
    tag: "LUNCH",
  },
];

export const categories: Array<MenuItem["tag"]> = ["LUNCH", "DINNER", "WINE"];
