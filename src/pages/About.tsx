
const About = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">About Us</h1>
    <p className="text-lg text-gray-700 mb-8">
      Learn more about GuideConnect, our mission, and the team connecting travelers with certified local guides worldwide.
    </p>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
        <h3 className="text-xl font-bold mb-2 text-travel-green">Our Mission</h3>
        <p className="text-gray-600">Connecting adventurers with knowledgeable guides for authentic, safe, and unforgettable journeys.</p>
      </div>
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
        <h3 className="text-xl font-bold mb-2 text-travel-green">Our Values</h3>
        <ul className="list-disc pl-4 text-gray-600">
          <li>Trust & Safety</li>
          <li>Authenticity</li>
          <li>Community Empowerment</li>
        </ul>
      </div>
      <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
        <h3 className="text-xl font-bold mb-2 text-travel-green">Meet the Team</h3>
        <p className="text-gray-600">A passionate group of travelers, tech enthusiasts, and local guides dedicated to global connections.</p>
      </div>
    </div>
  </div>
);
export default About;
