import type { Metadata } from "next";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LenisProvider from "./utils/LenisProvider";

export const metadata: Metadata = {
  title: "Wasabi Modern Kitchen | Japanese Fine Dining in Kamloops",
  description:
    "From the neon-lit streets of Tokyo to the heart of Kamloops—Wasabi is more than a restaurant. It's a five-year journey of obsession, craftsmanship, and fire. Experience Japanese cuisine reimagined: bold, beautiful, and unapologetically refined. Book your seat at the table where dining becomes art.",
  keywords: [
    "Wasabi restaurant Kamloops",
    "Japanese fine dining Kamloops BC",
    "modern Japanese cuisine Canada",
    "upscale sushi restaurant",
    "Japanese fusion dining",
    "fine dining experience Kamloops",
    "gourmet Japanese food BC",
    "restaurant reservations Kamloops",
    "Tokyo-inspired cuisine",
    "artisan Japanese restaurant",
    "culinary experience Kamloops",
    "Wasabi Modern Kitchen",
  ],
  authors: [{ name: "Wasabi Modern Kitchen" }],
  creator: "Wasabi Modern Kitchen",
  publisher: "Wasabi Modern Kitchen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://wasabimodernkitchen.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wasabi Modern Kitchen – Because Bold Deserves Beauty",
    description:
      "It started with a spark in 2019. A dream forged in Tokyo's kaiseki traditions and Kyoto's serene elegance. Through a global pause, relentless refinement, and obsessive attention to every tile, herb, and flame—Wasabi emerged. Not just serving meals, but curating moments. 45 staff. 23 chefs. 3 locations. One unwavering belief: dining should be unforgettable. Your table awaits.",
    url: "https://wasabimodernkitchen.com",
    siteName: "Wasabi Modern Kitchen",
    images: [
      {
        url: "/gallery/updated/DSC04316.webp",
        width: 1200,
        height: 630,
        alt: "Wasabi Modern Kitchen - Where Japanese tradition meets modern artistry in an unforgettable dining experience",
        type: "image/webp",
      },
      {
        url: "/logo.webp",
        width: 800,
        height: 600,
        alt: "Wasabi Modern Kitchen - Crafting culinary moments since 2019",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Wasabi Modern Kitchen – Five Years in the Making. One Unforgettable Bite.",
    description:
      "Born from passion. Refined through obsession. Every dish at Wasabi tells a story—of Tokyo nights, Kyoto mornings, and a team that turned dining into art. Experience the journey. Taste the dedication. Reserve your moment in Kamloops, BC.",
    images: ["/gallery/updated/DSC04316.webp"],
    creator: "@wasabikitchen", // Replace with actual handle
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
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
  verification: {
    // google: "your-google-verification-code", // Add when you set up Google Search Console
  },
  other: {
    "pinterest-rich-pin": "true",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <LenisProvider>{children} </LenisProvider>
      </body>
    </html>
  );
}
