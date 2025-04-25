
const Help = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Help Center</h1>
    <p className="text-lg text-gray-700 mb-8">
      How can we help you? Browse FAQs or contact our support team.
    </p>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="font-semibold mb-2">📄 Frequently Asked Questions</h3>
        <ul className="list-disc text-gray-700 pl-5">
          <li>How do I book a local guide?</li>
          <li>What payment methods are accepted?</li>
          <li>How can I become a guide?</li>
          <li>Is GuideConnect safe?</li>
        </ul>
      </div>
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="font-semibold mb-2">💬 Contact Support</h3>
        <p className="text-gray-700">Email us at <a href="mailto:support@guideconnect.com" className="text-travel-blue underline">support@guideconnect.com</a> or use our chat widget for 24/7 help.</p>
      </div>
    </div>
  </div>
);
export default Help;
