import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DiagnosticFunnel from '@/components/sections/DiagnosticFunnel';

const GrowthEngine = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <DiagnosticFunnel />
    <Footer />
  </div>
);

export default GrowthEngine;
