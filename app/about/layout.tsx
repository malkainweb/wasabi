import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Wasabi – Where Bold Meets Beauty",
  description:
    "Discover the story behind Wasabi—a destination where dining becomes art. Inspired by Japanese tradition, refined through relentless passion, Wasabi curates moments of indulgence, artistry, and unforgettable taste. Meet our chefs, explore our journey from vision to reality, and experience why every detail at Wasabi is a statement of elegance and fire.",
  openGraph: {
    title: "About Wasabi – Where Bold Meets Beauty",
    description:
      "From Tokyo street-side inspiration to a city destination, Wasabi redefines fine dining. Learn how our chefs, designers, and artisans created a restaurant where every meal is a moment worth remembering.",
    images: [
      {
        url: "/logo.webp", // update to your actual OG image path
        width: 1200,
        height: 630,
        alt: "Wasabi - Where Bold Meets Beauty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Wasabi – Where Bold Meets Beauty",
    description:
      "Explore Wasabi’s story—from inspiration to grand opening. A curated journey of taste, elegance, and fire.",
    images: ["/logo.webp"], // update to your actual image path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
