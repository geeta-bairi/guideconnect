
const BecomeGuide = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Become a Guide</h1>
    <p className="text-lg text-gray-700 mb-8">
      Sign up to share your expertise and lead unforgettable experiences with travelers.
    </p>
    <div className="bg-white rounded-lg p-6 shadow max-w-lg mx-auto">
      <ol className="list-decimal pl-5 text-gray-700 mb-4">
        <li>Sign up and create a guide profile</li>
        <li>Add your destinations and tours</li>
        <li>Receive bookings and connect with travelers</li>
        <li>Get paid securely for your services</li>
      </ol>
      <button className="bg-travel-blue hover:bg-travel-blue/90 text-white rounded px-4 py-2 w-full" disabled>
        Start the Application (Demo only)
      </button>
    </div>
  </div>
);
export default BecomeGuide;
