import UserFeatures from "@/components/features/UserFeatures";

const HowItWorks = () => (
  <div className="container py-12">
    <h1 className="text-3xl font-bold mb-4 text-travel-blue">How It Works</h1>
    <p className="text-lg text-gray-700 mb-8">
      GuideConnect makes it easy to explore the world with trusted local guides.
    </p>
    {/* User-specific features below */}
    <h2 className="text-2xl font-semibold mt-14 mb-2 text-travel-blue">For Travelers</h2>
    <UserFeatures />
    {/* You can add a timeline or stepper below if needed */}
  </div>
);
export default HowItWorks;
