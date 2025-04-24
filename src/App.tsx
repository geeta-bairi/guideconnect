
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Press from "./pages/Press";
import Help from "./pages/Help";
import Safety from "./pages/Safety";
import Community from "./pages/Community";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import HowItWorks from "./pages/HowItWorks";
import ExploreGuides from "./pages/ExploreGuides";
import Destinations from "./pages/Destinations";
import PageTestimonials from "./pages/PageTestimonials";
import FindGuide from "./pages/FindGuide";
import BecomeGuide from "./pages/BecomeGuide";

// Dashboard imports
import TravelerDashboard from "./pages/TravelerDashboard";
import GuideDashboard from "./pages/GuideDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Dashboard routes with protection */}
              <Route path="/traveler-dashboard" element={
                <ProtectedRoute userType="traveler">
                  <TravelerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/guide-dashboard" element={
                <ProtectedRoute userType="guide">
                  <GuideDashboard />
                </ProtectedRoute>
              } />

              {/* Footer/Company navigation */}
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/press" element={<Press />} />

              {/* Footer/Support navigation */}
              <Route path="/help" element={<Help />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/community" element={<Community />} />

              {/* Footer/Legal navigation */}
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />

              {/* Navbar and call-to-action sections */}
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/explore-guides" element={<ExploreGuides />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/testimonials" element={<PageTestimonials />} />
              <Route path="/find-guide" element={<FindGuide />} />
              <Route path="/become-guide" element={<BecomeGuide />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
