import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
import HowItWorks from "@/components/HowItWorks";
import FindYourHome from "@/components/FindYourHome";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import PropertyListings from "@/components/PropertyListings";
import TermsOfService from "@/components/TermsOfService";
import LandlordCTA from "@/components/LandlordCTA";
import MeetTheTeam from "@/components/MeetTheTeam";
import ClientWrapper from "@/components/ClientWrapper";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <ClientWrapper>
      <Navbar/>
      <HeroSection />
      <AboutUs />
      <HowItWorks />
      <Services />
      <Testimonials />
      <FindYourHome />
      <LandlordCTA/>
      <TermsOfService />
      <PrivacyPolicy  />
      <Contact />
    </ClientWrapper>
  );
}
