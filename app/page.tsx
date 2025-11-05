import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
import HowItWorks from "@/components/HowItWorks";
import FindYourHome from "@/components/FindYourHome";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <HowItWorks />
      <FindYourHome />
    </>
  );
}
