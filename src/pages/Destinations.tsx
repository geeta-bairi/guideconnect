
const Destinations = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Destinations</h1>
    <p className="text-lg text-gray-700 mb-8">
      Find exciting destinations and tours curated by trusted guides.
    </p>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg">
        <h3 className="font-semibold mb-2">Paris, France</h3>
        <p className="text-gray-600">Romantic getaways and rich history tours with local experts.</p>
      </div>
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg">
        <h3 className="font-semibold mb-2">Kyoto, Japan</h3>
        <p className="text-gray-600">Experience ancient temples, cherry blossoms, and tea ceremonies.</p>
      </div>
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg">
        <h3 className="font-semibold mb-2">Peru: Machu Picchu</h3>
        <p className="text-gray-600">Adventure hikes and cultural discovery with trusted guides.</p>
      </div>
    </div>
  </div>
);
export default Destinations;
