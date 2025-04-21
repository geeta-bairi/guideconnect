
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 bg-travel-blue text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Travel with Local Guides?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join GuideConnect today and discover the authentic travel experiences with certified local guides.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-travel-green hover:bg-travel-green/90 text-white px-8 py-6 text-lg h-auto">
              Find a Guide
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg h-auto">
              Become a Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
