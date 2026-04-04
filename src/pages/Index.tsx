import HeroSection from "@/components/wedding/HeroSection";
import OurStorySection from "@/components/wedding/OurStorySection";
import CountdownSection from "@/components/wedding/CountdownSection";
import DetailsSection from "@/components/wedding/DetailsSection";
import RsvpSection from "@/components/wedding/RsvpSection";
import FooterSection from "@/components/wedding/FooterSection";
import InvitationSection from "@/components/wedding/InvitationSection";

const Index = () => {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      {/* <OurStorySection /> */}
      <InvitationSection />
      <CountdownSection />
      <DetailsSection />
      <RsvpSection />
      <FooterSection />
    </main>
  );
};

export default Index;
