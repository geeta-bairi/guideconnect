
const Careers = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">Careers</h1>
    <p className="text-lg text-gray-700 mb-8">
      Explore career opportunities with us and become part of the GuideConnect team!
    </p>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg">
        <h3 className="font-semibold mb-1">Product Designer</h3>
        <p className="text-gray-600 mb-1">Lead UI/UX for our travel platform. Remote possible.</p>
        <span className="text-xs text-gray-400">Open</span>
      </div>
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg">
        <h3 className="font-semibold mb-1">Full Stack Developer</h3>
        <p className="text-gray-600 mb-1">Shape core features used by travelers and guides worldwide.</p>
        <span className="text-xs text-gray-400">Open</span>
      </div>
    </div>
  </div>
);
export default Careers;
