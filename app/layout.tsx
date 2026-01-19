// app/layout.ts
import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";
import { Metadata } from "next"; // Added for type safety
import Providers from "@/components/Providers";
import PageTracker from "@/components/PageTracker";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});

// Enhanced Metadata for SEO and Social Sharing
export const metadata: Metadata = {
  title: {
    default: "Eastern Housing Agency | Where Homes Meet Honesty",
    template: "%s | Eastern Housing Agency",
  },
  description: "Rent easier and live better with Eastern Housing Agency. We provide honest real estate services and quality rental listings.",
  keywords: ["housing", "rentals", "Eastern Housing Agency", "real estate", "apartments for rent"],
  authors: [{ name: "Eastern Housing Agency" }],
  creator: "Eastern Housing Agency",
  icons: {
    icon: "/logo.png", // Sets your logo as the favicon
    apple: "/logo.png",
  },
  openGraph: {
    title: "Eastern Housing Agency",
    description: "Where Homes Meet Honesty. Rent Easier, Live Better.",
    url: "https://yourdomain.com", // Replace with your actual domain
    siteName: "Eastern Housing Agency",
    images: [
      {
        url: "/logo.png", // Social media preview image
        width: 800,
        height: 600,
        alt: "Eastern Housing Agency Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eastern Housing Agency",
    description: "Where Homes Meet Honesty. Rent Easier, Live Better.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      {/* Note: Next.js automatically handles <head> tags like viewport and charset 
        via the metadata API, so we don't need to manually add them here.
      */}
      <body className="font-sans overflow-x-hidden">
        <Providers>
          <PageTracker />
          {children}
        </Providers>
      </body>
    </html>
  );
}