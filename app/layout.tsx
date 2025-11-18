// app/layout.ts
import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";
import Script from "next/script"; 
import { UserProvider } from "./context/UserContext";

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

export const metadata = {
  title: "Eastern Housing Agency",
  description: "Where Homes Meet Honesty. Rent Easier, Live Better.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        />
      </head>
      <body className="font-sans overflow-x-hidden"><UserProvider>{children}</UserProvider></body>
    </html>
  );
}
