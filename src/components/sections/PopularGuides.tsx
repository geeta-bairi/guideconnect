
import GuideCard from "@/components/cards/GuideCard";

const guides = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Delhi, India",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.9,
    price: "₹2,500/day",
    languages: ["English", "Hindi", "French"],
    specialties: ["History", "Architecture", "Street Food"],
    verified: true,
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Mumbai, India",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.8,
    price: "₹2,800/day",
    languages: ["English", "Hindi", "Marathi"],
    specialties: ["Food Tours", "Photography", "Markets"],
    verified: true,
  },
  {
    id: 3,
    name: "Amit Verma",
    location: "Jaipur, India",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    rating: 4.7,
    price: "₹2,200/day",
    languages: ["English", "Hindi"],
    specialties: ["Cultural", "Artisans", "Rural"],
    verified: true,
  },
  {
    id: 4,
    name: "Anjali Desai",
    location: "Goa, India",
    image: "https://randomuser.me/api/portraits/women/80.jpg",
    rating: 4.9,
    price: "₹3,000/day",
    languages: ["English", "Hindi", "Portuguese"],
    specialties: ["Beaches", "Nightlife", "Adventure"],
    verified: true,
  }
];

const PopularGuides = () => {
  return (
    <section className="py-16" id="explore">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-travel-blue mb-4">Popular Guides</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our highly-rated local guides ready to show you authentic experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide) => (
            <GuideCard
              key={guide.id}
              name={guide.name}
              location={guide.location}
              image={guide.image}
              rating={guide.rating}
              price={guide.price}
              languages={guide.languages}
              specialties={guide.specialties}
              verified={guide.verified}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-travel-blue hover:text-travel-blue/80 font-semibold">
            View all guides
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularGuides;
