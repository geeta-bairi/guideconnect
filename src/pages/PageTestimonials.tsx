
const PageTestimonials = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Testimonials</h1>
    <p className="text-lg text-gray-700 mb-8">
      Hear from travelers and guides about their experiences with GuideConnect.
    </p>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow p-6">
        <blockquote className="italic text-gray-700 mb-2">“My guide made Paris feel like home! Highly recommend GuideConnect.”</blockquote>
        <span className="text-sm text-travel-green">– Emily R., Traveler</span>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <blockquote className="italic text-gray-700 mb-2">“Connecting with travelers broadened my friendships and career.”</blockquote>
        <span className="text-sm text-travel-green">– Lucia M., Guide</span>
      </div>
    </div>
  </div>
);
export default PageTestimonials;
