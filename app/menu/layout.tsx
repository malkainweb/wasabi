// app/menu/layout.tsx
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const signatureDishes = [
    "Prime Tenderloin Steak",
    "Seared Bluefin Toro Tartare",
    "Explosion Tempura",
    "New Style Sashimi",
  ];

  const dishNames = signatureDishes.slice(0, 3).join(", ");

  return {
    title: `Menu – ${dishNames} & More | Wasabi Modern Kitchen Kamloops`,

    description: `Explore Wasabi's signature Japanese menu featuring ${dishNames}, Tako Wasabi, AAA beef specialties, and fresh sashimi. From $4 starters to $48 premium tenderloin—over 40 expertly crafted dishes blending Tokyo tradition with modern fusion. House-made teriyaki, wasabi soy, and yuzu sauces elevate every plate. Dine in Kamloops, BC.`,

    keywords: [
      "Wasabi menu Kamloops",
      "Japanese restaurant menu BC",
      "sushi sashimi Kamloops",
      "Prime Tenderloin Steak",
      "Bluefin Toro Tartare",
      "Japanese tempura restaurant",
      "AAA beef Japanese style",
      "Tako Wasabi specialty",
      "Japanese fusion dining Kamloops",
      "sizzle and char menu",
      "Japanese tapas BC",
      "fine dining menu Kamloops",
      "teriyaki beef salmon",
      "soft shell crab tempura",
      "gyoza edamame Kamloops",
      "miso soup Japanese restaurant",
    ],

    authors: [{ name: "Wasabi Modern Kitchen" }],
    creator: "Wasabi Modern Kitchen",
    publisher: "Wasabi Modern Kitchen",

    metadataBase: new URL("https://wasabimodernkitchen.com"),

    alternates: {
      canonical: "/menu",
    },

    openGraph: {
      title:
        "Wasabi Menu – From $4 Miso Soup to $48 Prime Tenderloin | 40+ Signature Dishes",

      description: `Discover Japanese mastery at Wasabi: Seared Bluefin Toro Tartare, AAA Prime Tenderloin with truffle butter, Explosion Tempura (our specialty!), Tako Wasabi, and New Style Sashimi. Every dish crafted with precision—house teriyaki glaze, wasabi soy, yuzu accents. Starters, tapas, sizzle & char, handhelds. Over 40 items. Every bite unforgettable. Reserve your table in Kamloops, BC.`,

      url: "https://wasabimodernkitchen.com/menu",
      siteName: "Wasabi Modern Kitchen",

      images: [
        {
          url: "/gallery/updated/DSC04316.webp",
          width: 1200,
          height: 630,
          alt: "Wasabi Modern Kitchen signature dishes - Prime Tenderloin Steak, Seared Bluefin Toro, Japanese fusion cuisine",
          type: "image/webp",
        },
        {
          url: "/logo.webp",
          width: 800,
          height: 600,
          alt: "Wasabi Modern Kitchen - Japanese fine dining in Kamloops",
        },
      ],

      locale: "en_CA",
      type: "website", // ✅ Fixed: Using valid OpenGraph type
    },

    twitter: {
      card: "summary_large_image",
      title: "Wasabi Menu – 40+ Japanese Fusion Dishes | $4-$48",

      description: `From Tako Wasabi to AAA Prime Tenderloin. Bluefin Toro Tartare to Explosion Tempura. Every plate tells a story of precision, passion, and fire. Explore our full menu in Kamloops, BC.`,

      images: ["/gallery/updated/DSC04316.webp"],
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

    // ✅ Restaurant-specific structured data in 'other' field
    other: {
      "og:restaurant:menu": "true", // Custom property
      "og:price_range": "$$-$$$",
      "restaurant:contact_data:street_address": "102-1020 Talasa Way",
      "restaurant:contact_data:locality": "Kamloops",
      "restaurant:contact_data:region": "BC",
      "restaurant:contact_data:postal_code": "V2H 0C3",
      "restaurant:contact_data:country_name": "Canada",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
