
const Press = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Press</h1>
    <p className="text-lg text-gray-700 mb-8">
      News articles, mentions, and press releases about GuideConnect.
    </p>
    <div className="max-w-2xl mx-auto grid gap-4">
      <div className="bg-white rounded p-4 shadow">
        <h3 className="font-semibold">TechDaily</h3>
        <p className="text-gray-600">"GuideConnect connects travelers with local insight worldwide." <span className="text-xs text-gray-400">Jan 2024</span></p>
      </div>
      <div className="bg-white rounded p-4 shadow">
        <h3 className="font-semibold">The Globe Journal</h3>
        <p className="text-gray-600">"Changing how people experience travel, one guide at a time." <span className="text-xs text-gray-400">May 2023</span></p>
      </div>
    </div>
  </div>
);
export default Press;
