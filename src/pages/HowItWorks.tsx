
const HowItWorks = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">How It Works</h1>
    <p className="text-lg text-gray-700 mb-8">
      Discover how GuideConnect matches travelers with the perfect local guides.
    </p>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center text-center hover:shadow-lg">
        <span className="text-travel-green text-3xl mb-2">1️⃣</span>
        <h3 className="font-semibold mb-2">Browse & Select</h3>
        <p className="text-gray-600">Search guides by destination, language, or expertise. Read reviews and profiles.</p>
      </div>
      <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center text-center hover:shadow-lg">
        <span className="text-travel-green text-3xl mb-2">2️⃣</span>
        <h3 className="font-semibold mb-2">Connect</h3>
        <p className="text-gray-600">Message guides, discuss your trip, and customize your experience together.</p>
      </div>
      <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center text-center hover:shadow-lg">
        <span className="text-travel-green text-3xl mb-2">3️⃣</span>
        <h3 className="font-semibold mb-2">Book & Go</h3>
        <p className="text-gray-600">Book securely, meet your guide, and enjoy your adventure with confidence!</p>
      </div>
    </div>
  </div>
);
export default HowItWorks;
