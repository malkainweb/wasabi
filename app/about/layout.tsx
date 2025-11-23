import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Our Story – From Tokyo Dreams to Kamloops Reality | Wasabi Modern Kitchen",
  description:
    "2019: A spark ignited in Tokyo's neon glow. 2020: The world paused, but our dream moved forward. 2021: A team united by obsession. 2022: Walls rose, tiles set, cedar filled the air. 2023: Daily rituals of perfection. 2024: Private tastings became public anticipation. 2025: Wasabi opened its doors. This is our story—from inspiration to indulgence, from vision to reality.",
  keywords: [
    "Wasabi restaurant story",
    "Japanese restaurant Kamloops history",
    "about Wasabi Modern Kitchen",
    "restaurant journey",
    "Tokyo-inspired restaurant Canada",
    "chef team Kamloops",
    "culinary philosophy",
    "restaurant founding story",
    "Wasabi team",
    "Japanese cuisine passion",
    "restaurant vision Kamloops",
    "dining experience story",
  ],
  authors: [{ name: "Wasabi Modern Kitchen Team" }],
  creator: "Wasabi Modern Kitchen",
  publisher: "Wasabi Modern Kitchen",
  metadataBase: new URL("https://wasabimodernkitchen.com"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "The Wasabi Story – Because Bold Deserves Beauty",
    description:
      "From street-side sushi in Tokyo to serene kaiseki in Kyoto—inspiration struck in 2019. Through a pandemic, relentless refinement, and obsessive detail, a forgotten brick building transformed. 45 staff members. 23 dedicated chefs. 3 stunning locations. One unwavering belief: every detail is a statement of taste, elegance, and fire. Meet the team that turned dining into art.",
    url: "https://wasabimodernkitchen.com/about",
    siteName: "Wasabi Modern Kitchen",
    images: [
      {
        url: "/about/slide5.webp",
        width: 1200,
        height: 630,
        alt: "The Wasabi Modern Kitchen story - A journey from Tokyo inspiration to Kamloops destination",
        type: "image/webp",
      },
      {
        url: "/logo.webp",
        width: 800,
        height: 600,
        alt: "Wasabi Modern Kitchen - Crafted with passion since 2019",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Story Behind Wasabi – Six Years. One Vision. Infinite Moments.",
    description:
      "It began with Tokyo's balance and Kyoto's serenity. It grew through a team of chefs, designers, and artisans who believed dining should be unforgettable. Meet the faces behind every plate, the hands behind every detail, and the passion behind Wasabi Modern Kitchen.",
    images: ["/about/slide5.webp"],
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
    "article:published_time": "2025-01-01T00:00:00Z", // Adjust to actual opening date
    "article:author": "Wasabi Modern Kitchen",
    "article:section": "About",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
