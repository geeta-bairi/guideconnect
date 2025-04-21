
import ItineraryCard from "@/components/cards/ItineraryCard";

const experiences = [
  {
    id: 1,
    title: "Historical Delhi Walking Tour",
    location: "Old Delhi, India",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    duration: "6 hours",
    groupSize: "Up to 6 people",
    categories: ["Historical", "Walking", "Cultural"],
    description: "Explore the narrow lanes of Old Delhi, visit the historic Jama Masjid, taste street food, and learn about the rich cultural heritage of India's capital.",
  },
  {
    id: 2,
    title: "Mumbai Culinary Adventure",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1568688591647-6dfbb82e0f8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    duration: "4 hours",
    groupSize: "Up to 4 people",
    categories: ["Food", "Cultural"],
    description: "Sample authentic Mumbai street food from trusted vendors, learn about Indian spices, and discover the culinary diversity of this vibrant city.",
  },
  {
    id: 3,
    title: "Udaipur Palace and Lake Tour",
    location: "Udaipur, India",
    image: "https://images.unsplash.com/photo-1590767201244-f0878d355dbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    duration: "Full day",
    groupSize: "Up to 8 people",
    categories: ["Historical", "Photography", "Architecture"],
    description: "Visit the majestic City Palace, enjoy a boat ride on Lake Pichola, and witness the romantic sunset over the Aravalli hills in India's city of lakes.",
  }
];

const PopularExperiences = () => {
  return (
    <section className="py-16 bg-gray-50" id="destinations">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-travel-blue mb-4">Popular Experiences</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover unique travel experiences curated by our local guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <ItineraryCard
              key={experience.id}
              title={experience.title}
              location={experience.location}
              image={experience.image}
              duration={experience.duration}
              groupSize={experience.groupSize}
              categories={experience.categories}
              description={experience.description}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-travel-blue hover:text-travel-blue/80 font-semibold">
            Explore more experiences
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularExperiences;
