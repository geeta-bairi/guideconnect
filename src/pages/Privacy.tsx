
const Privacy = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Privacy Policy</h1>
    <p className="text-lg text-gray-700 mb-8">
      We respect your privacy. Read our privacy policy to learn how we handle your data.
    </p>
    <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
      <h3 className="font-semibold mb-2">What We Collect</h3>
      <ul className="list-disc pl-5 text-gray-700 mb-4">
        <li>Profile and booking information</li>
        <li>Communication with guides</li>
        <li>Usage and location data (with permission)</li>
      </ul>
      <h3 className="font-semibold mb-2">How We Use It</h3>
      <ul className="list-disc pl-5 text-gray-700 mb-2">
        <li>To match you with guides and process bookings</li>
        <li>To improve user experience and safety</li>
        <li>We never sell your personal information</li>
      </ul>
    </div>
  </div>
);
export default Privacy;
