import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import AboutSection from "@/components/AboutSection";
import HistorySection from "@/components/HistorySection";
import MissionVision from "@/components/MissionVision";
import TechnoWeather from "@/components/TechnoWeather";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      
      {/* Main content with padding for fixed header */}
      <main className="pt-[72px]">
        <HeroBanner />
        <AboutSection />
        <HistorySection />
        <MissionVision />
        <TechnoWeather />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
