
import { MapPin, Users, Compass, Calendar, Book, Route } from "lucide-react";

const features = [
  {
    icon: <Users className="h-10 w-10 text-travel-green" />,
    title: "Certified Local Guides",
    description: "Connect with professional guides who have deep local knowledge and are certified for quality service.",
  },
  {
    icon: <Compass className="h-10 w-10 text-travel-green" />,
    title: "Personalized Experiences",
    description: "Get custom itineraries based on your interests, time availability, and travel preferences.",
  },
  {
    icon: <MapPin className="h-10 w-10 text-travel-green" />,
    title: "Hidden Gems",
    description: "Discover off-the-beaten-path locations that only locals know about.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-travel-green" />,
    title: "Flexible Scheduling",
    description: "Book guides for hours, days, or your entire trip with real-time availability.",
  },
  {
    icon: <Route className="h-10 w-10 text-travel-green" />,
    title: "Interactive Maps",
    description: "Access location-based suggestions and highlights with our interactive map feature.",
  },
  {
    icon: <Book className="h-10 w-10 text-travel-green" />,
    title: "Cultural Immersion",
    description: "Experience authentic local culture with insider access to traditions and customs.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-travel-blue mb-4">How GuideConnect Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've simplified the process of connecting travelers with local guides to create memorable experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
