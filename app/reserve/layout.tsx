import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Contact & Reserve at Wasabi – Host with Distinction | Book Your Experience",
  description:
    "Host with distinction. Celebrate with flavor. Reserve your event or table at Wasabi, where every detail is refined and every guest leaves impressed. From intimate celebrations to private corporate dinners, book a full sensory experience in our acclaimed venue. Open daily, 12 PM – 11 PM.",
  openGraph: {
    title: "Reserve at Wasabi – Experience Exceptional Events & Dining",
    description:
      "Booking your event at Wasabi means stepping into a world where every detail is refined and every flavor is intentional. Whether it's an intimate gathering or a grand celebration, reserve your spot and enjoy fine dining, anytime you desire.",
    images: [
      {
        url: "/logo.webp", // Use a dedicated reservation/event photo if available
        width: 1200,
        height: 630,
        alt: "Wasabi – Reserve Your Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reserve at Wasabi – Contact & Book Your Event",
    description:
      "Have an event? Reserve a spot at Wasabi for a celebration defined by refined details, intentional flavors, and an unforgettable atmosphere. Open Monday through Sunday, 12 PM – 11 PM.",
    images: ["/logo.webp"], // Update image for best results
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
