import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wasabi Menu – Explore Signature Japanese Dishes',
  description:
    'Browse the Wasabi menu and discover a curated selection of Japanese-inspired dishes. From sushi and sashimi to bold flavors and modern creations, experience dining redefined with every bite.',
  openGraph: {
    title: 'Wasabi Menu – Explore Signature Japanese Dishes',
    description:
      'Discover the full Wasabi menu featuring signature Japanese flavors, sushi, sashimi, and modern culinary creations. A dining experience where tradition meets innovation.',
    images: [
      {
        url: '/logo.webp', // update to your actual OG image path
        width: 1200,
        height: 630,
        alt: 'Wasabi - Where Bold Meets Beauty',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Wasabi – Where Bold Meets Beauty',
    description:
      'Explore Wasabi’s story—from inspiration to grand opening. A curated journey of taste, elegance, and fire.',
    images: ['/logo.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
