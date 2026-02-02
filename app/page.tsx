import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FormVaga from "@/components/FormVaga";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FormVaga />
        <HowItWorks />
        <SocialProof />
      </main>
      <Footer />
    </>
  );
}
