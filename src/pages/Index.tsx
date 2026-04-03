import HeroSection from "@/components/wedding/HeroSection";
import OurStorySection from "@/components/wedding/OurStorySection";
import CountdownSection from "@/components/wedding/CountdownSection";
import DetailsSection from "@/components/wedding/DetailsSection";
import RsvpSection from "@/components/wedding/RsvpSection";
import FooterSection from "@/components/wedding/FooterSection";

const Index = () => {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      {/* <OurStorySection /> */}
      <CountdownSection />
      <DetailsSection />
      <RsvpSection />
      <FooterSection />
    </main>
  );
};

export default Index;
