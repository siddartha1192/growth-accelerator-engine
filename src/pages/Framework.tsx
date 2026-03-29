import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FrameworkDiagram from '@/components/sections/FrameworkDiagram';

const Framework = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <FrameworkDiagram />
    <Footer />
  </div>
);

export default Framework;
