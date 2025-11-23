import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Gallery – Every Frame, Every Flavor, Every Moment | Wasabi Modern Kitchen",
  description:
    "Step behind the curtain. See the glow of fresh sashimi under Edison bulbs. Watch steam rise from perfectly seared wagyu. Witness the artistry of plating, the precision of knife work, the warmth of gathered guests. This isn't just a gallery—it's proof that dining at Wasabi is theater, ritual, and masterpiece all at once. 45 staff. 23 chefs. Thousands of moments. One unforgettable experience.",
  keywords: [
    "Wasabi restaurant gallery",
    "Japanese food photography Kamloops",
    "fine dining photos",
    "restaurant interior Kamloops",
    "sushi plating artistry",
    "Japanese cuisine photos",
    "Wasabi Modern Kitchen images",
    "restaurant ambiance gallery",
    "culinary photography",
    "food presentation Kamloops",
    "dining experience photos",
    "Japanese restaurant atmosphere",
  ],
  authors: [{ name: "Wasabi Modern Kitchen" }],
  creator: "Wasabi Modern Kitchen",
  publisher: "Wasabi Modern Kitchen",
  metadataBase: new URL("https://wasabimodernkitchen.com"),
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title:
      "Wasabi Gallery – Where Every Dish Becomes Art, Every Moment Becomes Memory",
    description:
      "The flicker of candlelight on polished lacquer. The perfect fold of a napkin. The way light catches a droplet of yuzu on razor-thin tuna. At Wasabi, we don't just serve food—we orchestrate experiences. Our gallery captures the essence: the craft, the passion, the beauty that makes guests return again and again. See what awaits you in Kamloops, BC.",
    url: "https://wasabimodernkitchen.com/gallery",
    siteName: "Wasabi Modern Kitchen",
    images: [
      {
        url: "/gallery/updated/DSC04282.webp",
        width: 1200,
        height: 630,
        alt: "Wasabi Modern Kitchen Gallery - Stunning culinary artistry and dining atmosphere in Kamloops",
        type: "image/webp",
      },
      {
        url: "/logo.webp",
        width: 800,
        height: 600,
        alt: "Wasabi Modern Kitchen - Where dining becomes art",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wasabi Gallery – See What Makes Dining Unforgettable",
    description:
      "Every plate tells a story. Every detail matters. From the precision of our knife work to the warmth of your table—experience the visual journey through Wasabi Modern Kitchen. This is Japanese fine dining, elevated.",
    images: ["/gallery/updated/DSC04282.webp"],
    creator: "@wasabikitchen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "og:image:alt":
      "Exquisite Japanese cuisine and dining ambiance at Wasabi Modern Kitchen",
    "pinterest-rich-pin": "true",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
