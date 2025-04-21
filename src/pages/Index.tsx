
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import PopularGuides from "@/components/sections/PopularGuides";
import PopularExperiences from "@/components/sections/PopularExperiences";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";
import Newsletter from "@/components/sections/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <PopularGuides />
        <PopularExperiences />
        <Testimonials />
        <Newsletter />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
