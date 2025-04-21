
const Terms = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Terms of Service</h1>
    <p className="text-lg text-gray-700 mb-8">
      Please read our terms of service carefully before using GuideConnect.
    </p>
    <div className="bg-white rounded-lg p-6 shadow max-w-xl mx-auto">
      <h3 className="font-semibold mb-2">User Responsibilities</h3>
      <ul className="list-disc text-gray-700 pl-5 mb-4">
        <li>Provide accurate information when booking or guiding</li>
        <li>Respect local laws and customs while traveling</li>
      </ul>
      <h3 className="font-semibold mb-2">GuideConnect Rights</h3>
      <ul className="list-disc text-gray-700 pl-5">
        <li>Update terms and policies as needed</li>
        <li>Remove users who violate guidelines</li>
      </ul>
    </div>
  </div>
);
export default Terms;
