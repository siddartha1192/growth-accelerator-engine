import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Framework from "./pages/Framework.tsx";
import GrowthEngine from "./pages/GrowthEngine.tsx";
import ThankYou from "./pages/ThankYou.tsx";
import CaseStudiesList from "./pages/CaseStudiesList.tsx";
import CaseStudyDetail from "./pages/CaseStudyDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/framework" element={<Framework />} />
          <Route path="/ai-growth-engine" element={<GrowthEngine />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/case-studies" element={<CaseStudiesList />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
