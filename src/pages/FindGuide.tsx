
const FindGuide = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Find a Guide</h1>
    <p className="text-lg text-gray-700 mb-8">
      Tell us about your destination and interests, and we'll match you with an expert local guide.
    </p>
    <div className="bg-white rounded-lg p-6 shadow max-w-lg mx-auto">
      <div>
        <label className="block font-medium mb-1">Destination</label>
        <input className="border w-full p-2 rounded mb-4" placeholder="e.g. Rome" />
      </div>
      <div>
        <label className="block font-medium mb-1">Interests</label>
        <input className="border w-full p-2 rounded mb-4" placeholder="e.g. Food, History, Adventure" />
      </div>
      <button className="bg-travel-green text-white rounded px-4 py-2 hover:bg-travel-green/90 w-full mt-2" disabled>
        Find My Guide
      </button>
      <p className="text-xs text-gray-400 mt-2">Demo: guide recommendations coming soon!</p>
    </div>
  </div>
);
export default FindGuide;
