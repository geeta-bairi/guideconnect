
const testimonials = [
  {
    quote: "Our guide knew exactly where to take us to avoid the tourist traps. We experienced the real culture of Rajasthan thanks to GuideConnect!",
    author: "Sarah J.",
    location: "New York, USA",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    trip: "Cultural Tour in Jaipur"
  },
  {
    quote: "The personalized food tour in Mumbai was incredible! Our guide took us to hidden gems we would never have found on our own.",
    author: "Michael T.",
    location: "London, UK",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    trip: "Mumbai Food Experience"
  },
  {
    quote: "As a solo female traveler, safety was my priority. My guide was professional and made me feel comfortable exploring Kerala's backwaters.",
    author: "Emily R.",
    location: "Melbourne, Australia",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    trip: "Kerala Backwaters Tour"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-travel-blue mb-4">What Travelers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read about real experiences from travelers who explored with our certified local guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <p className="italic mb-4">"{testimonial.quote}"</p>
              <p className="text-sm text-travel-green font-medium">{testimonial.trip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
