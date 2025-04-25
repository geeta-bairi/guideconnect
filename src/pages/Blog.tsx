
const Blog = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Blog</h1>
    <p className="text-lg text-gray-700 mb-8">
      Find travel tips, stories, and the latest updates from GuideConnect.
    </p>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-2">🌍 Top 10 Hidden Travel Gems</h3>
        <p className="text-gray-600">Explore unique, off-the-beaten-path destinations recommended by our global guides.</p>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-2">🎒 Essential Packing List</h3>
        <p className="text-gray-600">Get our comprehensive guide for comfortable, smart, and safe travel everywhere.</p>
      </div>
    </div>
  </div>
);
export default Blog;
