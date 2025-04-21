
const ExploreGuides = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Explore Guides</h1>
    <p className="text-lg text-gray-700 mb-8">
      Browse and discover certified local guides for your next adventure.
    </p>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg">
        <h3 className="text-travel-blue text-lg font-bold mb-2">Anna K.</h3>
        <p className="text-gray-600">Specializes in food tours and local art experiences in Rome, Italy.</p>
      </div>
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg">
        <h3 className="text-travel-blue text-lg font-bold mb-2">Koji T.</h3>
        <p className="text-gray-600">Certified hiking and adventure guide for Mt. Fuji and surrounds.</p>
      </div>
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg">
        <h3 className="text-travel-blue text-lg font-bold mb-2">Laura M.</h3>
        <p className="text-gray-600">Historical city walks and architecture tours in Barcelona, Spain.</p>
      </div>
    </div>
  </div>
);
export default ExploreGuides;
