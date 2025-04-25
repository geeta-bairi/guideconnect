
const Safety = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Safety Center</h1>
    <p className="text-lg text-gray-700 mb-8">
      Your safety is our priority. Learn more about our safety guidelines and policies.
    </p>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg">
        <h3 className="font-semibold mb-2">Guide Verification</h3>
        <p className="text-gray-600">All guides are carefully vetted and background checked for your peace of mind.</p>
      </div>
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg">
        <h3 className="font-semibold mb-2">24/7 Support</h3>
        <p className="text-gray-600">Our team is available any time for questions about your bookings and safety.</p>
      </div>
    </div>
  </div>
);
export default Safety;
