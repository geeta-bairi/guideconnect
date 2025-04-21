
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, User } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
          alt="Travel background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Explore with Local Certified Guides
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Connect with experienced local guides for personalized travel experiences.
            Discover hidden gems, authentic culture, and unforgettable moments.
          </p>

          {/* Search Form */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center bg-gray-50 rounded px-3 py-2">
                <MapPin className="h-5 w-5 text-travel-blue mr-2" />
                <input
                  type="text"
                  placeholder="Destination"
                  className="bg-transparent w-full focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-50 rounded px-3 py-2">
                <Calendar className="h-5 w-5 text-travel-blue mr-2" />
                <input
                  type="text"
                  placeholder="Travel Dates"
                  className="bg-transparent w-full focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-50 rounded px-3 py-2">
                <User className="h-5 w-5 text-travel-blue mr-2" />
                <select className="bg-transparent w-full focus:outline-none">
                  <option value="">Travel Interest</option>
                  <option value="adventure">Adventure</option>
                  <option value="cultural">Cultural</option>
                  <option value="historical">Historical</option>
                  <option value="food">Food & Cuisine</option>
                </select>
              </div>
            </div>
            <Button className="w-full mt-4 bg-travel-green hover:bg-travel-green/90 text-white">Find Local Guides</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
