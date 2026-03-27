import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import TrustBar from '@/components/sections/TrustBar';
import ProblemSection from '@/components/sections/ProblemSection';
import DiagnosticFunnel from '@/components/sections/DiagnosticFunnel';
import SolutionsGrid from '@/components/sections/SolutionsGrid';
import FrameworkDiagram from '@/components/sections/FrameworkDiagram';
import IndustriesSection from '@/components/sections/IndustriesSection';
import CaseStudies from '@/components/sections/CaseStudies';
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';
import InsightsSection from '@/components/sections/InsightsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <ProblemSection />
      <DiagnosticFunnel />
      <SolutionsGrid />
      <FrameworkDiagram />
      <IndustriesSection />
      <CaseStudies />
      <PricingSection />
      <CTASection />
      <InsightsSection />
      <Footer />
    </div>
  );
};

export default Index;
