
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { format } from "date-fns";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

// More comprehensive list of global cities
const cities = [
  // Popular destinations
  "New York, USA", "Paris, France", "London, UK", "Tokyo, Japan", "Rome, Italy",
  "Sydney, Australia", "Dubai, UAE", "Bangkok, Thailand", "Singapore", "Hong Kong",
  
  // Indian cities
  "Mumbai, India", "Delhi, India", "Bangalore, India", "Hyderabad, India", "Kolkata, India",
  "Chennai, India", "Jaipur, India", "Agra, India", "Varanasi, India", "Goa, India",
  
  // Europe
  "Barcelona, Spain", "Amsterdam, Netherlands", "Berlin, Germany", "Vienna, Austria", 
  "Prague, Czech Republic", "Athens, Greece", "Venice, Italy", "Florence, Italy",
  
  // Asia
  "Seoul, South Korea", "Beijing, China", "Shanghai, China", "Kyoto, Japan",
  "Bali, Indonesia", "Hanoi, Vietnam", "Ho Chi Minh City, Vietnam", "Kuala Lumpur, Malaysia",
  
  // Americas
  "Los Angeles, USA", "San Francisco, USA", "Chicago, USA", "Toronto, Canada", 
  "Vancouver, Canada", "Mexico City, Mexico", "Rio de Janeiro, Brazil", "Buenos Aires, Argentina",
  
  // Africa & Middle East
  "Cairo, Egypt", "Cape Town, South Africa", "Marrakech, Morocco", "Istanbul, Turkey",
  "Jerusalem, Israel", "Petra, Jordan"
];

// Travel interests with ability to select multiple
const travelInterests = [
  { id: "adventure", label: "Adventure" },
  { id: "cultural", label: "Cultural" },
  { id: "historical", label: "Historical" },
  { id: "food", label: "Food & Cuisine" },
  { id: "nature", label: "Nature & Wildlife" },
  { id: "wellness", label: "Wellness" },
  { id: "architecture", label: "Architecture" },
  { id: "photography", label: "Photography" }
];

const Hero = () => {
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState<Date>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [openDestinations, setOpenDestinations] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(current => 
      current.includes(interest)
        ? current.filter(item => item !== interest)
        : [...current, interest]
    );
  };

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
              {/* City dropdown with autocomplete */}
              <div className="flex items-center bg-gray-50 rounded px-3 py-2">
                <MapPin className="h-5 w-5 text-travel-blue mr-2 flex-shrink-0" />
                <Popover open={openDestinations} onOpenChange={setOpenDestinations}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openDestinations}
                      className="w-full justify-between bg-transparent border-none hover:bg-transparent hover:text-current"
                    >
                      {destination ? destination : "Select destination..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search cities..." />
                      <CommandList>
                        <CommandEmpty>No city found.</CommandEmpty>
                        <CommandGroup>
                          {cities.map((city) => (
                            <CommandItem
                              key={city}
                              value={city}
                              onSelect={(currentValue) => {
                                setDestination(currentValue);
                                setOpenDestinations(false);
                              }}
                            >
                              {city}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-center bg-gray-50 rounded px-3 py-2">
                <Calendar className="h-5 w-5 text-travel-blue mr-2 flex-shrink-0" />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal bg-transparent border-none hover:bg-transparent hover:text-current"
                    >
                      {travelDate ? format(travelDate, "PPP") : <span>Travel Dates</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={travelDate}
                      onSelect={setTravelDate}
                      initialFocus
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-center bg-gray-50 rounded px-3 py-2">
                <User className="h-5 w-5 text-travel-blue mr-2 flex-shrink-0" />
                <Select>
                  <SelectTrigger className="w-full bg-transparent border-none focus:outline-none">
                    <SelectValue placeholder="Travel Interest" />
                  </SelectTrigger>
                  <SelectContent>
                    {travelInterests.map((interest) => (
                      <SelectItem key={interest.id} value={interest.id}>
                        {interest.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Travel interests multi-select */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">What are you interested in?</p>
              <div className="flex flex-wrap gap-2">
                {travelInterests.map((interest) => (
                  <Button
                    key={interest.id}
                    variant={selectedInterests.includes(interest.id) ? "default" : "outline"}
                    size="sm"
                    className={selectedInterests.includes(interest.id) 
                      ? "bg-travel-blue text-white" 
                      : "text-travel-blue"}
                    onClick={() => toggleInterest(interest.id)}
                  >
                    {interest.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <Button className="w-full mt-4 bg-travel-green hover:bg-travel-green/90 text-white">
              Find Local Guides
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
