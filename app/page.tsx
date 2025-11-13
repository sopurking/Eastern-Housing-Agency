"use server"

import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
import HowItWorks from "@/components/HowItWorks";
import FindYourHome from "@/components/FindYourHome";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import PropertyListings from "@/components/PropertyListings";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <>
      <Navbar session={session}/>
      <HeroSection />
      <AboutUs />
      <HowItWorks />
      <PropertyListings />
      <Services />
      <PrivacyPolicy  />
      <Contact />
    </>
  );
}
